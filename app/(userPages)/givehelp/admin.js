'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../../pagedesign/Trans.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../components/Loader';  // Import the loader component
import Image from 'next/image';


const AdminTransaction = () => {
  const [amount, setAmount] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [companyData, setCompanyData] = useState(null); // State to store company data
  const [companyDataAvailable, setCompanyDataAvailable] = useState(false); // State to check if company data is available
  const [screenshotPreview, setScreenshotPreview] = useState(''); // For image preview
  const [loading, setLoading] = useState(false);  // Add loading state
  const router = useRouter();
  const [userId, setUserId] = useState('');

  const [referrer, setReferrer] = useState(null);
  const [referrerProfile, setReferrerProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);  // Show loader while fetching data
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
        toast.error('Failed to fetch user data');
        console.error('Error fetching user data:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false);  // Hide loader after fetching
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);  // Show loader while fetching data
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/company', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (data && data.role === 'company') {
          setCompanyData(data);
          setCompanyDataAvailable(true);
        } else {
          setCompanyDataAvailable(false);
        }
      } catch (error) {
        toast.error('Failed to fetch company data');
        console.error('Error fetching company data:', error.response?.data?.message || error.message);
        setCompanyDataAvailable(false);
      } finally {
        setLoading(false);  // Hide loader after fetching
      }
    };

    fetchCompanyData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setScreenshotPreview(previewUrl);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!screenshot) {
      toast.error('Please select a screenshot');
      return;
    }

    setLoading(true);  // Show loader while uploading
    const reader = new FileReader(); 
    reader.readAsDataURL(screenshot);
    reader.onload = async () => {
      const screenshotData = reader.result;

      try {
        const res = await axios.post('/api/transactions', {
          amount,
          screenshot: screenshotData,
          userId,
        });

        if (res.status === 200) {
          toast.success('Payment processed successfully');
          router.push('/mypayment');
        } else {
          console.error('Error uploading transaction:', res.data.message);
          toast.error('Error uploading transaction');
        }
      } catch (error) {
        toast.error('Failed to upload transaction');
        console.error('Error uploading transaction:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false);  // Hide loader after uploading
      }
    };
  };


  return (
    <div className={styles.container}>
    {loading && <Loader />}
      <form onSubmit={handleUpload} className={styles.form}>
        <h1 className={styles.title}>Upload Transaction by Company Account</h1>

        {companyDataAvailable ? (
          <>
          <div className={styles.section}>
            <h2 className={styles.title} >Company Account:</h2>
            <p>ID: {companyData?._id}</p>
            <p>Name: {companyData?.username}</p>
            <p>Email: {companyData?.email}</p>
            <p>Phone: {companyData?.phoneNumber || 'Static Phone'}</p>
            <p>UPI ID: {companyData?.upiid || 'Static UPI ID'}</p>
          </div>
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

            {/* Image Preview */}
            {screenshotPreview && (

              

              <div className={styles.previewContainer}>
               
                <Image src={screenshotPreview} width={150} height={150} alt="Image Preview" className={styles.preview} />
              </div>
            )}

            <button type="submit" className={styles.button}>Upload</button>
          </>
        ) : (
          <p className={styles.noData}>No company data available to display.</p>
        )}
      </form>
    </div>
  );
};

export default AdminTransaction;


