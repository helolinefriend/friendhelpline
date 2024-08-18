// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useRouter } from 'next/navigation';
// import styles from '../../../../admincss/tras.module.css';
// import { toast } from 'react-toastify';
// import Image from 'next/image';

// export default function TransactionDetail() {
//   const [transaction, setTransaction] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updateData, setUpdateData] = useState({ paymentStatus: '', adminUpdate: '' });
//   const router = useRouter();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       const fetchTransaction = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.get(`/api/admin/tras/${id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setTransaction(response.data);
//           setUpdateData({
//             paymentStatus: response.data.paymentStatus || '',
//             adminUpdate: response.data.adminUpdate || '',
//           });
//         } catch (err) {
//           setError('Failed to fetch transaction details.');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchTransaction();
//     }
//   }, [id]);

//   const handleInputChange = (e) => {
//     setUpdateData({
//       ...updateData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`/api/admin/tras/${id}`, updateData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       toast.success('Transaction updated successfully');
//     } catch (err) {
//       toast.error('Failed to update transaction');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.transactionContainer}>
//       <h1>Transaction Details</h1>
//       {transaction ? (
      
//         <div className={styles.transactionCard}>
//           <form onSubmit={handleSubmit}>
//           <div>
//           <label>Payment Status:</label>
//           <select
//             name="paymentStatus"
//             value={updateData.paymentStatus}
//             onChange={handleInputChange}
//           >
//             <option value="reviewed">Reviewed</option>
//             <option value="not_reviewed">Not Reviewed</option>
//           </select>
//         </div>


//         <div>
//           <label>Admin Update:</label>
//            <select
//            name="adminUpdate"
//            value={updateData.adminUpdate}
//            onChange={handleInputChange}
//           >
//             <option value="pending">Pending</option>
//             <option value="complete">Complete</option>
            
//           </select>

//         </div>


//             <button type="submit">Update Transaction</button>
//           </form>
//           <p><strong>Amount:</strong> {transaction.amount}</p>
//           <p><strong>Status:</strong> {transaction.paymentStatus}</p>
//           <p><strong>Admin Update:</strong> {transaction.adminUpdate}</p>
//           <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
//           <div className={styles.screenshotContainer}>
//             <strong>Screenshot:</strong>
//             {transaction.screenshot ? (
//               <Image
//                 width="200"
//                 height="200"
//                 className={styles.screenshotpig}
//                 alt="Screenshot"
//                 src={`/api/${transaction.screenshot.replace(/\\/g, '/')}`}
//               />
//             ) : (
//               <p>No screenshot available</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>No transaction details found.</p>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import styles from '../../../../admincss/tras.module.css';
import Image from 'next/image';
import Loader from '../../../../../components/Loader'; // Ensure you have this component
import { showToast } from '../../../../../components/toastUtil'; // Use your custom toast function

export default function TransactionDetail() {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateData, setUpdateData] = useState({ paymentStatus: '', adminUpdate: '' });
  const [updating, setUpdating] = useState(false); // For button state management
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTransaction = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`/api/admin/tras/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTransaction(response.data);
          setUpdateData({
            paymentStatus: response.data.paymentStatus || '',
            adminUpdate: response.data.adminUpdate || '',
          });
        } catch (err) {
          setError('Failed to fetch transaction details.');
          showToast('Failed to fetch transaction details.', 'error');
        } finally {
          setLoading(false);
        }
      };

      fetchTransaction();
    }
  }, [id]);

  const handleInputChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true); // Disable button while updating
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/tras/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      showToast('Transaction updated successfully', 'success');
      router.push('/admin/dashboard'); // Redirect to the transactions list after update
    } catch (err) {
      showToast('Failed to update transaction', 'error');
    } finally {
      setUpdating(false); // Re-enable button after updating
    }
  };

  if (loading) return <Loader />; // Display Loader while fetching data
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.transactionContainer}>
      <h1>Transaction Details</h1>
      {transaction ? (
        <div className={styles.transactionCard}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Payment Status:</label>
              <select
                name="paymentStatus"
                value={updateData.paymentStatus}
                onChange={handleInputChange}
              >
                <option value="reviewed">Reviewed</option>
                <option value="not_reviewed">Not Reviewed</option>
              </select>
            </div>

            <div>
              <label>Admin Update:</label>
              <select
                name="adminUpdate"
                value={updateData.adminUpdate}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </select>
            </div>

            <button type="submit" disabled={updating}>
              {updating ? 'Updating...' : 'Update Transaction'}
            </button>
          </form>
          <p><strong>Amount:</strong> {transaction.amount}</p>
          <p><strong>Status:</strong> {transaction.paymentStatus}</p>
          <p><strong>Admin Update:</strong> {transaction.adminUpdate}</p>
          <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
          <div className={styles.screenshotContainer}>
            <strong>Screenshot:</strong>
            {transaction.screenshot ? (
              <Image
                width="200"
                height="200"
                className={styles.screenshotpig}
                alt="Screenshot"
                src={`/api/${transaction.screenshot.replace(/\\/g, '/')}`}
              />
            ) : (
              <p>No screenshot available</p>
            )}
          </div>
        </div>
      ) : (
        <p>No transaction details found.</p>
      )}
    </div>
  );
}
