// test 3 
// "use client";

// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// import styles from '../../../../pagedesign/updatepayment.module.css';

// const UpdatePaymentStatus = ({ transaction }) => {
//   const [paymentStatus, setPaymentStatus] = useState(transaction.paymentStatus || '');
//   const router = useRouter();

//   const handleUpdate = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//       return;
//     }

//     try {
//       await axios.put(`/api/payupdate/${transaction._id}`, { paymentStatus }, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       alert('Payment status updated successfully');
//       router.reload();
//     } catch (error) {
//       console.error('Error updating payment status:', error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}> <h3 className={styles.header}>Transaction Details</h3></div>
//       <div className={styles.transactionDetails}>
//         <p><strong>Admin Update:</strong> {transaction.adminUpdate}</p>
//         <p><strong>Amount:</strong> {transaction.amount}</p>
//         <p><strong>Payment Status:</strong> {transaction.paymentStatus}</p>
//         <p><strong>Referrer Email:</strong> {transaction.referrerEmail}</p>
//         <p><strong>Referrer ID:</strong> {transaction.referrerId}</p>
//         <p><strong>Referrer Phone Number:</strong> {transaction.referrerPhoneNumber}</p>
//         <p><strong>Referrer QR:</strong> {transaction.referrerQR}</p>
//         <p><strong>Referrer UPI ID:</strong> {transaction.referrerUpiId}</p>
//         <p><strong>Referrer Username:</strong> {transaction.referrerUsername}</p>
//         <p><strong>User Email:</strong> {transaction.user.email}</p>
//         <p><strong>User Username:</strong> {transaction.user.username}</p>
//       </div>
      
//       <h3 className={styles.header} >Update Payment Status</h3>
//       <input
//         type="text"
//         value={paymentStatus}
//         onChange={(e) => setPaymentStatus(e.target.value)}
//         placeholder="Enter payment status"
//         className={styles.input}
//       />
//       <button onClick={handleUpdate} className={styles.button}>Update</button>
//     </div>
//   );
// };

// export default UpdatePaymentStatus;


"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loader from '../../../../components/Loader'; 
import { showToast } from '../../../../components/toastUtil'; 
import styles from '../../../../pagedesign/updatepayment.module.css';

const UpdatePaymentStatus = ({ transaction }) => {
  const [paymentStatus, setPaymentStatus] = useState(transaction.paymentStatus || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setButtonDisabled(true);
    setError(null);

    try {
      await axios.put(`/api/payupdate/${transaction._id}`, { paymentStatus }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      showToast('Payment status updated successfully', 'success');
      router.reload();
    } catch (error) {
      setError('Error updating payment status. Please try again.');
      showToast('Error updating payment status. Please try again.', 'error');
      console.error('Error updating payment status:', error);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}><h3 className={styles.header}>Transaction Details</h3></div>
      <div className={styles.transactionDetails}>
        <p><strong>Admin Update:</strong> {transaction.adminUpdate}</p>
        <p><strong>Amount:</strong> {transaction.amount}</p>
        <p><strong>Payment Status:</strong> {transaction.paymentStatus}</p>
        <p><strong>Referrer Email:</strong> {transaction.referrerEmail}</p>
        <p><strong>Referrer ID:</strong> {transaction.referrerId}</p>
        <p><strong>Referrer Phone Number:</strong> {transaction.referrerPhoneNumber}</p>
        <p><strong>Referrer QR:</strong> {transaction.referrerQR}</p>
        <p><strong>Referrer UPI ID:</strong> {transaction.referrerUpiId}</p>
        <p><strong>Referrer Username:</strong> {transaction.referrerUsername}</p>
        <p><strong>User Email:</strong> {transaction.user.email}</p>
        <p><strong>User Username:</strong> {transaction.user.username}</p>
      </div>
      
      <h3 className={styles.header}>Update Payment Status</h3>
      <input
        type="text"
        value={paymentStatus}
        onChange={(e) => setPaymentStatus(e.target.value)}
        placeholder="Enter payment status"
        className={styles.input}
      />
      <button 
        onClick={handleUpdate} 
        className={styles.button} 
        disabled={buttonDisabled}
      >
        {loading ? <Loader /> : 'Update'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default UpdatePaymentStatus;


