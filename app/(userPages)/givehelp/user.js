// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import styles from '../../../pagedesign/Trans.module.css';

// import Image from 'next/image';

// const user = () => {
//   const [userId, setUserId] = useState('');
//   const [amount, setAmount] = useState('');
//   const [screenshot, setScreenshot] = useState(null);
//   const [referrer, setReferrer] = useState(null);
//   const [referrerProfile, setReferrerProfile] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get('/api/myteam', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUserId(data.myInfo._id);
//         setUserProfile(data.myProfile);
//         setReferrer(data.referredBy);
//         setReferrerProfile(data.referredByProfile);
//       } catch (error) {
//         console.error('Error fetching user data:', error.response?.data?.message || error.message);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleFileChange = (e) => {
//     setScreenshot(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     const reader = new FileReader();
//     reader.readAsDataURL(screenshot);
//     reader.onload = async () => {
//       const screenshotData = reader.result;

//       try {
//         const res = await axios.post('/api/transactions', {
//           userId,
//           amount,
//           screenshot: screenshotData,
//         });

//         if (res.status === 200) {
//           console.log('Payment processed successfully');
//         } else {
//           console.error('Error uploading transaction:', res.data.message);
//         }
//       } catch (error) {
//         console.error('Error uploading transaction:', error.response?.data?.message || error.message);
//       }
//     };
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleUpload} className={styles.form}>
//         <h1 className={styles.title}>Upload Transaction by User to User</h1>
//         <h2>My Profile:</h2>
//         <p>Name: {userProfile?.realname || 'Static Name'}</p>
//         <p>Phone: {userProfile?.phoneNumber || 'Static Phone'}</p>
       
//         <p>UPI ID: {userProfile?.upiid || 'Static UPI ID'}</p>
//         <h2>Who Referred Me:</h2>
//         <p>ID: {referrer?._id}</p>
//         <p>Name: {referrer?.username}</p>
//         <p>Email: {referrer?.email}</p>
//         <p>Phone: {referrerProfile?.phoneNumber || 'Static Phone'}</p>

//         <p>UPI ID: {referrerProfile?.upiid || 'Static UPI ID'}</p>

//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className={styles.input}
//           required
//         />
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className={styles.input}
//           required
//         />
//         <button type="submit" className={styles.button}>Upload</button>



//       </form>

//     </div>
//   );
// };

// export default user;



// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import styles from '../../../pagedesign/Trans.module.css';
// import Image from 'next/image';
 
// const User = () => {
//   const [userId, setUserId] = useState('');
//   const [amount, setAmount] = useState('');
//   const [screenshot, setScreenshot] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null); // For image preview
//   const [referrer, setReferrer] = useState(null);
//   const [referrerProfile, setReferrerProfile] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get('/api/myteam', { 
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUserId(data.myInfo._id);
//         setUserProfile(data.myProfile);
//         setReferrer(data.referredBy);
//         setReferrerProfile(data.referredByProfile);
//       } catch (error) {
//         console.error('Error fetching user data:', error.response?.data?.message || error.message);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setScreenshot(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     const reader = new FileReader(); 
//     reader.readAsDataURL(screenshot);
//     reader.onload = async () => {
//       const screenshotData = reader.result;
 
//       try {
//         const res = await axios.post('/api/transactions', {
//           userId,
//           amount,
//           screenshot: screenshotData,
//         });

//         if (res.status === 200) {
//           console.log('Payment processed successfully');
//           // Redirect or update the UI after successful upload
//         } else {
//           console.error('Error uploading transaction:', res.data.message);
//         }
//       } catch (error) {
//         console.error('Error uploading transaction:', error.response?.data?.message || error.message);
//       }
//     };
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleUpload} className={styles.form}>
//         <h1 className={styles.title}>Upload Transaction by User to User</h1>

//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Who Referred Me</h2>
//           <p><strong>ID:</strong> {referrer?._id || 'N/A'}</p>
//           <p><strong>Name:</strong> {referrer?.username || 'N/A'}</p>
//           <p><strong>Email:</strong> {referrer?.email || 'N/A'}</p>
//           <p><strong>Phone:</strong> {referrerProfile?.phoneNumber || 'Static Phone'}</p>
//           <p><strong>UPI ID:</strong> {referrerProfile?.upiid || 'Static UPI ID'}</p>
//         </div>

//         <div className={styles.inputGroup}>
//           <input
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className={styles.input}
//             required
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className={styles.input}
//             required
//           />
//         </div>

//         {previewUrl && (
//           <div className={styles.previewContainer}>
//             <Image className={styles.preview} src={previewUrl} alt="Preview" width={150} height={150} />
//           </div>
//         )}

//         <button type="submit" className={styles.button}>Upload</button>
//       </form>
//     </div>
//   );
// };
// export default User;






'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../../pagedesign/Trans.module.css';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../components/Loader'; 

const User = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [referrer, setReferrer] = useState(null);
  const [referrerProfile, setReferrerProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);



  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       const { data } = await axios.get('/api/myteam', { 
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       setUserId(data.myInfo._id);
  //       setUserProfile(data.myProfile);
  //       setReferrer(data.referredBy);
  //       setReferrerProfile(data.referredByProfile);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error.response?.data?.message || error.message);
  //       toast.error('Failed to fetch user data');
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setScreenshot(file);

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleUpload = async (e) => {
  //   e.preventDefault();

  //   const reader = new FileReader(); 
  //   reader.readAsDataURL(screenshot);
  //   reader.onload = async () => {
  //     const screenshotData = reader.result;

  //     try {
  //       const res = await axios.post('/api/transactions', {
  //         userId,
  //         amount,
  //         screenshot: screenshotData,
  //       });

  //       if (res.status === 200) {
  //         toast.success('Payment processed successfully');
  //         router.push('/mypayment'); // Replace with the route you want to redirect to
  //       } else {
  //         console.error('Error uploading transaction:', res.data.message);
  //         toast.error('Error uploading transaction');
  //       }
  //     } catch (error) {
  //       console.error('Error uploading transaction:', error.response?.data?.message || error.message);
  //       toast.error('Failed to upload transaction');
  //     }
  //   };
  // };

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
        console.error('Error fetching user data:', error.response?.data?.message || error.message);
        toast.error('Failed to fetch user data');
      } finally {
        setLoading(false);  // Hide loader after fetching
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
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
          userId,
          amount,
          screenshot: screenshotData,
        });

        if (res.status === 200) {
          toast.success('Payment processed successfully');
          router.push('/mypayment'); // Replace with the route you want to redirect to
        } else {
          console.error('Error uploading transaction:', res.data.message);
          toast.error('Error uploading transaction');
        }
      } catch (error) {
        console.error('Error uploading transaction:', error.response?.data?.message || error.message);
        toast.error('Failed to upload transaction');
      } finally {
        setLoading(false);  // Hide loader after uploading
      }
    };
  };



  return (
    <div className={styles.container}>

    {loading && <Loader />}

      {referrer === null || referrerProfile === null ? (
        <div className={styles.title}>
          <h2>You dont have a referrer. Please direct the full payment to the company.</h2>
        </div>
      ) : (
        <form onSubmit={handleUpload} className={styles.form}>
          <h1 className={styles.title}>Upload Transaction by User to User</h1>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Who Referred Me</h2>
            <p><strong>ID:</strong> {referrer?._id || 'N/A'}</p>
            <p><strong>Name:</strong> {referrer?.username || 'N/A'}</p>
            <p><strong>Email:</strong> {referrer?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {referrerProfile?.phoneNumber || 'Static Phone'}</p>
            <p><strong>UPI ID:</strong> {referrerProfile?.upiid || 'Static UPI ID'}</p>
          </div>

          <div className={styles.inputGroup}>
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
              accept="image/*"
              onChange={handleFileChange}
              className={styles.input}
              required
            />
          </div>

          {previewUrl && (
            <div className={styles.previewContainer}>
              <Image className={styles.preview} src={previewUrl} alt="Preview" width={150} height={150} />
            </div>
          )}

          <button type="submit" className={styles.button}>Upload</button>
        </form>
      )}
    </div>
  );
};

export default User;





