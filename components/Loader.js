// components/Loader.js
'use client';

import styles from '../styles/loader/Loader.module.css'; // Import the CSS module for styling

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
