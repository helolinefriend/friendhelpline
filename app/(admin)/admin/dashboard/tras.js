// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from '../../../admincss/tras.module.css';
// import Image from 'next/image';

// export default function Transactions() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/admin/tras', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTransactions(response.data);
//       } catch (err) {
//         setError('Failed to fetch transactions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.transactionContainer}>
//       <h1>Transactions</h1>
//       {transactions.length > 0 ? (
//         transactions.map((transaction) => (
//           <div key={transaction._id} className={styles.transactionCard}>
//             <p><strong>Amount:</strong> {transaction.amount}</p>
//             <p><strong>Status:</strong> {transaction.paymentStatus}</p>
//             <p><strong>Admin Update:</strong> {transaction.adminUpdate}</p>
//             <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
//             <div className={styles.screenshotContainer}>
//               <strong>Screenshot:</strong>
            
//           {/*     <Image
//               width="200"
//               height="200"
//               className={styles.screenshotpig}
//               alt="Screenshot"
//               src={`/api/${transaction.screenshot.replace(/\\/g, '/')}`}
//             />  

//              <Image width="200" height="200" src={`/api/${transaction.screenshot}`} alt="Screenshot" className={styles.screenshotpig} /> */} 

              
//             </div>


//             <Image
//               width="200"
//               height="200"
//               className={styles.screenshotpig}
//               alt="Screenshot"
//               src={`/api/${transaction.screenshot.replace(/\\/g, '/')}`}
//             />  

//           </div>
//         ))
//       ) : (
//         <p>No transactions found.</p>
//       )}
//     </div>
//   );
// }



// working 
// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from '../../../admincss/tras.module.css';
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Link from 'next/link';

// export default function Transactions() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/admin/tras', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTransactions(response.data);
//       } catch (err) {
//         toast.error('Failed to fetch transactions plase reload the page..|');
//         setError('Failed to fetch transactions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.transactionContainer}>
//       <h1>Transactions</h1>
//       {transactions.length > 0 ? (
//         transactions.map((transaction) => (
//           <div key={transaction._id} className={styles.transactionCard}>
// <Link href={`/admin/transaction/${transaction._id}`} key={transaction._id}> 
          
//             <p><strong>Amount:</strong> {transaction.amount}</p>
//             <p><strong>Status:</strong> {transaction.paymentStatus}</p>
//             <p><strong>Status:</strong> {transaction._id}</p>
//             <p><strong>Admin Update:</strong> {transaction.adminUpdate}</p>
//             <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
//             <div className={styles.screenshotContainer}>
//               <strong>Screenshot:</strong>
//               {transaction.screenshot ? (
//                 <Image
//                   width="200"
//                   height="200"
//                   className={styles.screenshotpig}
//                   alt="Screenshot"
//                   src={`/api/${transaction.screenshot.replace(/\\/g, '/')}`}
//                 />

               

//               ) : (
//                 <p>No screenshot available</p>
//               )}
//             </div>
//       </Link>
//           </div>
//         ))
//       ) : (
//         <p>No transactions found.</p>
//       )}
//     </div>
//   );
// }


// add error tost erro ahdling 

"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../admincss/tras.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '../../../../components/Loader'; // Ensure you have this component
import { showToast } from '../../../../components/toastUtil'; // Use your custom toast function

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin/tras', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        showToast('Failed to fetch transactions, please reload the page.', 'error');
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <Loader />; // Display Loader while fetching data
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.transactionContainer}>
      <h1>Transactions</h1>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction._id} className={styles.transactionCard}>
            <Link href={`/admin/transaction/${transaction._id}`}>
              <p><strong>Amount:</strong> {transaction.amount}</p>
              <p><strong>Status:</strong> {transaction.paymentStatus}</p>
              <p><strong>Transaction ID:</strong> {transaction._id}</p>
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
            </Link>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}
