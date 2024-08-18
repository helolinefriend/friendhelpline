
// "use client";

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {jwtDecode} from 'jwt-decode';
// import styles from '../../styles/Navbar.module.css';
 
// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const router = useRouter();
//   const [transactionId, setTransactionId] = useState('');

//   const handleInputChange = (e) => {
//     setTransactionId(e.target.value);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decoded = jwtDecode(token);
//       setUser(decoded);
//       setUserId(decoded.userId);
//     }
//   }, []);

//   const handleSignOut = () => {
//     localStorage.removeItem('token');
//     router.push('/login');
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
// <>
//     <video className="background-video" autoPlay muted loop>
//         <source src="./im g/video.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//     </video>

//     <div className="overlay"></div>


//     <nav className={styles.navbar}>


//       <div className="nav__header">
//       <div className="nav__logo">
//         <Link href="/">MyApp</Link>
//         </div>
//       </div>

//       <div className={styles.menuIcon} onClick={toggleMenu}>
//         <span className={styles.bar}></span>
//         <span className={styles.bar}></span>
//         <span className={styles.bar}></span>
//       </div>

//       {/*<ul id="nav-links"  className={`${styles.navItems} "nav__links" ${menuOpen ? styles.active : ''}`  } > */} 
      
//       <ul id="nav-links"  className={`${styles.navItems} "nav__links" ${menuOpen ? styles.active : ''}`  } >       
//         {user && (
//           <>
           
//           <li><Link href="/givehelp">Give Help</Link></li> 
//           <li><Link href="get-help">Get Help</Link></li>
//           </>
//          )}
         
//         {user && (
//           <>
//                <li><Link href="/kyc">Kyc</Link></li> 
//             <li><Link href="/user/profile">View Profile</Link></li>

//             <li><Link href="/myteam">My Team </Link></li>
//             <li><Link href="/mypayment">My payment </Link></li>
            

           
              
               
//             <li><button className={styles.sign} onClick={handleSignOut}>Sign Out</button></li>

//              {user.role === 'admin' && (
//               <>

//                 <li><Link href="/admin/dashboard">Admin Dashboard</Link></li>
                
//               </>
//             )}
              
//           </>
//         )}

//          <li><Link href="/support">support</Link></li>     
//         <li><Link href="/register">Register</Link></li>
//         <li><Link href="/login">Login</Link></li> 
       
//       </ul>
//     </nav>

//     </>
//   );
// };

// export default Navbar;



"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode }from 'jwt-decode';
// import styles from '../../styles/Navbar.module.css';
import styles from '../../styles/Nav2.module.css';
import { showToast } from '../../components/toastUtil';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setUserId(decoded.userId);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    showToast('Logout successfully!', 'success');
    window.location.reload(); // Refresh the page
    router.push('/login'); // Redirect to login page
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <video className="background-video" autoPlay muted loop>
        <source src="../img/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay"></div>

      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">Friendshelpworld</Link>
        </div>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        <div className={`${styles.sidePanel} ${menuOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={toggleMenu}>&times;</button>
        <ul className={styles.navItems}> 
        
            {user && (
              <>
                <li><Link href="/givehelp">Give Help</Link></li>
                <li><Link href="/get-help">Get Help</Link></li>
                <li><Link href="/kyc">Kyc</Link></li>
                <li><Link href="/user/profile">View Profile</Link></li>
                <li><Link href="/myteam">My Team</Link></li>
                <li><Link href="/mypayment">My Payment</Link></li>
                <li>
                  <button className={styles.signOut} onClick={handleSignOut}>Logout Out</button>
                </li>
                {user.role === 'admin' && (
                  <li><Link href="/admin/dashboard">Admin Dashboard</Link></li>
                )}
              </>
            )}
            {!user && (
              <>
                
                <li><Link href="/register">Register</Link></li>
                <li><Link href="/login">Login</Link></li>
              </>
            )}

            <li><Link href="/support">Support</Link></li>
            <li><Link href="/guid">Guide</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
