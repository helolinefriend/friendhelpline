
// pages/login/Login.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../pagedesign/Login.module.css';
import Image from 'next/image';
import loginImg from "../../../public/img/login.jpg";
import { showToast } from '../../../components/toastUtil';  // Import the toast utility
import Loader from '../../../components/Loader';  // Import the loader component



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state
  const router = useRouter();
  
  const handleLogin = async () => {
    if (!email.includes('@')) {
      showToast('Invalid email format', 'error');
      return;
    }

    setLoading(true);  // Show loader

    try {
      const response = await axios.post('/api/userLogin', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      showToast('Logged in successfully', 'success');
      
      router.push('/'); 
     
    } catch (error) {
      showToast('Login failed: ' + (error.response?.data?.message || error.message), 'error');
    } finally {
      setLoading(false);  // Hide loader
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loader />}  {/* Conditionally render loader */}
      <div className={styles.container2}>
        <div className={styles.containerimg}>
          <span>Logo</span>
          <p>
            Enter your login credentials,
            <br />
            enjoy your day
          </p>
          <Image
            src={loginImg}
            width={400}
            height={400}
            alt="Login Illustration"
            priority
          />
        </div>
  
        <form className={styles.form}>
          <h1 className={styles.title}>Login</h1>
  
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.text}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className={styles.input}
              required
            />
          </div>
  
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.text}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className={styles.input}
              required
            />
          </div>
  
          <button type="button" onClick={handleLogin} className={styles.button}>Login</button>
  
          <div className={styles.registerLink}>
            <p>Dont have an account?</p>
            <Link className={styles.linkButton} href="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
