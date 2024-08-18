// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {jwtDecode} from 'jwt-decode';
// import styles from '../../../styles/Dashboard/Dashboard.module.css';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//     } else {
//       const decoded = jwtDecode(token);
//       setUser(decoded);
//     }
//   }, []);

//   const handleSignOut = () => {
//     localStorage.removeItem('token');
//     router.push('/register');
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.header}>User Dashboard</h1>
//       <button onClick={handleSignOut} className={styles.signOutButton}>Logout Out</button>
//       <h2 className={styles.welcome}>Welcome, {user.email}</h2>

//       <div className={styles.blocks}>
//         <div className={styles.block}>
//           <p className={styles.blockTitle}>Block 1</p>
//           <h1 className={styles.blockTitle}>Investment Amount</h1>
//           <div className={styles.blockAmount}>1000 R's</div>
//         </div>
//         <div className={styles.block}>
//           <p className={styles.blockTitle}>Block 2</p>
//           <h1 className={styles.blockTitle}>Profit Amount</h1>
//           <div className={styles.blockAmount}>599 R's</div>
//         </div>
//       </div>

//       <h2 className={styles.welcome}>quick links</h2>
//       <h2 className={styles.welcome}>Profile</h2>
//       <h2 className={styles.welcome}>Kyc</h2>
//       <h2 className={styles.welcome}>Give Help</h2>
//       <h2 className={styles.welcome}>Get Help</h2>
//       <h2 className={styles.welcome}> My Team tree</h2>
//       <h2 className={styles.welcome}>Support</h2>
      


//     </div>
//   );
// };

// export default Dashboard;


import React from 'react'

const page = () => {
  return (
    <div>desborat del</div>
  )
}

export default page