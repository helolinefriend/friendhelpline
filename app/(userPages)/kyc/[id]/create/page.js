

//app/kyc/[id]/create/page.js post code 

// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '../../../../../styles/Profile/profileId.module.css';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function KycPost() {
//   const [profile, setProfile] = useState({
//     aadhar: '',
//     pan: '',
//     kycStatus: 'kyc', // default value
//     userId: '', // Ensure userId is set correctly
//   });

//   const [fileData, setFileData] = useState({
//     aadharpic: null,
//     panpic: null,
//   });

//   const [screenshotPreview, setScreenshotPreview] = useState({
//     aadharpic: '',
//     panpic: ''
//   });

//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserId = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const { data } = await axios.get('/api/user/profile/userid/id', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setProfile((prevProfile) => ({ ...prevProfile, userId: data.userId }));
//         } catch (error) {
//           toast.error('Failed to fetch user data');
//           console.error('Error fetching user ID:', error.response ? error.response.data : error.message);
//         }
//       }
//     };

//     fetchUserId();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const file = files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         setFileData(prev => ({ ...prev, [name]: reader.result.split(',')[1] }));
//         setScreenshotPreview(prev => ({ ...prev, [name]: reader.result }));
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new URLSearchParams();
//       formData.append('aadhar', profile.aadhar);
//       formData.append('pan', profile.pan);
//       formData.append('kycStatus', profile.kycStatus);
//       formData.append('aadharpic', fileData.aadharpic);
//       formData.append('panpic', fileData.panpic);

//       const { data } = await axios.post(`/api/user/kyc/${profile.userId}/update`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       });

//       toast.success('Profile updated successfully!');
//       router.push('/kyc');
//     } catch (error) {
//       console.error('Error updating profile:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} enctype="multipart/form-data" className={styles.form}>
//         <h1 className={styles.label}>Complete Your KYC</h1>
//         <div className={styles.formGroup}>
//           <label htmlFor="aadhar" className={styles.label}>Aadhar Number</label>
//           <input
//             type="text"
//             name="aadhar"
//             id="aadhar"
//             placeholder="Aadhar Number"
//             value={profile.aadhar}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="pan" className={styles.label}>PAN Number</label>
//           <input
//             type="text"
//             name="pan"
//             id="pan"
//             placeholder="PAN Number"
//             value={profile.pan}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="kycStatus" className={styles.label}>KYC Status</label>
//           <select
//             name="kycStatus"
//             id="kycStatus"
//             value={profile.kycStatus}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           >
//             <option value="non-kyc">Non-KYC</option>
//             <option value="kyc">KYC</option>
//           </select>
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="aadharpic" className={styles.label}>Upload Aadhar Picture</label>
//           <input
//             type="file"
//             name="aadharpic"
//             id="aadharpic"
//             onChange={handleFileChange}
//             className={styles.input}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="panpic" className={styles.label}>Upload PAN Picture</label>
//           <input
//             type="file"
//             name="panpic"
//             id="panpic"
//             onChange={handleFileChange}
//             className={styles.input}
//             required
//           />
//         </div>

//         <div className={styles.previewContainer}>
//           {screenshotPreview.aadharpic && (
//             <div className={styles.preview}>
//               <Image src={screenshotPreview.aadharpic} width={150} height={150} alt="Aadhar Image Preview" />
//             </div>
//           )}
//           {screenshotPreview.panpic && (
//             <div className={styles.preview}>
//               <Image src={screenshotPreview.panpic} width={150} height={150} alt="PAN Image Preview" />
//             </div>
//           )}
//         </div>

//         <button type="submit" className={styles.button}>Submit</button>
//       </form>
//     </div>
//   );
// }



// errro hanlder + tost add and 


'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../../../styles/Profile/profileId.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { showToast } from '../../../../../components/toastUtil';  // Use showToast instead of toast
import Loader from '../../../../../components/Loader';  // Import the Loader component
 
export default function KycPost() {
  const [profile, setProfile] = useState({
    aadhar: '',
    pan: '',
    kycStatus: 'kyc', // default value
    userId: '', // Ensure userId is set correctly
  });

  const [fileData, setFileData] = useState({
    aadharpic: null,
    panpic: null,
  });

  const [screenshotPreview, setScreenshotPreview] = useState({
    aadharpic: '',
    panpic: ''
  });

  const [loading, setLoading] = useState(false);  // Add loading state
  const router = useRouter();

  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       try {
  //         setLoading(true);  // Start loading
  //         const { data } = await axios.get('/api/user/profile/userid/id', {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setProfile((prevProfile) => ({ ...prevProfile, userId: data.userId }));
  //       } catch (error) {
  //         handleError(error, 'Failed to fetch user data');
  //       } finally {
  //         setLoading(false);  // End loading
  //       }
  //     } else {
  //       showToast('User not authenticated', 'error');
  //     }
  //   };

  //   fetchUserId();
  // }, [handleError]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFileData(prev => ({ ...prev, [name]: reader.result.split(',')[1] }));
        setScreenshotPreview(prev => ({ ...prev, [name]: reader.result }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.aadhar || !profile.pan || !fileData.aadharpic || !fileData.panpic) {
      showToast('Missing required fields', 'error');
      return;
    }

    setLoading(true);  // Start loading

    try {
      const token = localStorage.getItem('token');
      const formData = new URLSearchParams();
      formData.append('aadhar', profile.aadhar);
      formData.append('pan', profile.pan);
      formData.append('kycStatus', profile.kycStatus);
      formData.append('aadharpic', fileData.aadharpic);
      formData.append('panpic', fileData.panpic);

      const { data } = await axios.post(`/api/user/kyc/${profile.userId}/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      showToast('Profile updated successfully!', 'success');
      router.push('/kyc');
    } catch (error) {
      handleError(error, 'Error creating KYC');
    } finally {
      setLoading(false);  // End loading
    }
  };

  // const handleError = (error, defaultMessage) => {
  //   const errorMessage = error.response?.data?.message || error.message || defaultMessage;

  //   if (error.response?.status === 401) {
  //     showToast('Unauthorized. Please login again.', 'error');
  //     router.push('/login');
  //   } else if (error.response?.status === 404) {
  //     showToast('User not found', 'error');
  //   } else {
  //     showToast(errorMessage, 'error');
  //   }

  //   console.error(errorMessage);
  // };

  const handleError = useCallback((error, defaultMessage) => {
    const errorMessage = error.response?.data?.message || error.message || defaultMessage;
  
    if (error.response?.status === 401) {
      showToast('Unauthorized. Please login again.', 'error');
      router.push('/login');
    } else if (error.response?.status === 404) {
      showToast('User not found', 'error');
    } else {
      showToast(errorMessage, 'error');
    }
  
    console.error(errorMessage);
  }, [router]); // Include router in the dependency array
  


  return (
        <div className={styles.container}>
        {loading && <Loader />}
          <form onSubmit={handleSubmit} enctype="multipart/form-data" className={styles.form}>
            <h1 className={styles.label}>Complete Your KYC</h1>
            <div className={styles.formGroup}>
              <label htmlFor="aadhar" className={styles.label}>Aadhar Number</label>
              <input
                type="text"
                name="aadhar"
                id="aadhar"
                placeholder="Aadhar Number"
                value={profile.aadhar}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pan" className={styles.label}>PAN Number</label>
              <input
                type="text"
                name="pan"
                id="pan"
                placeholder="PAN Number"
                value={profile.pan}
                onChange={handleChange}
                className={styles.input}
                required
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
                required
              >
                <option value="non-kyc">Non-KYC</option>
                <option value="kyc">KYC</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="aadharpic" className={styles.label}>Upload Aadhar Picture</label>
              <input
                type="file"
                name="aadharpic"
                id="aadharpic"
                onChange={handleFileChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="panpic" className={styles.label}>Upload PAN Picture</label>
              <input
                type="file"
                name="panpic"
                id="panpic"
                onChange={handleFileChange}
                className={styles.input}
                required
              />
            </div>
    
            <div className={styles.previewContainer}>
              {screenshotPreview.aadharpic && (
                <div className={styles.preview}>
                  <Image src={screenshotPreview.aadharpic} width={150} height={150} alt="Aadhar Image Preview" />
                </div>
              )}
              {screenshotPreview.panpic && (
                <div className={styles.preview}>
                  <Image src={screenshotPreview.panpic} width={150} height={150} alt="PAN Image Preview" />
                </div>
              )}
            </div>
    
            <button type="submit" className={styles.button}>Submit</button>
          </form>
        </div>
      );
}