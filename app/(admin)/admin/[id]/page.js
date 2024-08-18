// 'use client';
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import styles from '../../../admincss/adminiddas.module.css';
// import Link from 'next/link';
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export default function UserDetail() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updateData, setUpdateData] = useState({
//     userUpdate: {},
//     profileUpdate: {},
//     kycUpdate: {},
//     transactionUpdate: {},
//   });
//   const { id } = useParams();
//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//       const fetchUserData = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.get(`/api/admin/user/userget/${id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUserData(response.data);
//         } catch (err) {
//           toast.error('Failed to fetch user data try again..|');
//           setError('Failed to fetch user data');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUserData();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const [type, key] = name.split('.');

//     setUpdateData((prev) => ({
//       ...prev,
//       [type]: {
//         ...prev[type],
//         [key]: value,
//       },
//     }));
//   };

//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`/api/admin/user/userget/${id}`, updateData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success('User data updated successfully');
     
//       router.push('/admin/dashboard'); // Redirect to the admin dashboard
//     } catch (err) {
//       toast.error('Failed to update user data');
     
//     }
//   };

//   const handleDelete = async () => {
//     if (confirm('Are you sure you want to delete this user?')) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.delete(`/api/admin/user/userget/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         toast.success('User deleted successfully');
        
//         router.push('/admin/dashboard'); // Redirect to the admin dashboard
//       } catch (err) {
//         toast.error('Failed to delete user');
        
//       }
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   // http://localhost:3000/api/upload/1723398629305-screenshot.jpg

//   return (
//     <div className={styles.userDetail}>
//       <h1>User Details</h1>
//       {userData && (
//         <div>
//           <p><strong>Name:</strong> {userData.user.username}</p>
//           <p><strong>Email:</strong> {userData.user.email}</p>
//           <p><strong>Phone Number:</strong> {userData.profile?.phoneNumber}</p>
//           <p><strong>KYC Status:</strong> 
//             <select 
//               name="kycUpdate.kycStatus" 
//               value={updateData.kycUpdate.kycStatus || userData.profile?.kycStatus}
//               onChange={handleChange}
//             >
//               <option value="kyc">KYC</option>
//               <option value="non kyc">Non KYC</option>
//             </select>
//           </p>
//           <p><strong>Bank Name:</strong> {userData.profile?.bankname}</p>
//           <p><strong>Account Number:</strong> {userData.profile?.accountnumbar}</p>

//           <h2>Transactions</h2>
//           {userData.transactions && userData.transactions.length > 0 ? (
//             userData.transactions.map((transaction) => (
//               <div key={transaction._id} className={styles.transaction}>
//                 <p><strong>Amount:</strong> {transaction.amount}</p>
//                 <p><strong>Status:</strong> {transaction.paymentStatus}</p>

//                 <Image
//                 width="200"
//                 height="200"
//                 className={styles.screenshotpig}
//                 alt="Screenshot"
//                 src={`/api/${transaction.screenshot.replace(/\\/g, '/')}`}
//               />

//               </div>
//             ))
//           ) : ( 
//             <p>No transactions found for this user.</p>
//           )}

//           <h2>Update User Information</h2>
//           <p><strong>Name:</strong>
//             <input
//               type="text"
//               name="userUpdate.name"
//               value={updateData.userUpdate.name || userData.user.name}
//               onChange={handleChange}
//             />
//           </p>

//           <h2>Update Profile Information</h2>
//           <p><strong>Phone Number:</strong>
//             <input
//               type="text"
//               name="profileUpdate.phoneNumber"
//               value={updateData.profileUpdate.phoneNumber || userData.profile?.phoneNumber}
//               onChange={handleChange}
//             />
//           </p>
//           <p><strong>Bank Name:</strong>
//             <input
//               type="text"
//               name="profileUpdate.bankname"
//               value={updateData.profileUpdate.bankname || userData.profile?.bankname}
//               onChange={handleChange}
//             />
//           </p>
//           <p><strong>Account Number:</strong>
//             <input
//               type="text"
//               name="profileUpdate.accountnumbar"
//               value={updateData.profileUpdate.accountnumbar || userData.profile?.accountnumbar}
//               onChange={handleChange}
//             />
//           </p>

//           <h2>Update KYC Information</h2>
//           <p><strong>KYC Status:</strong> 
//             <select 
//               name="kycUpdate.kycStatus" 
//               value={updateData.kycUpdate.kycStatus || userData.profile?.kycStatus}
//               onChange={handleChange}
//             >
//               <option value="kyc">KYC</option>
//               <option value="non kyc">Non KYC</option>
//             </select>
//           </p>

//           <h2>Update Transaction Status</h2>
//           <p><strong>Transaction Status: bulk action for all Transaction this user</strong> 
//             <select 
//               name="transactionUpdate.paymentStatus" 
//               value={updateData.transactionUpdate.paymentStatus || ''}
//               onChange={handleChange}
//             >
//               <option value="received">Received</option>
//               <option value="not received">Not Received</option>
//             </select>
//           </p>

//           <button onClick={handleUpdate} className={styles.updateButton}>
//             Update User Data
//           </button>

//           <button onClick={handleDelete} className={styles.deleteButton}>
//             Delete User
//           </button>
//         </div>
//       )}
//       <Link href="/admin/dashboard">Back to Admin Dashboard</Link>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../../../admincss/adminiddas.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../../../../components/Loader'; // Ensure you have this component
import { showToast } from '../../../../components/toastUtil'; // Use your custom toast function

export default function UserDetail() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateData, setUpdateData] = useState({
    userUpdate: {},
    profileUpdate: {},
    kycUpdate: {},
    transactionUpdate: {},
  });
  const [isUpdating, setIsUpdating] = useState(false); // State for button management
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`/api/admin/user/userget/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (err) {
          showToast('Failed to fetch user data, try again.', 'error');
          setError('Failed to fetch user data');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [type, key] = name.split('.');

    setUpdateData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/user/userget/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast('User data updated successfully', 'success');
      router.push('/admin/dashboard');
    } catch (err) {
      showToast('Failed to update user data', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this user?')) {
      setIsUpdating(true);
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/admin/user/userget/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showToast('User deleted successfully', 'success');
        router.push('/admin/dashboard');
      } catch (err) {
        showToast('Failed to delete user', 'error');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  if (loading) return <Loader />; // Show loader while data is loading
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.userDetail}>
      <h1>User Details</h1>
      {userData && (
        <div>
          <p><strong>Name:</strong> {userData.user.username}</p>
          <p><strong>Email:</strong> {userData.user.email}</p>
          <p><strong>Phone Number:</strong> {userData.profile?.phoneNumber}</p>
          <p><strong>KYC Status:</strong> 
            <select 
              name="kycUpdate.kycStatus" 
              value={updateData.kycUpdate.kycStatus || userData.profile?.kycStatus}
              onChange={handleChange}
            >
              <option value="kyc">KYC</option>
              <option value="non kyc">Non KYC</option>
            </select>
          </p>
          <p><strong>Bank Name:</strong> {userData.profile?.bankname}</p>
          <p><strong>Account Number:</strong> {userData.profile?.accountnumbar}</p>

          <h2>Transactions</h2>
          {userData.transactions && userData.transactions.length > 0 ? (
            userData.transactions.map((transaction) => (
              <div key={transaction._id} className={styles.transaction}>
                <p><strong>Amount:</strong> {transaction.amount}</p>
                <p><strong>Status:</strong> {transaction.paymentStatus}</p>

                <Image
                  width="200"
                  height="200"
                  className={styles.screenshotpig}
                  alt="Screenshot"
                  src={`/api/${transaction.screenshot.replace(/\\/g, '/')}`}
                />
              </div>
            ))
          ) : (
            <p>No transactions found for this user.</p>
          )}

          <h2>Update User Information</h2>
          <p><strong>Name:</strong>
            <input
              type="text"
              name="userUpdate.name"
              value={updateData.userUpdate.name || userData.user.name}
              onChange={handleChange}
            />
          </p>

          <h2>Update Profile Information</h2>
          <p><strong>Phone Number:</strong>
            <input
              type="text"
              name="profileUpdate.phoneNumber"
              value={updateData.profileUpdate.phoneNumber || userData.profile?.phoneNumber}
              onChange={handleChange}
            />
          </p>
          <p><strong>Bank Name:</strong>
            <input
              type="text"
              name="profileUpdate.bankname"
              value={updateData.profileUpdate.bankname || userData.profile?.bankname}
              onChange={handleChange}
            />
          </p>
          <p><strong>Account Number:</strong>
            <input
              type="text"
              name="profileUpdate.accountnumbar"
              value={updateData.profileUpdate.accountnumbar || userData.profile?.accountnumbar}
              onChange={handleChange}
            />
          </p>

          <h2>Update KYC Information</h2>
          <p><strong>KYC Status:</strong> 
            <select 
              name="kycUpdate.kycStatus" 
              value={updateData.kycUpdate.kycStatus || userData.profile?.kycStatus}
              onChange={handleChange}
            >
              <option value="kyc">KYC</option>
              <option value="non kyc">Non KYC</option>
            </select>
          </p>

          <h2>Update Transaction Status</h2>
          <p><strong>Transaction Status: bulk action for all Transactions this user</strong> 
            <select 
              name="transactionUpdate.paymentStatus" 
              value={updateData.transactionUpdate.paymentStatus || ''}
              onChange={handleChange}
            >
              <option value="received">Received</option>
              <option value="not received">Not Received</option>
            </select>
          </p>

          <button 
            onClick={handleUpdate} 
            className={styles.updateButton} 
            disabled={isUpdating}
          >
            Update User Data
          </button>

          <button 
            onClick={handleDelete} 
            className={styles.deleteButton} 
            disabled={isUpdating}
          >
            Delete User
          </button>
        </div>
      )}
      <Link href="/admin/dashboard">Back to Admin Dashboard</Link>
    </div>
  );
}

