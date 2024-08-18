// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import styles from '../../../../pagedesign/Team.module.css';
// import Link from 'next/link';

// const Team = () => {
//   const [teamData, setTeamData] = useState(null);
//   const [transactions, setTransactions] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchTeamData = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       try {
//         const response = await axios.get('/api/myteam', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setTeamData(response.data);
//       } catch (error) {
//         console.error('Error fetching team data:', error);
//       }
//     };

//     const fetchTransactions = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       try {
//         const response = await axios.get('/api/referredTransactions', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setTransactions(response.data);
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//       }
//     };

//     fetchTeamData();
//     fetchTransactions();
//   }, []);

//   if (!teamData) return <p>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>My Team and payment status</h1>
//       <div className={styles.teamDetails}>
//         <h2>My Info</h2>
//         <div>Name: {teamData.myInfo.username}</div>
//         <div>Email: {teamData.myInfo.email}</div>
//         <div>Phone: {teamData.myInfo.phoneNumber}</div>
//         <h2>Referred By</h2>
//         {teamData.referredBy ? (
//           <div>
//             <div>Name: {teamData.referredBy.username}</div>
//             <div>Email: {teamData.referredBy.email}</div>
//             <div>Phone: {teamData.referredBy.phoneNumber}</div>
//           </div>
//         ) : (
//           <p>You were not referred by anyone.</p>
//         )}
//         <h2>Referred Users' Transactions</h2>
//         {transactions.length > 0 ? (
//           transactions.map((transaction, index) => (
//             <div key={index} className={styles.transaction}>
//             <Link href={`/UpdatePaymentStatus/payupdate/${transaction._id}`}>
//               <div>Referred User: {transaction.user.username}</div>
//               <div>Amount: {transaction.amount}</div>
//               <div>Payment Status: {transaction.paymentStatus}</div>
//               <button>Payment Status Update </button>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No transactions found for referred users.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Team;



'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../../pagedesign/Team.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../../../../components/Loader'; 
import { showToast } from '../../../../components/toastUtil'; 

const Team = () => {
  const [teamData, setTeamData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        setLoading(true); // Start loader
        const [teamResponse, transactionsResponse] = await Promise.all([
          axios.get('/api/myteam', { headers: { 'Authorization': `Bearer ${token}` } }),
          axios.get('/api/referredTransactions', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        setTeamData(teamResponse.data);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        setError('Error fetching data');
        showToast('Error fetching data. Please try again later.', 'error');
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <Loader />; // Show loader while data is being fetched

  if (error) return <p className={styles.ptagt}>{error}</p>; // Display error message

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Team and Payment Status</h1>
      <div className={styles.teamDetails}>
        <div className={styles.section}>
          <h2>My Info</h2>
          <div className={styles.infoItem}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <span>{teamData.myInfo.username}</span>
          </div>
          <div className={styles.infoItem}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            <span>{teamData.myInfo.email}</span>
          </div>
          <div className={styles.infoItem}>
            <FontAwesomeIcon icon={faPhone} className={styles.icon} />
            <span>{teamData.myInfo.phoneNumber}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Referred By</h2>
          {teamData.referredBy ? (
            <div>
              <div className={styles.infoItem}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                <span>{teamData.referredBy.username}</span>
              </div>
              <div className={styles.infoItem}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                <span>{teamData.referredBy.email}</span>
              </div>
              <div className={styles.infoItem}>
                <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                <span>{teamData.referredBy.phoneNumber}</span>
              </div>
            </div>
          ) : (
            <p className={styles.ptagt}>You were not referred by anyone.</p>
          )}
        </div>

        <div className={styles.section}>
          <h2>Referred Users Transactions</h2>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <Link key={index} href={`/UpdatePaymentStatus/payupdate/${transaction._id}`} className={styles.transaction}>
                <div className={styles.transactionItem}>
                  <FontAwesomeIcon icon={faMoneyBill} className={styles.icon} />
                  <div>
                    <div>Referred User: {transaction.user.username}</div>
                    <div>Amount: {transaction.amount}</div>
                    <div>Payment Status: {transaction.paymentStatus}</div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className={styles.ptagt}>No transactions found for referred users.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;

