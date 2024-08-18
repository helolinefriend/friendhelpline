// test code  
// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import styles from '../../../pagedesign/Register.module.css';
// import Image from 'next/image'
// import loginImg from "../../../public/img/login.jpg"

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [referralLink, setReferralLink] = useState('1234');  // default referral code
//   const router = useRouter();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const ref = urlParams.get('ref') || '1234';  // set default referral code if none is provided
//     setReferralLink(ref);
//   }, []);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/userRegister', { email, username, password,  referralLink });
//       console.log(res.data.message);
//       router.push('/login');
//     } catch (error) {
//       console.error('Error during registration:', error.response.data.message);
//     }
//   };

//   return (
//     <div className={styles.container}>
    
//     <div className={styles.container2}>

//     <div className={styles.containerimg}>
//  <span>Logo</span>
//  <p>
//    Enter your Register credentials,
//    <br />
//    enjoy your day
//  </p>
//  <Image
//    src={loginImg}
//    width={400}
//    height={400}
//    alt="Login Illustration"
//  />
//       </div>

//       <form onSubmit={handleRegister} className={styles.form}>
//         <h1 className={styles.title}>Register</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={styles.input}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className={styles.input}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className={styles.input}
//           required
//         />
        
//         <button type="submit" className={styles.button}>Register</button>
//       </form>
//       </div>
//     </div>

//   );
// };

// export default Register; 





'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../../pagedesign/Register.module.css';
import Image from 'next/image';
import loginImg from "../../../public/img/login.jpg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Loader from '../../../components/Loader'; // Make sure you have a Loader component

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [referralLink, setReferralLink] = useState('1234'); // default referral code
  const [loading, setLoading] = useState(false); // For button state management and loading state
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref') || '1234'; // set default referral code if none is provided
    setReferralLink(ref);
  }, []);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!email || !username || !password) {
      toast.error("All fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true); // Show loader and disable button
    try {
      const res = await axios.post('/api/userRegister', { email, username, password, referralLink });
      toast.success(res.data.message);
      router.push('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false); // Hide loader and re-enable button
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.containerimg}>
          <span>Logo</span>
          <p>
            Enter your Register credentials,
            <br />
            enjoy your day
          </p>
          <Image
            src={loginImg}
            width={400}
            height={400}
            alt="Login Illustration"
          />
        </div>

        <form onSubmit={handleRegister} className={styles.form}>
          <h1 className={styles.title}>Register</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
            disabled={loading}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? <Loader size={20} /> : 'Register'} {/* Show loader on the button while submitting */}
          </button>

          <div>
            <h1>
              Already have an account? <br /> <Link href="/login">Login Here</Link>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;


