'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '../../../../styles/Profile/profileId.module.css';
import { useRouter } from 'next/navigation';// Use next/router to access query parameters
import { showToast } from '../../../../components/toastUtil'; // Use showToast instead of toast
import Loader from '../../../../components/Loader'; // Import Loader component

import Link from 'next/link';

const Kyc = ({ params }) => {
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
          showToast('Comapte your kyc to accect this page ', 'info');
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
    <> 
    </>

  );
};

export default Kyc;




