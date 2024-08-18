// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import styles from '../../../../styles/Profile/profileId.module.css';
// import { useRouter } from 'next/navigation';// Use next/router to access query parameters
// import { showToast } from '../../../../components/toastUtil'; // Use showToast instead of toast
// import Loader from '../../../../components/Loader'; // Import Loader component

// import Link from 'next/link';

// const Profilee = ({ params }) => {
//   const [kyc, setKyc] = useState(null);
//   const [loading, setLoading] = useState(true); // Loading state
//   const [profile, setProfile] = useState({
//     aadhar: '',
//     pan: '',
//     kycStatus: '',
//   });
  
//   const router = useRouter();

//   // Fetch user profile data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true); // Show loader
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get('/api/user/profile/userid/id', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(data);
//       } catch (error) {
//         showToast('Failed to fetch user data', 'error');
//         console.error('Error fetching profile:', error.response ? error.response.data : error.message);
//       } finally {
//         setLoading(false); // Hide loader
//       }
//     }; 

//     fetchProfile();
//   }, []);

//   // Fetch KYC data
//   useEffect(() => {
//     const fetchKYC = async () => {
//       try {
//         setLoading(true); // Show loader
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get(`/api/check/pro/${profile.userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setKyc(data.profile); // Assuming `profile` is returned from the backend
  
//         // Check if KYC data is missing or incomplete
//         if (!data.profile) {
//           showToast(' Update your profile to access this page', 'info');
//           router.push(`/user/profile/${profile.userId}`);
//         }
//       } catch (error) {
//         console.error('Error fetching profile data:', error.response ? error.response.data : error.message);
  
//         // Handle specific cases for 404 error
//         if (error.response?.status === 404) {
//             showToast('2 Complete your profile to access this page', 'info');
//           router.push('/user/profile'); // Redirect to home page if profile is null
//         } else {
//           showToast('Error fetching KYC data', 'error');
//         }
//       } finally {
//         setLoading(false); // Hide loader
//       }
//     };
  
//     if (profile?.userId) {
//       fetchKYC();
//     } else {
//         showToast('1 1 Complete your profile to access this page', 'info');
//           router.push('/user/profile'); 
//     }
//   }, [profile?.userId, router]);
  

//   if (loading) {
//     return <Loader />; // Display the Loader component while loading
//   }

//   if (!kyc) {
//     return <div>No KYC data available.</div>;
//   }

//   return (
//     <> 
//     </>

//   );
// };

// export default Profilee;




'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { showToast } from '../../../../components/toastUtil';
import Loader from '../../../../components/Loader';

const Profilee = () => {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null); // Initialize as null to handle loading properly
  
  const router = useRouter();

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/user/profile/userid/id', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data); // Set the profile data
      } catch (error) {
        showToast('Failed to fetch user data', 'error');
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch KYC data and handle redirection
  useEffect(() => {
    const fetchKYC = async () => {
      if (!profile || !profile.userId) {
        showToast('1 1 Complete your profile to access this page', 'info');
        router.push('/user/profile');
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`/api/check/pro/${profile.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setKyc(data.profile); // Assuming `profile` is returned from the backend

        if (!data.profile) {
          showToast('Complete your profile to access this page', 'info');
          router.push(`/user/profile/${profile.userId}`);
        }
      } catch (error) {
        console.error('Error fetching KYC data:', error.response ? error.response.data : error.message);

        if (error.response?.status === 404) {
          showToast('2 Complete your profile to access this page', 'info');
          router.push('/user/profile');
        } else {
          showToast('Error fetching KYC data', 'error');
        }
      } finally {
        setLoading(false);
      }
    };

    if (profile) {
      fetchKYC();
    }
  }, [profile, router]);

  if (loading) {
    return <Loader />;
  }

  if (!kyc) {
    return <div>No KYC data available.</div>;
  }

  return (
    <> 
    </>
  );
};

export default Profilee;
