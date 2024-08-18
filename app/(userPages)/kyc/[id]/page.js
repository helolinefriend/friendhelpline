"use client";



// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import styles from '../../../../styles/Profile/profileId.module.css';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function KycPage({ params }) {
//   const { id } = params;
//   const [kycData, setKycData] = useState({
//     aadhar: '',
//     pan: '',
//     kycStatus: 'kyc', // default value
//     aadharpic: '',
//     panpic: '',
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
//     const fetchKycData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get(`/api/user/kyc/${id}/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setKycData(data.kyc);
//       } catch (error) {
//         toast.error('Error fetching KYC data');
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
//     const file = files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFileData({ ...fileData, [name]: file });
//         setScreenshotPreview({ ...screenshotPreview, [name]: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new FormData();
      
//       // Append only the changed fields
//       if (kycData.aadhar) formData.append('aadhar', kycData.aadhar);
//       if (kycData.pan) formData.append('pan', kycData.pan);
//       if (kycData.kycStatus) formData.append('kycStatus', kycData.kycStatus);
//       if (fileData.aadharpic) formData.append('aadharpic', fileData.aadharpic);
//       if (fileData.panpic) formData.append('panpic', fileData.panpic);

//       const { data } = await axios.put(`/api/user/kyc/${id}/update`, formData, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       toast.success('KYC updated successfully!');
//       router.push('/kyc');
//       setKycData(data); // Update the form with new data
     
//     } catch (error) {
//       toast.error('Error updating KYC data');
//       console.error('Error updating KYC:', error.response ? error.response.data : error.message);
//     }
//   };

//   return ( 
//     <div className={styles.updatecontainer}>
//     <form onSubmit={handleSubmit} className={styles.updateform}>
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
//         <label htmlFor="aadharpic" className={styles.label}>Aadhar Picture</label>
//         <input
//           type="file"
//           name="aadharpic"
//           id="aadharpic"
//           onChange={handleFileChange}
//           className={styles.input}
//         />
//         {screenshotPreview.aadharpic && (
//           <div className={styles.previewContainer}>
//             <Image 
//               src={screenshotPreview.aadharpic} 
//               alt="Aadhar Preview" 
//               width={150} 
//               height={150} 
//               className={styles.previewImage} 
//             />
//           </div>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label htmlFor="panpic" className={styles.label}>PAN Picture</label>
//         <input
//           type="file"
//           name="panpic"
//           id="panpic"
//           onChange={handleFileChange}
//           className={styles.input}
//         />
//         {screenshotPreview.panpic && (
//           <div className={styles.previewContainer}>
//             <Image 
//               src={screenshotPreview.panpic} 
//               alt="PAN Preview" 
//               width={150} 
//               height={150} 
//               className={styles.previewImage} 
//             />
//           </div>
//         )}
//       </div>

//       <button type="submit" className={styles.button}>Update KYC</button>
//     </form>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '../../../../styles/Profile/profileId.module.css';
import { useRouter } from 'next/navigation';
import { showToast } from '../../../../components/toastUtil';  // Use showToast instead of toast
import Loader from '../../../../components/Loader';  // Import Loader component

export default function KycPage({ params }) {
  const { id } = params;
  const [kycData, setKycData] = useState({
    aadhar: '',
    pan: '',
    kycStatus: 'kyc',
    aadharpic: '',
    panpic: '',
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

  useEffect(() => {
    const fetchKycData = async () => {
      try {
        setLoading(true);  // Show loader
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`/api/user/kyc/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setKycData(data.kyc);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error fetching KYC data';
        showToast(errorMessage, 'error');
        console.error('Error fetching KYC data:', errorMessage);
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
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData({ ...fileData, [name]: file });
        setScreenshotPreview({ ...screenshotPreview, [name]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);  // Show loader
      const token = localStorage.getItem('token');
      const formData = new FormData();

      // Append only the changed fields
      if (kycData.aadhar) formData.append('aadhar', kycData.aadhar);
      if (kycData.pan) formData.append('pan', kycData.pan);
      if (kycData.kycStatus) formData.append('kycStatus', kycData.kycStatus);
      if (fileData.aadharpic) formData.append('aadharpic', fileData.aadharpic);
      if (fileData.panpic) formData.append('panpic', fileData.panpic);

      const { data } = await axios.put(`/api/user/kyc/${id}/update`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      showToast('KYC updated successfully!', 'success');
      router.push('/kyc');
      setKycData(data);  // Update the form with new data
     
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error updating KYC data';
      showToast(errorMessage, 'error');
      console.error('Error updating KYC:', errorMessage);
    } finally {
      setLoading(false);  // Hide loader
    }
  };

  return (
    <div className={styles.updatecontainer}>
      {loading && <Loader />}  {/* Show loader while loading */}
      <form onSubmit={handleSubmit} className={styles.updateform}>
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
          <label htmlFor="aadharpic" className={styles.label}>Aadhar Picture</label>
          <input
            type="file"
            name="aadharpic"
            id="aadharpic"
            onChange={handleFileChange}
            className={styles.input}
          />
          {screenshotPreview.aadharpic && (
            <div className={styles.previewContainer}>
              <Image 
                src={screenshotPreview.aadharpic} 
                alt="Aadhar Preview" 
                width={150} 
                height={150} 
                className={styles.previewImage} 
              />
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="panpic" className={styles.label}>PAN Picture</label>
          <input
            type="file"
            name="panpic"
            id="panpic"
            onChange={handleFileChange}
            className={styles.input}
          />
          {screenshotPreview.panpic && (
            <div className={styles.previewContainer}>
              <Image 
                src={screenshotPreview.panpic} 
                alt="PAN Preview" 
                width={150} 
                height={150} 
                className={styles.previewImage} 
              />
            </div>
          )}
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Updating...' : 'Update KYC'}
        </button>
      </form>
    </div>
  );
}
