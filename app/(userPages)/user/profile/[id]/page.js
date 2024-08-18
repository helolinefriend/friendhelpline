// "use client";

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '../../../../../styles/Profile/profileId.module.css';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export default function Profile() {
//   const [profile, setProfile] = useState({
//     profilepic: '',
//     phoneNumber: '',
//     kycStatus: 'kyc',
//     address1: '',
//     address2: '',
//     state: '',
//     pincode: '',
//     bankname: '',
//     accountnumbar: '',
//     ifcecode: '',
//     bankbranch: '',
//     bankfulladdress: '',
//     realname: '',
//     qr: '',
//     upiid: '',
//   });

//   const [fileData, setFileData] = useState({
//     profilepic: null,
//     qr: null,
//   });

//   // State to store preview URLs
//   const [profileImagePreview, setProfileImagePreview] = useState(null);
//   const [qrImagePreview, setQrImagePreview] = useState(null);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get('/api/user/profile/userid/id', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(data);
//       } catch (error) {
//         toast.error('Error fetching profile plase refrec the page');
//         console.error('Error fetching profile:', error.response ? error.response.data : error.message);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const file = files[0];
//     setFileData({ ...fileData, [name]: file });

//     // Generate preview URL
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (name === 'profilepic') {
//           setProfileImagePreview(reader.result);
//         } else if (name === 'qr') {
//           setQrImagePreview(reader.result);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };




//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new FormData();
  
//       // Append profile data to the form
//       for (const key in profile) {
//         formData.append(key, profile[key]);
//       }
  
//       // Append the files to the form data
//       if (fileData.profilepic) {
//         formData.append('profilepic', fileData.profilepic);
//       }
//       if (fileData.qr) {
//         formData.append('qr', fileData.qr);
//       }
  
//       const { data } = await axios.put(`/api/user/profile/profileupdate/${profile.userId}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       // Update the profile state with the new data including image URLs
//       setProfile(data);
  
//       // Set the preview URLs based on the returned data
//       setProfileImagePreview(data.profilepic);
//       setQrImagePreview(data.qr);
  
//       toast.success('Profile updated successfully!');
//       router.push('/user/profile');
//     } catch (error) {
//       toast.error('KYC updated error!');
      
//       console.error('Error updating profile:', error.response ? error.response.data : error.message);
//     }
//   };
  

//   return (
//     <div className={styles.putcontainer}>
//     <form onSubmit={handleSubmit} className={styles.putform}>
//       <div className={styles.formGroup}>
//         <label htmlFor="profilepic" className={styles.label}>Profile Image</label>
//         <input
//           type="file"
//           name="profilepic"
//           id="profilepic"
//           onChange={handleFileChange}
//           className={styles.input}
//         />
       
//         {profileImagePreview && (
//           <Image
//             src={profileImagePreview}
//             width="200"
//             height="200"
//             alt="Profile Preview"
//             className={styles.imagePreview}
//           />
//         )}

//         { /* 
//         {profileImagePreview && <Image src={profileImagePreview} 
//         width="200" height="200" alt="Profile Preview" 
//         className={styles.imagePreview} />} 

//         */}

//       </div>



      

//       <div className={styles.formGroup}>
//         <label htmlFor="address1" className={styles.label}>Address</label>
//         <input
//           type="text"
//           name="address1"
//           id="address1"
//           placeholder="Address 1"
//           value={profile.address1}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="address2"
//           id="address2"
//           placeholder="Address 2"
//           value={profile.address2}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="state"
//           id="state"
//           placeholder="State"
//           value={profile.state}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         <input
//           type="number"
//           name="pincode"
//           id="pincode"
//           placeholder="Pincode"
//           value={profile.pincode}
//           onChange={handleChange}
//           className={styles.input}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label htmlFor="bankname" className={styles.label}>Bank Details</label>
//         <input
//           type="text"
//           name="bankname"
//           id="bankname"
//           placeholder="Bank Name"
//           value={profile.bankname}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         <input
//           type="number"
//           name="accountnumbar"
//           id="accountnumbar"
//           placeholder="Account Number"
//           value={profile.accountnumbar}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="ifcecode"
//           id="ifcecode"
//           placeholder="IFSC Code"
//           value={profile.ifcecode}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="bankbranch"
//           id="bankbranch"
//           placeholder="Bank Branch"
//           value={profile.bankbranch}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="bankfulladdress"
//           id="bankfulladdress"
//           placeholder="Bank Full Address (Optional)"
//           value={profile.bankfulladdress}
//           onChange={handleChange}
//           className={styles.input}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label htmlFor="realname" className={styles.label}>QR Information</label>
//         <input
//           type="text"
//           name="realname"
//           id="realname"
//           placeholder="Your Name"
//           value={profile.realname}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         <label htmlFor="qr" className={styles.label}>QR Image</label>
//         <input
//           type="file"
//           name="qr"
//           id="qr"
//           onChange={handleFileChange}
//           className={styles.input}
//         />
//         {qrImagePreview && (
//           <Image
//             src={qrImagePreview}
//             width="200"
//             height="200"
//             alt="QR Preview"
//             className={styles.imagePreview}
//           />
//         )}

     
       

//         <input
//           type="text"
//           name="upiid"
//           id="upiid"
//           placeholder="UPI ID"
//           value={profile.upiid}
//           onChange={handleChange}
//           className={styles.input}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label htmlFor="kycStatus" className={styles.label}>KYC Status</label>
//         <select
//           name="kycStatus"
//           id="kycStatus"
//           value={profile.kycStatus}
//           onChange={handleChange}
//           className={styles.input}
//         >
//           <option value="non kyc">Non KYC</option>
//           <option value="active">Active</option>
//         </select>
//       </div>

//       <div className={styles.formGroup}>
//       <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
//       <input
//         type="number"
//         name="phoneNumber"
//         id="phoneNumber"
//         placeholder="Phone Number"
//         value={profile.phoneNumber}
//         onChange={handleChange}
//         className={styles.input}
//       />
//     </div>

//       <button type="submit" className={styles.button}>Update Profile</button>
//     </form>
//     </div>

//   );
// }


"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../../../styles/Profile/profileId.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { showToast } from '../../../../../components/toastUtil'; // Import showToast
import Loader from '../../../../../components/Loader'; // Import Loader component

export default function Profile() {
  const [profile, setProfile] = useState({
    profilepic: '',
    phoneNumber: '',
    kycStatus: 'kyc',
    address1: '',
    address2: '',
    state: '',
    pincode: '',
    bankname: '',
    accountnumbar: '',
    ifcecode: '',
    bankbranch: '',
    bankfulladdress: '',
    realname: '',
    qr: '',
    upiid: '',
  });

  const [fileData, setFileData] = useState({
    profilepic: null,
    qr: null,
  });

  // State to store preview URLs
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [qrImagePreview, setQrImagePreview] = useState(null);

  // State for loading
  const [loading, setLoading] = useState(false);

  // State for button disabled
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/user/profile/userid/id', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (error) {
        showToast('Error fetching profile. Please refresh the page', 'error');
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFileData({ ...fileData, [name]: file });

    // Generate preview URL
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'profilepic') {
          setProfileImagePreview(reader.result);
        } else if (name === 'qr') {
          setQrImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true); // Disable button to prevent multiple submissions
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      // Append profile data to the form
      for (const key in profile) {
        formData.append(key, profile[key]);
      }

      // Append the files to the form data
      if (fileData.profilepic) {
        formData.append('profilepic', fileData.profilepic);
      }
      if (fileData.qr) {
        formData.append('qr', fileData.qr);
      }

      const { data } = await axios.put(`/api/user/profile/profileupdate/${profile.userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the profile state with the new data including image URLs
      setProfile(data);

      // Set the preview URLs based on the returned data
      setProfileImagePreview(data.profilepic);
      setQrImagePreview(data.qr);

      showToast('Profile updated successfully!', 'success');
      router.push('/user/profile');
    } catch (error) {
      showToast('KYC update error!', 'error');
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
      setIsButtonDisabled(false); // Re-enable button
    }
  };

  return (
    <div className={styles.putcontainer}>
      {loading && <Loader />} {/* Show loader when loading */}
      <form onSubmit={handleSubmit} className={styles.putform}>
      <div className={styles.formGroup}>
        <label htmlFor="profilepic" className={styles.label}>Profile Image</label>
        <input
          type="file"
          name="profilepic"
          id="profilepic"
          onChange={handleFileChange}
          className={styles.input}
        />
       
        {profileImagePreview && (
          <Image
            src={profileImagePreview}
            width="200"
            height="200"
            alt="Profile Preview"
            className={styles.imagePreview}
          />
        )}

        { /* 
        {profileImagePreview && <Image src={profileImagePreview} 
        width="200" height="200" alt="Profile Preview" 
        className={styles.imagePreview} />} 

        */}

      </div>



      

      <div className={styles.formGroup}>
        <label htmlFor="address1" className={styles.label}>Address</label>
        <input
          type="text"
          name="address1"
          id="address1"
          placeholder="Address 1"
          value={profile.address1}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="address2"
          id="address2"
          placeholder="Address 2"
          value={profile.address2}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="state"
          id="state"
          placeholder="State"
          value={profile.state}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="number"
          name="pincode"
          id="pincode"
          placeholder="Pincode"
          value={profile.pincode}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="bankname" className={styles.label}>Bank Details</label>
        <input
          type="text"
          name="bankname"
          id="bankname"
          placeholder="Bank Name"
          value={profile.bankname}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="number"
          name="accountnumbar"
          id="accountnumbar"
          placeholder="Account Number"
          value={profile.accountnumbar}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="ifcecode"
          id="ifcecode"
          placeholder="IFSC Code"
          value={profile.ifcecode}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="bankbranch"
          id="bankbranch"
          placeholder="Bank Branch"
          value={profile.bankbranch}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="bankfulladdress"
          id="bankfulladdress"
          placeholder="Bank Full Address (Optional)"
          value={profile.bankfulladdress}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="realname" className={styles.label}>QR Information</label>
        <input
          type="text"
          name="realname"
          id="realname"
          placeholder="Your Name"
          value={profile.realname}
          onChange={handleChange}
          className={styles.input}
        />
        <label htmlFor="qr" className={styles.label}>QR Image</label>
        <input
          type="file"
          name="qr"
          id="qr"
          onChange={handleFileChange}
          className={styles.input}
        />
        {qrImagePreview && (
          <Image
            src={qrImagePreview}
            width="200"
            height="200"
            alt="QR Preview"
            className={styles.imagePreview}
          />
        )}

     
       

        <input
          type="text"
          name="upiid"
          id="upiid"
          placeholder="UPI ID"
          value={profile.upiid}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="kycStatus" className={styles.label}>KYC Status</label>
        <select
          name="kycStatus"
          id="kycStatus"
          value={profile.kycStatus}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="non kyc">Non KYC</option>
          <option value="active">Active</option>
        </select>
      </div>

      <div className={styles.formGroup}>
      <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
      <input
        type="number"
        name="phoneNumber"
        id="phoneNumber"
        placeholder="Phone Number"
        value={profile.phoneNumber}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
    <button type="submit" className={styles.button} disabled={loading}>
    {loading ? 'Updating...' : 'Update Profile'}
  </button>
    </form>
    </div>

  );
}