'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../../pagedesign/Givehelp.module.css';

const ReferralInfo = () => {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/api/givehelp', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [router]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Referral Information</h1>
      <div className={styles.details}>
        <h2>My Info</h2>
        <div>Name: {userData.myInfo.username}</div>
        <div>Email: {userData.myInfo.email}</div>
        <div>Phone: {userData.profile?.phoneNumber || 'N/A'}</div>
        <div>Profile: {userData.profile?.profile || 'N/A'}</div>
        <div>KYC Status: {userData.profile?.kycStatus || 'N/A'}</div>
        <div>Referral Link: {userData.profile?.userreferlink || 'N/A'}</div>
        <div>Address1: {userData.profile?.address1 || 'N/A'}</div>
        <div>Address2: {userData.profile?.address2 || 'N/A'}</div>
        <div>State: {userData.profile?.state || 'N/A'}</div>
        <div>Pincode: {userData.profile?.pincode || 'N/A'}</div>
        <div>Bank Name: {userData.profile?.bankname || 'N/A'}</div>
        <div>Account Number: {userData.profile?.accountnumbar || 'N/A'}</div>
        <div>IFSC Code: {userData.profile?.ifcecode || 'N/A'}</div>
        <div>Bank Branch: {userData.profile?.bankbranch || 'N/A'}</div>
        <div>Bank Pincode: {userData.profile?.bankpincode || 'N/A'}</div>
        <div>Bank Full Address: {userData.profile?.bankfulladdress || 'N/A'}</div>
        <div>Real Name: {userData.profile?.realname || 'N/A'}</div>
        <div>QR: {userData.profile?.qr || 'N/A'}</div>
        <div>UPI ID: {userData.profile?.upiid || 'N/A'}</div>
        
        <h2>Referred By</h2>
        {userData.referredBy ? (
          <div className={styles.userinofdetails}>
            <div>Name: {userData.referredBy.username}</div>
            <div>Email: {userData.referredBy.email}</div>
            <div>Phone: {userData.referredByProfile?.phoneNumber || 'N/A'}</div>
            <div>Profile: {userData.referredByProfile?.profile || 'N/A'}</div>
            <div>KYC Status: {userData.referredByProfile?.kycStatus || 'N/A'}</div>
            <div>Referral Link: {userData.referredByProfile?.userreferlink || 'N/A'}</div>
            <div>Address1: {userData.referredByProfile?.address1 || 'N/A'}</div>
            <div>Address2: {userData.referredByProfile?.address2 || 'N/A'}</div>
            <div>State: {userData.referredByProfile?.state || 'N/A'}</div>
            <div>Pincode: {userData.referredByProfile?.pincode || 'N/A'}</div>
            <div>Bank Name: {userData.referredByProfile?.bankname || 'N/A'}</div>
            <div>Account Number: {userData.referredByProfile?.accountnumbar || 'N/A'}</div>
            <div>IFSC Code: {userData.referredByProfile?.ifcecode || 'N/A'}</div>
            <div>Bank Branch: {userData.referredByProfile?.bankbranch || 'N/A'}</div>
            <div>Bank Pincode: {userData.referredByProfile?.bankpincode || 'N/A'}</div>
            <div>Bank Full Address: {userData.referredByProfile?.bankfulladdress || 'N/A'}</div>
            <div>Real Name: {userData.referredByProfile?.realname || 'N/A'}</div>
            <div>QR: {userData.referredByProfile?.qr || 'N/A'}</div>
            <div>UPI ID: {userData.referredByProfile?.upiid || 'N/A'}</div>
          </div>
        ) : (
          <p className='ptag'>You were not referred by anyone.</p>
        )}
      </div>
    </div>
  );
};

export default ReferralInfo;


