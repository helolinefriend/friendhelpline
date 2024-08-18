// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from '../../../pagedesign/Payment.module.css';
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



// const MyPayment = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Function to get JWT token from localStorage or cookies
//   const getToken = () => {
//     // Assuming JWT is stored in localStorage
//     return localStorage.getItem('token');
//   };

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       const token = getToken();
//       if (!token) {
//         setError('User not authenticated');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get('/api/transactions/mypayment', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setTransactions(response.data);
//       } catch (error) {

//         toast.error('Error fetching transactions: plase login again..|');

//         console.error('Error fetching transactions:', error);
//         setError('Failed to load transactions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);




'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../pagedesign/Payment.module.css';

// Import the loader component
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Loader from '../../../components/Loader';  
const MyPayment = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to get JWT token from localStorage or cookies
  const getToken = () => {
    // Assuming JWT is stored in localStorage
    return localStorage.getItem('token');
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = getToken();
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/transactions/mypayment', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTransactions(response.data);
      } catch (error) {
        toast.error('Error fetching transactions: Please login again.');
        console.error('Error fetching transactions:', error);
        setError('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <Loader />; // Show loader while loading
  if (error) return <p>{error}</p>; // Show error message if there's an error


  return (
    <div className={styles.containermypay}>
      <h1 className={styles.title}>My Payments</h1>
      {loading ? (
        <p>Loading transactions...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className={styles.transactionList}>
          {transactions.map((transaction) => (
            <li key={transaction._id} className={styles.transactionItem}>

              <p>User: {transaction.user?.username || 'Unknown'} </p>
              
              <p> <strong> Name: </strong> {transaction.referrerUsername}</p>
              <p><strong> Amount $: </strong>{transaction.amount}</p>
              <p><strong> Payment Status: </strong>  {transaction.paymentStatus}</p>


              <p><strong>  Refer email: </strong>{transaction.user?.email}</p>
              <p> <strong> refeal id: </strong>  {transaction.referrerId}</p>
              <p> <strong> Phone: </strong>   {transaction.referrerPhoneNumber}</p>
              <p> <strong> qr images </strong> {transaction.referrerQR}</p>
              <p> <strong> UPI ID</strong>  {transaction.referrerUpiId}</p>
               
              {transaction.screenshot ? (
                <Image
                  width="200"
                  height="200"
                  className={styles.screenshot}
                  alt="Screenshot"
                  src={`/api/${transaction.screenshot.replace(/\\/g, '/')}`}
                />
              ) : (
                <p>No screenshot available</p>
              )}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPayment;
