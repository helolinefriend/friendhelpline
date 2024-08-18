// "use client";

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '../../../styles/Profile/profileId.module.css';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const KYCPage = ({ params }) => {
//   const [kyc, setKyc] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState({
//     aadhar: '',
//     pan: '',
//     kycStatus: '',
//   });
  
//   const router = useRouter();
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get('/api/user/profile/userid/id', {
//           // const { data } = await axios.get(`/api/user/kyc/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(data);
//       } catch (error) {
//         toast.error('Failed to fetch user data');
//         console.error('Error fetching profile:', error.response ? error.response.data : error.message);
//       }
//     }; 

//     fetchProfile();
//   }, []);


//   useEffect(() => {
//     const fetchKYC = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get(`/api/user/kyc/${profile.userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setKyc(data.kyc);
//       } catch (error) {
//         console.error('Error fetching KYC data:', error.response ? error.response.data : error.message);
//         // Redirect to KYC creation page if KYC data not found
//         if (error.response?.status === 404) {
//           router.push(`/kyc/${profile.userId}/create`);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (profile.userId) {
//       fetchKYC();
//     }
//   }, [profile.userId, router]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!kyc) {
//     return <div>No KYC data available.</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>KYC Details</h1>
      
//       <div className={styles.transactionDetails}>
//         <p><strong>Aadhar Number:</strong> {kyc.aadhar}</p>
//         <p><strong>Pan Number:</strong> {kyc.pan}</p>
//         <p className={styles.previewContainer} ><strong  >Aadhar Picture:</strong> <Image className={styles.preview} src={kyc.aadharpic} alt="Aadhar Picture" width="200" height="200" /></p>
//         <p className={styles.previewContainer} ><strong>PAN Picture:</strong> <Image className={styles.preview} src={kyc.panpic} alt="PAN Picture" width="200"   height="200" /></p>
//         <p><strong>Verification Number:</strong> {kyc.verfiynumbar}</p>
        
//         <p><strong>Updated At:</strong> {new Date(kyc.updatedAt).toLocaleDateString()}</p>
//         <Link className={styles.button} href={`/kyc/${profile.userId}`}>Update KYC Profile</Link>
       
//       </div>
//     </div>
//   );
// };

// export default KYCPage;





"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../styles/Profile/profileId.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { showToast } from '../../../components/toastUtil'; // Import the custom showToast function
import Loader from '../../../components/Loader'; // Import the Loader component
import Profilee from "../../(userPages)/givehelp/check/Profile"

const KYCPage = ({ params }) => {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [profile, setProfile] = useState({
    aadhar: '',
    pan: '',
    kycStatus: '',
  });
  
  const router = useRouter();

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true); // Show loader
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/user/profile/userid/id', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (error) {
        showToast('Failed to fetch user data', 'error');
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false); // Hide loader
      }
    }; 

    fetchProfile();
  }, []);

  // Fetch KYC data
  useEffect(() => {
    const fetchKYC = async () => {
      try {
        setLoading(true); // Show loader
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`/api/user/kyc/${profile.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setKyc(data.kyc);
      } catch (error) {
        console.error('Error fetching KYC data:', error.response ? error.response.data : error.message);
        if (error.response?.status === 404) {
          showToast('KYC data not found. Redirecting to creation page...', 'info');
          router.push(`/kyc/${profile.userId}/create`); 
        } else {
          showToast('Error fetching KYC data', 'error');
        }
      } finally {
        setLoading(false); // Hide loader
      }
    };

    if (profile.userId) {
      fetchKYC();
    }
  }, [profile.userId, router]);

  if (loading) {
    return <Loader />; // Display the Loader component while loading
  }

  if (!kyc) {
    return <div>No KYC data available.</div>;
  }

  return (
    <div className={styles.container}>
    <Profilee />
      <h1 className={styles.title}>KYC Details</h1>
      
      <div className={styles.transactionDetails}>
        <p><strong>Aadhar Number:</strong> {kyc.aadhar}</p>
        <p><strong>Pan Number:</strong> {kyc.pan}</p>
        <p className={styles.previewContainer}><strong>Aadhar Picture:</strong> 
          <Image className={styles.preview} src={kyc.aadharpic} alt="Aadhar Picture" width="200" height="200" />
        </p>
        <p className={styles.previewContainer}><strong>PAN Picture:</strong> 
          <Image className={styles.preview} src={kyc.panpic} alt="PAN Picture" width="200" height="200" />
        </p>
        <p><strong>Verification Number:</strong> {kyc.verfiynumbar}</p>
        <p><strong>Updated At:</strong> {new Date(kyc.updatedAt).toLocaleDateString()}</p>
        
        <Link className={styles.button} href={`/kyc/${profile.userId}`}>
          Update KYC Profile
        </Link>
      </div>
    </div>
  );
};

export default KYCPage;



