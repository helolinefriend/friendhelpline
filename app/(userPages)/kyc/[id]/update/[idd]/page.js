// "use client";

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '../../../../../../styles/Profile/profileId.module.css';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function KycPage({ params }) {
//   const { id } = params;
//   const [kycData, setKycData] = useState({
//     aadhar: '',
//     pan: '',
//     kycStatus: '',
//     aadharpic: '',
//     panpic: '',
//   });
//   const [fileData, setFileData] = useState({
//     aadharpic: null,
//     panpic: null,
//   });

//   useEffect(() => {
//     const fetchKycData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get(`/api/user/kyc/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setKycData(data.kyc);
//       } catch (error) {
//         toast.error('Profile updated fails!');
//         console.error('Error fetching KYC data:', error.response ? error.response.data : error.message);
//       }
//     };

//     fetchKycData();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setKycData({ ...kycData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFileData({ ...fileData, [name]: files[0] });
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
  
//       const { data } = await axios.put(`/api/user/kyc/${profile.userId}/update`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       });
//       toast.success('Profile updated successfully!');
      
//     } catch (error) {
//       console.error('Error updating profile:', error.response ? error.response.data : error.message);
//     }
//   };
  

//   return (
//     <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
//       <div className={styles.formGroup}>
//         <label htmlFor="aadhar" className={styles.label}>Aadhar Number</label>
//         <input
//           type="text"
//           name="aadhar"
//           id="aadhar"
//           placeholder="Aadhar Number"
//           value={kycData.aadhar}
//           onChange={handleChange}
//           className={styles.input}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label htmlFor="pan" className={styles.label}>PAN Number</label>
//         <input
//           type="text"
//           name="pan"
//           id="pan"
//           placeholder="PAN Number"
//           value={kycData.pan}
//           onChange={handleChange}
//           className={styles.input}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label htmlFor="kycStatus" className={styles.label}>KYC Status</label>
//         <input
//           type="text"
//           name="kycStatus"
//           id="kycStatus"
//           placeholder="KYC Status"
//           value={kycData.kycStatus}
//           onChange={handleChange}
//           className={styles.input}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label htmlFor="aadharpic" className={styles.label}>Aadhar Image</label>
//         <input
//           type="file"
//           name="aadharpic"
//           id="aadharpic"
//           onChange={handleFileChange}
//           className={styles.input}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label htmlFor="panpic" className={styles.label}>PAN Image</label>
//         <input
//           type="file"
//           name="panpic"
//           id="panpic"
//           onChange={handleFileChange}
//           className={styles.input}
//         />
//       </div>

//       <button type="submit" className={styles.button}>Update KYC</button>
//     </form>
//   );
// }


"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../../../../styles/Profile/profileId.module.css';
import { showToast } from '../../../../../../components/toastUtil';  // Use showToast instead of toast
import Loader from '../../../../../../components/Loader';  // Import Loader component

export default function KycPage({ params }) {
  const { id } = params;
  const [kycData, setKycData] = useState({
    aadhar: '',
    pan: '',
    kycStatus: '',
    aadharpic: '',
    panpic: '',
  });
  const [fileData, setFileData] = useState({
    aadharpic: null,
    panpic: null,
  });
  const [loading, setLoading] = useState(false);  // Add loading state

  useEffect(() => {
    const fetchKycData = async () => {
      try {
        setLoading(true);  // Show loader
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`/api/user/kyc/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setKycData(data.kyc);
      } catch (error) {
        // showToast('Error fetching KYC data', 'error');
        console.error('Error fetching KYC data:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);  // Hide loader
      }
    };

    fetchKycData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKycData({ ...kycData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFileData({ ...fileData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);  // Show loader
      const token = localStorage.getItem('token');
      const formData = new URLSearchParams();
      formData.append('aadhar', kycData.aadhar);
      formData.append('pan', kycData.pan);
      formData.append('kycStatus', kycData.kycStatus);
      formData.append('aadharpic', fileData.aadharpic);
      formData.append('panpic', fileData.panpic);
  
      const { data } = await axios.put(`/api/user/kyc/${id}/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      showToast('Profile updated successfully!', 'success');
      // Redirect or update state as needed
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error updating profile';
      showToast(errorMessage, 'error');
      console.error('Error updating profile:', errorMessage);
    } finally {
      setLoading(false);  // Hide loader
    }
  };

  
  return (
    <div>
    {loading && <Loader />}  
    <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
      <div className={styles.formGroup}>
        <label htmlFor="aadhar" className={styles.label}>Aadhar Number</label>
        <input
          type="text"
          name="aadhar"
          id="aadhar"
          placeholder="Aadhar Number"
          value={kycData.aadhar}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pan" className={styles.label}>PAN Number</label>
        <input
          type="text"
          name="pan"
          id="pan"
          placeholder="PAN Number"
          value={kycData.pan}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="kycStatus" className={styles.label}>KYC Status</label>
        <input
          type="text"
          name="kycStatus"
          id="kycStatus"
          placeholder="KYC Status"
          value={kycData.kycStatus}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="aadharpic" className={styles.label}>Aadhar Image</label>
        <input
          type="file"
          name="aadharpic"
          id="aadharpic"
          onChange={handleFileChange}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="panpic" className={styles.label}>PAN Image</label>
        <input
          type="file"
          name="panpic"
          id="panpic"
          onChange={handleFileChange}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.button}>Update KYC</button>
    </form>
    </div>
  );
}



