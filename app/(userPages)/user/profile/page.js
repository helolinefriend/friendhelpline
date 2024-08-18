// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCopy, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// import styles from '../../../../styles/user/viewprofile.module.css';
// import defaultImage from '../../../../public/user.png'; // Use a default image
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UserProfile = () => {
//   const [data, setData] = useState(null);
//   const router = useRouter();

//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         router.push('/login');
//         return;
//       }
//       try {
//         const response = await axios.get('/api/user/profile/profileupdate/getproinfo', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setData(response.data);
//       } catch (error) {
//         toast.error('Failed to fetch user profile, please login again.');
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchUserProfile();
//   }, [router]);

//   if (!data) return <p>Loading...</p>;

//   const { user, profile } = data;
//   const defaultProfile = {
//     phoneNumber: 'N/A',
//     // userreferlink: 'N/A',
//     address1: 'N/A',
//     address2: 'N/A',
//     state: 'N/A',
//     pincode: 'N/A',
//     bankname: 'N/A',
//     accountnumbar: 'N/A',
//     ifcecode: 'N/A',
//     bankbranch: 'N/A',
//     bankfulladdress: 'N/A',
//     realname: 'N/A',
//     qr: 'N/A',
//     upiid: 'N/A',
//     kycStatus: 'non kyc',
//     referralLink: 'N/A',
//     profilepic: 'N/A'
//   };

//   const profileData = profile || defaultProfile;

//   // Fallback to default image if profilepic or qr is not valid
//   const profileImageSrc = profileData.profilepic && profileData.profilepic !== 'N/A' ? profileData.profilepic : defaultImage.src;
//   const qrImageSrc = profileData.qr && profileData.qr !== 'N/A' ? profileData.qr : defaultImage.src;
 
//   const copyToClipboard = () => {
//     const fullLink = `${baseUrl}/register?ref=${user.referralLink}`;
//     navigator.clipboard.writeText(fullLink).then(() => {
//       toast.success('Referral link copied to clipboard!');
//       alert('Referral link copied to clipboard!');
//     }).catch((error) => {
//       toast.error('Error copying to clipboard');
//       console.error('Error copying to clipboard:', error);
//     });
//   };

//   const referralLink = `${baseUrl}/register?ref=${user.referralLink}`;

//   return (
//     <div className={styles.profileContainer}>
//       <h1 className={styles.profileHeader}>User Profile</h1>
//       <div className={styles.profileDetails}>
//         <span>{profileData.pincode}</span>
//         <Image 
//           src={profileImageSrc}
//           alt="Profile Picture" 
//           width={150} 
//           height={150} 
//           className={styles.profileImage} 
//           priority
//         />

//         <div className={styles.formGroup}>
//           <label>User ID:</label>
//           <span>{user._id}</span>
//         </div>
//         <div className={styles.formGroup}>
//           <label>Username:</label>
//           <span>{user.username}</span>
//         </div>
//         <div className={styles.formGroup}>
//           <label>Email:</label>
//           <span>{user.email}</span>
//         </div>
//         <div className={styles.formGroup}>
//           <label>Referral Link:</label>
//           <Link className={styles.opneref} href={`${baseUrl}/register?ref=${user.referralLink}`} target="_blank" rel="noopener noreferrer">
//             Open Referral Link <FontAwesomeIcon icon={faExternalLinkAlt} />
//           </Link>

//           <button onClick={copyToClipboard} className={styles.copyButton}>
//             Copy Referral Link <FontAwesomeIcon icon={faCopy} />
//           </button>

//           <div className={styles.formGroup}>
//             <label>Refer Link:</label>
//             <span>{referralLink} <button onClick={copyToClipboard} className={styles.copyButton}>
//               <FontAwesomeIcon icon={faCopy} />
//             </button></span>
//           </div>
//         </div>

//         <div className={styles.formGroup}>
//           <label>Share on Social Media:</label>
//           <div className={styles.linkdiv}>
//             <Link href={`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/register?ref=${user.referralLink}`} className={styles.link} target="_blank" rel="noopener noreferrer">
//               Facebook <FontAwesomeIcon icon={faFacebook} />
//             </Link> | 
//             <Link href={`https://www.instagram.com/?url=${baseUrl}/register?ref=${user.referralLink}`} target="_blank" className={styles.link} rel="noopener noreferrer">
//               Instagram <FontAwesomeIcon icon={faInstagram} />
//             </Link> | 
//             <Link href={`https://api.whatsapp.com/send?text=${baseUrl}/register?ref=${user.referralLink}`} className={styles.link} target="_blank" rel="noopener noreferrer">
//               WhatsApp <FontAwesomeIcon icon={faWhatsapp} />
//             </Link>
//           </div>
//         </div>

//         <div className={styles.formGroup}>
//           <label>Phone Number:</label>
//           <span>{profileData.phoneNumber}</span>
//         </div>

//         <div className={styles.formGroup}>
//           <label>My Refer ID:</label>
//           <span>{user.referralLink}</span>
//         </div>
//         <div className={styles.formGroup}>
//           <h2>My Address</h2>
//           <label>Address 1:</label>
//           <span>{profileData.address1}</span>
//           <label>Address 2:</label>
//           <span>{profileData.address2}</span>
//           <label>State:</label>
//           <span>{profileData.state}</span>
//           <label>Local Pin Code:</label>
//           <span>{profileData.pincode}</span>
//         </div>
//         <div className={styles.formGroup}>
//           <h2>Bank Details</h2>
//           <label>Bank Name:</label>
//           <span>{profileData.bankname}</span>
//           <label>Account Number:</label>
//           <span>{profileData.accountnumbar}</span>
//           <label>IFCE Code:</label>
//           <span>{profileData.ifcecode}</span>
//           <label>Bank Branch:</label>
//           <span>{profileData.bankbranch}</span>
//           <label>Bank Full Address:</label>
//           <span>{profileData.bankfulladdress}</span>
//         </div>
//         <div className={styles.formGroup}>
//           <h2>QR Code</h2>
//           <label>Real Name:</label>
//           <span>{profileData.realname}</span>
//           <label>QR:</label>
//           <Image 
//             src={qrImageSrc}
//             alt="QR Code" 
//             width={150} 
//             height={150} 
//             className={styles.profileImage} 
//             priority
//           />
//           <label>Your UPI ID:</label>
//           <span>{profileData.upiid}</span>
//         </div>
//         <div className={styles.formGroup}>
//           <label>User KYC Status:</label>
//           <span>{profileData.kycStatus === 'done' ? 'Done' : 'Non KYC'}</span>
//         </div>
//         <div className={styles.updateLink}>
//           <Link href={`/user/profile/${user._id}`}>Update your information (edit)</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from '../../../../styles/user/viewprofile.module.css';
import defaultImage from '../../../../public/user.png'; // Use a default image
import Loader from '../../../../components/Loader'; // Import Loader component
import { showToast } from '../../../../components/toastUtil'; // Import showToast

const UserProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [buttonDisabled, setButtonDisabled] = useState(false); // Button state
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/api/user/profile/profileupdate/getproinfo', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setData(response.data);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        showToast('Failed to fetch user profile, please login again.', 'error');
        console.error('Error fetching user profile:', error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchUserProfile();
  }, [router]);

  if (loading) return <Loader />; // Show loader while fetching data

  if (!data) return <p>No profile data available.</p>;

  const { user, profile } = data;
  const defaultProfile = {
    phoneNumber: 'N/A',
    address1: 'N/A',
    address2: 'N/A',
    state: 'N/A',
    pincode: 'N/A',
    bankname: 'N/A',
    accountnumbar: 'N/A',
    ifcecode: 'N/A',
    bankbranch: 'N/A',
    bankfulladdress: 'N/A',
    realname: 'N/A',
    qr: 'N/A',
    upiid: 'N/A',
    kycStatus: 'non kyc',
    referralLink: 'N/A',
    profilepic: 'N/A'
  };

  const profileData = profile || defaultProfile;

  const profileImageSrc = profileData.profilepic && profileData.profilepic !== 'N/A' ? profileData.profilepic : defaultImage.src;
  const qrImageSrc = profileData.qr && profileData.qr !== 'N/A' ? profileData.qr : defaultImage.src;

  const copyToClipboard = () => {
    const fullLink = `${baseUrl}/register?ref=${user.referralLink}`;
    setButtonDisabled(true); // Disable button during copy action
    navigator.clipboard.writeText(fullLink).then(() => {
      showToast('Referral link copied to clipboard!', 'success');
    }).catch((error) => {
      showToast('Error copying to clipboard', 'error');
      console.error('Error copying to clipboard:', error);
    }).finally(() => {
      setButtonDisabled(false); // Re-enable button after action
    });
  };

  const referralLink = `${baseUrl}/register?ref=${user.referralLink}`;

  return (
        <div className={styles.profileContainer}>
          <h1 className={styles.profileHeader}>User Profile</h1>
          <div className={styles.profileDetails}>
            <span>{profileData.pincode}</span>
            <Image 
              src={profileImageSrc}
              alt="Profile Picture" 
              width={150} 
              height={150} 
              className={styles.profileImage} 
              priority
            />
    
            <div className={styles.formGroup}>
              <label>User ID:</label>
              <span>{user._id}</span>
            </div>
            <div className={styles.formGroup}>
              <label>Username:</label>
              <span>{user.username}</span>
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className={styles.formGroup}>
              <label>Referral Link:</label>
              <Link className={styles.opneref} href={`${baseUrl}/register?ref=${user.referralLink}`} target="_blank" rel="noopener noreferrer">
                Open Referral Link <FontAwesomeIcon icon={faExternalLinkAlt} />
              </Link>
    
              
              <button 
        onClick={copyToClipboard} 
        className={styles.copyButton} 
        disabled={buttonDisabled} // Disable button if necessary
      >
                Copy Referral Link <FontAwesomeIcon icon={faCopy} />
              </button>
    
              <div className={styles.formGroup}>
                <label>Refer Link:</label>
                <span>{referralLink} <button onClick={copyToClipboard} className={styles.copyButton}>
                  <FontAwesomeIcon icon={faCopy} />
                </button></span>
              </div>
            </div>
    
            <div className={styles.formGroup}>
              <label>Share on Social Media:</label>
              <div className={styles.linkdiv}>
                <Link href={`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/register?ref=${user.referralLink}`} className={styles.link} target="_blank" rel="noopener noreferrer">
                  Facebook <FontAwesomeIcon icon={faFacebook} />
                </Link> | 
                <Link href={`https://www.instagram.com/?url=${baseUrl}/register?ref=${user.referralLink}`} target="_blank" className={styles.link} rel="noopener noreferrer">
                  Instagram <FontAwesomeIcon icon={faInstagram} />
                </Link> | 
                <Link href={`https://api.whatsapp.com/send?text=${baseUrl}/register?ref=${user.referralLink}`} className={styles.link} target="_blank" rel="noopener noreferrer">
                  WhatsApp <FontAwesomeIcon icon={faWhatsapp} />
                </Link>
              </div>
            </div>
    
            <div className={styles.formGroup}>
              <label>Phone Number:</label>
              <span>{profileData.phoneNumber}</span>
            </div>
    
            <div className={styles.formGroup}>
              <label>My Refer ID:</label>
              <span>{user.referralLink}</span>
            </div>
            <div className={styles.formGroup}>
              <h2>My Address</h2>
              <label>Address 1:</label>
              <span>{profileData.address1}</span>
              <label>Address 2:</label>
              <span>{profileData.address2}</span>
              <label>State:</label>
              <span>{profileData.state}</span>
              <label>Local Pin Code:</label>
              <span>{profileData.pincode}</span>
            </div>
            <div className={styles.formGroup}>
              <h2>Bank Details</h2>
              <label>Bank Name:</label>
              <span>{profileData.bankname}</span>
              <label>Account Number:</label>
              <span>{profileData.accountnumbar}</span>
              <label>IFCE Code:</label>
              <span>{profileData.ifcecode}</span>
              <label>Bank Branch:</label>
              <span>{profileData.bankbranch}</span>
              <label>Bank Full Address:</label>
              <span>{profileData.bankfulladdress}</span>
            </div>
            <div className={styles.formGroup}>
              <h2>QR Code</h2>
              <label>Real Name:</label>
              <span>{profileData.realname}</span>
              <label>QR:</label>
              <Image 
                src={qrImageSrc}
                alt="QR Code" 
                width={150} 
                height={150} 
                className={styles.profileImage} 
                priority
              />
              <label>Your UPI ID:</label>
              <span>{profileData.upiid}</span>
            </div>
            <div className={styles.formGroup}>
              <label>User KYC Status:</label>
              <span>{profileData.kycStatus === 'done' ? 'Done' : 'Non KYC'}</span>
            </div>
            <div className={styles.updateLink}>
              <Link href={`/user/profile/${user._id}`}>Update your information (edit)</Link>
            </div>
          </div>
        </div>
      );
    };
export default UserProfile;
