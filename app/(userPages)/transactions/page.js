'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../../pagedesign/Trans.module.css';

const UploadTransaction = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [referrer, setReferrer] = useState(null);
  const [referrerProfile, setReferrerProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/myteam', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserId(data.myInfo._id);
        setUserProfile(data.myProfile);
        setReferrer(data.referredBy);
        setReferrerProfile(data.referredByProfile);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.message || error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(screenshot);
    reader.onload = async () => {
      const screenshotData = reader.result;

      try {
        const res = await axios.post('/api/transactions', {
          userId,
          amount,
          screenshot: screenshotData,
        });

        if (res.status === 200) {
          console.log('Payment processed successfully');
        } else {
          console.error('Error uploading transaction:', res.data.message);
        }
      } catch (error) {
        console.error('Error uploading transaction:', error.response?.data?.message || error.message);
      }
    };
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleUpload} className={styles.form}>
        <h1 className={styles.title}>Upload Transaction by User to User</h1>
        <h2>My Profile:</h2>
        <p>Name: {userProfile?.realname || 'Static Name'}</p>
        <p>Phone: {userProfile?.phoneNumber || 'Static Phone'}</p>
       
        <p>UPI ID: {userProfile?.upiid || 'Static UPI ID'}</p>
        <h2>Who Referred Me:</h2>
        <p>ID: {referrer?._id}</p>
        <p>Name: {referrer?.username}</p>
        <p>Email: {referrer?.email}</p>
        <p>Phone: {referrerProfile?.phoneNumber || 'Static Phone'}</p>

        <p>UPI ID: {referrerProfile?.upiid || 'Static UPI ID'}</p>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Upload</button>
      </form>
    </div>
  );
};

export default UploadTransaction;

