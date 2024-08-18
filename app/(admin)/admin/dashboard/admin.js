// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from '../../../admincss/AdminDashboard.module.css';
// import Link from 'next/link';
// import { FaUser, FaChartPie, FaCog, FaSignOutAlt, FaSun, FaMoon, FaComments } from 'react-icons/fa';
// import HomeSettings from "./home";
// import defaultProfilePic from '../../../../public/img/ss.png';
// import Transactions from "./tras.js"
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export default function AdminDashboard() {
//   const [userCount, setUserCount] = useState(0);
//   const [userss, setUsers] = useState([]);
//   const [currentView, setCurrentView] = useState('');
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isDayTime, setIsDayTime] = useState(true);
//   const [userData, setUserData] = useState({ users: [], profiles: [] });





//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get token from local storage
//         const { data } = await axios.get(`/api/admin/user/userget`, {
//           headers: { Authorization: `Bearer ${token}` }, // Pass the token in the headers
//         });
//         setUserData(data); // Set the data from the API response
//       } catch (error) {
//         toast.error('Error fetching data plase login again..|');
//         console.error('Error fetching data:', error.response ? error.response.data : error.message);
//       }
//     };

//     fetchData();
//   }, []);



// useEffect(() => {
//     const fetchUserCount = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get token from local storage
//         const { data } = await axios.get(`/api/admin/user/userget`, {
//           headers: { Authorization: `Bearer ${token}` }, // Pass the token in the headers
//         });

//         if (Array.isArray(data)) {
//           setUserCount(data.length); // Set the number of users
//           setUsers(data); // Store user details
//         } else if (data && data.users) {
//           // In case the API returns an object with users array
//           setUserCount(data.users.length); // Set the number of users
//           setUsers(data.users); // Store user details
//         }

//         console.log(data.length);
//       } catch (error) {
//         console.error('Error fetching user data:', error.response ? error.response.data : error.message);
//       }
//     };

//     fetchUserCount();
//   }, []);


//   const { users,  profiles } = userData;

//   const getUserProfilePic = (userId) => {
//     const profile = profiles.find(profile => profile.user === userId);
//     return profile && profile.profilepic ? profile.profilepic : defaultProfilePic;
//   };


//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const renderView = () => {
//     switch (currentView) {
//       case 'all-users':
//         return (
//           <div>
//             <h1>All Users</h1>
//             <ul className={styles.userList}>
//               {users.map(user => (
//                 <Link href={`/admin/${user._id}`} key={user._id}>
               


//                   <li className={styles.userListItem}>

                 

//                   <Image
//                   src={getUserProfilePic(user._id)}
//                   alt={`${user.username}'s profile`}
//                     className={styles.userImage}
//                     width="200" height="200"
//                 />


//                     <div>
//                       <p><strong>Name:</strong> {user.username}</p>
//                       <p><strong>Email:</strong> {user.email}</p>
//                     </div>
//                   </li>
//                 </Link>
//               ))}
//             </ul>
//           </div>
//         );
//       case 'payment':
//         return <Transactions />;
//       case 'settings':
//         return <Settings />;
//       case 'homesettings':
//         return <HomeSettings />;
//       default:
//         return <h1>Admin Dashboard</h1>;
//     }
//   };

//   return (
//     <div className={styles.dashboard}>
//       <nav className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
//         <div className={styles.sidebarHeader}>
//           <h2>Admin Panel</h2>
//           <button onClick={toggleSidebar} className={styles.sidebarToggle}>
//             {sidebarOpen ? 'Close' : 'Open'} Sidebar
//           </button>
//         </div>
//         <div className={styles.sidebarMenu}>
//           <button onClick={() => setCurrentView('all-users')}><FaUser /> Users</button>
//           <button onClick={() => setCurrentView('payment')}><FaChartPie /> Payment</button>
//           <button onClick={() => setCurrentView('settings')}><FaCog /> Settings</button>
//           <button onClick={() => setCurrentView('homesettings')}><FaCog /> Home Page Design</button>
//           <button onClick={() => setCurrentView('livechat')}><FaComments /> Live Chat</button>
//           <button onClick={() => window.location.href = '/logout'}><FaSignOutAlt /> Logout</button>
//         </div>
//       </nav>
//       <div className={styles.mainContent}>
//         <header className={styles.header}>
//            <h1>{isDayTime ? 'Good Morning' : 'Good Evening'}, Admin</h1>
//           <div className={styles.time}>
//             {isDayTime ? <FaSun className={styles.icon} /> : <FaMoon className={styles.icon} />}
//             <span>{new Date().toLocaleTimeString()}</span>
//           </div>
//         </header>
//         <section className={styles.statsSection}>
//           <div className={`${styles.statCard} ${styles.green}`}>
         
//           {currentView === '' && <h2>Total Users: {userCount}</h2>}
//           <h3>Total Users</h3>
//           <p>{userCount}</p>


//           </div>

          
//           <div className={`${styles.statCard} ${styles.blue}`}>
//             <h3>Active Users</h3>
//             <p>{/* Add logic to show active users */}</p>
//           </div>
//           <div className={`${styles.statCard} ${styles.red}`}>
//             <h3>Inactive Users</h3>
//             <p>{/* Add logic to show inactive users */}</p>
//           </div>
//         </section>
//         <section className={styles.contentSection}>
//           {renderView()}
//         </section>
//         <footer className={styles.footer}>
//           <p>&copy; 2024 Admin Dashboard</p>
//         </footer>
//       </div>
//     </div>
//   );
// }

// function Settings() {
//   return (
//     <div>
//       <h1>Settings Section</h1>
//       <p>Here you can manage settings for your application.</p>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../admincss/AdminDashboard.module.css';
import Link from 'next/link';
import { FaUser, FaChartPie, FaCog, FaSignOutAlt, FaSun, FaMoon, FaComments } from 'react-icons/fa';
import HomeSettings from "./home";
import defaultProfilePic from '../../../../public/img/ss.png';
import Transactions from "./tras.js";
import Image from 'next/image';
import Loader from '../../../../components/Loader.js'; // Ensure you have this component
import { showToast } from '../../../../components/toastUtil'; // Use your custom toast function

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDayTime, setIsDayTime] = useState(true);
  const [userData, setUserData] = useState({ users: [], profiles: [] });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading true at the beginning
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const { data } = await axios.get(`/api/admin/user/userget`, {
          headers: { Authorization: `Bearer ${token}` }, // Pass the token in the headers
        });
        setUserData(data); // Set the data from the API response
        if (Array.isArray(data.users)) {
          setUserCount(data.users.length); // Set the number of users
          setUsers(data.users); // Store user details
        } else if (data && data.users) {
          // In case the API returns an object with users array
          setUserCount(data.users.length); // Set the number of users
          setUsers(data.users); // Store user details
        }
      } catch (error) {
        showToast('Error fetching data, please log in again.', 'error');
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false); // Set loading false after fetching data
      }
    };

    fetchData();
  }, []);

  const getUserProfilePic = (userId) => {
    const profile = userData.profiles.find(profile => profile.user === userId);
    return profile && profile.profilepic ? profile.profilepic : defaultProfilePic;
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderView = () => {
    switch (currentView) {
      case 'all-users':
        return (
          <div>
            <h1>All Users</h1>
            {loading ? <Loader /> : (
              <ul className={styles.userList}>
                {users.map(user => (
                  <Link href={`/admin/${user._id}`} key={user._id}>
                    <li className={styles.userListItem}>
                      <Image
                        src={getUserProfilePic(user._id)}
                        alt={`${user.username}'s profile`}
                        className={styles.userImage}
                        width="200" height="200"
                      />
                      <div>
                        <p><strong>Name:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        );
      case 'payment':
        return <Transactions />;
      case 'settings':
        return <Settings />;
      case 'homesettings':
        return <HomeSettings />;
      case 'livechat':
        return <div>Live Chat functionality coming soon!</div>;
      default:
        return <h1>Admin Dashboard</h1>;
    }
  };

  return (
    <div className={styles.dashboard}>
      <nav className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
          <button onClick={toggleSidebar} className={styles.sidebarToggle}>
            {sidebarOpen ? 'Close' : 'Open'} Sidebar
          </button>
        </div>
        <div className={styles.sidebarMenu}>
          <button onClick={() => setCurrentView('all-users')}><FaUser /> Users</button>
          <button onClick={() => setCurrentView('payment')}><FaChartPie /> Payment</button>
          <button onClick={() => setCurrentView('settings')}><FaCog /> Settings</button>
          <button onClick={() => setCurrentView('homesettings')}><FaCog /> Home Page Design</button>
          <button onClick={() => setCurrentView('livechat')}><FaComments /> Live Chat</button>
          <button onClick={() => window.location.href = '/logout'}><FaSignOutAlt /> Logout</button>
        </div>
      </nav>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1>{isDayTime ? 'Good Morning' : 'Good Evening'}, Admin</h1>
          <div className={styles.time}>
            {isDayTime ? <FaSun className={styles.icon} /> : <FaMoon className={styles.icon} />}
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </header>
        <section className={styles.statsSection}>
          <div className={`${styles.statCard} ${styles.green}`}>
            {currentView === '' && <h2>Total Users: {userCount}</h2>}
            <h3>Total Users</h3>
            <p>{userCount}</p>
          </div>
          <div className={`${styles.statCard} ${styles.blue}`}>
            <h3>Active Users</h3>
            <p>{/* Add logic to show active users */}</p>
          </div>
          <div className={`${styles.statCard} ${styles.red}`}>
            <h3>Inactive Users</h3>
            <p>{/* Add logic to show inactive users */}</p>
          </div>
        </section>
        <section className={styles.contentSection}>
          {renderView()}
        </section>
        <footer className={styles.footer}>
          <p>&copy; 2024 Admin Dashboard</p>
        </footer>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h1>Settings Section</h1>
      <p>Here you can manage settings for your application.</p>
    </div>
  );
}
