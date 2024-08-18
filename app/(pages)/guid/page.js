



// import styles from '../../../pagedesign/Guid.module.css';
// import Image from 'next/image';

// import img01 from "../../../public/img/login.jpg"

// import img02 from "../../../public/img/card.png"
// import img03 from "../../../public/img/ss.png"
// import img04 from "../../../public/img/login.jpg"
// import img05 from "../../../public/img/login.jpg"
// import img06 from "../../../public/img/login.jpg"
// import img07 from "../../../public/img/login.jpg"


// export default function UserGuide() {
//   return (
//     <div className={styles.roadmapContainer}>
//       <div className={styles.stepContainer}>
//         <div className={styles.stepIcon}>
//           <Image src={img01} alt="Register Icon" width="200"
//           height="200"  priority />
//         </div>
//         <div className={styles.stepContent}>
//           <h3 className={styles.stepTitle}>Step 1: Register</h3>
//           <p className={styles.stepDescription}>
//             Start by creating an account on our platform. Provide your basic information such as name, email, and password.
//           </p>
//         </div>
//       </div>

//       <div className={styles.stepContainer}>
//         <div className={styles.stepIcon}>
//           <Image src={img02} alt="Login Icon" width="200"
//           height="200"  priority />
//         </div>
//         <div className={styles.stepContent}>
//           <h3 className={styles.stepTitle}>Step 2: Login</h3>
//           <p className={styles.stepDescription}>
//             After registration, log in using your email and password. Access your dashboard and explore the features.
//           </p>
//         </div>
//       </div>

//       <div className={styles.stepContainer}>
//         <div className={styles.stepIcon}>
//           <Image src={img03} alt="Complete Profile Icon"  width="200"
//           height="200"  priority />
//         </div>
//         <div className={styles.stepContent}>
//           <h3 className={styles.stepTitle}>Step 3: Complete Profile</h3>
//           <p className={styles.stepDescription}>
//             Complete your profile by adding personal details, uploading a profile picture, and setting up your account preferences.
//           </p>
//         </div>
//       </div>

//       <div className={styles.stepContainer}>
//         <div className={styles.stepIcon}>
//           <Image src={img04} alt="KYC Icon" width="200"
//           height="200"  priority />
//         </div>
//         <div className={styles.stepContent}>
//           <h3 className={styles.stepTitle}>Step 4: KYC Verification</h3>
//           <p className={styles.stepDescription}>
//             For security purposes, complete the KYC process by uploading your identification documents.
//           </p>
//         </div>
//       </div>

//       <div className={styles.stepContainer}>
//         <div className={styles.stepIcon}>
//           <Image src={img05} alt="Payment Icon"  width="200"
//           height="200"  priority />
//         </div>
//         <div className={styles.stepContent}>
//           <h3 className={styles.stepTitle}>Step 5: Make Payment</h3>
//           <p className={styles.stepDescription}>
//             Complete your transaction by making the necessary payment through our secure payment gateway.
//           </p>
//         </div>
//       </div>

//       <div className={styles.stepContainer}>
//         <div className={styles.stepIcon}>
//           <Image src={img06} alt="Verify Account Icon" width="200"
//           height="200"  priority />
//         </div>
//         <div className={styles.stepContent}>
//           <h3 className={styles.stepTitle}>Step 6: Verify Account</h3>
//           <p className={styles.stepDescription}>
//             After completing all the steps, verify your account to access all features. You’ll receive a confirmation email.
//           </p>
//         </div>
//       </div>

//       <div className={styles.stepContainer}>
//         <div className={styles.stepIcon}>
//           <Image src={img07} alt="Support Icon"  width="200"
//           height="200"  priority />
//         </div>
//         <div className={styles.stepContent}>
//           <h3 className={styles.stepTitle}>Additional Options: Live Chat & Contact Page</h3>
//           <p className={styles.stepDescription}>
//             Need help? Use our live chat or visit the contact page for assistance with any issues or inquiries.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from 'next/image';
import styles from '../../../pagedesign/Guid.module.css';

import img01 from "../../../public/img/login.jpg";
import img02 from "../../../public/img/card.png";
import img03 from "../../../public/img/ss.png";
import img04 from "../../../public/img/login.jpg";
import img05 from "../../../public/img/login.jpg";
import img06 from "../../../public/img/login.jpg";
import img07 from "../../../public/img/login.jpg";

export default function UserGuide() {
  return (
    <div className={styles.roadmapContainer}>
      <div className={styles.stepContainer}>
        <div className={styles.stepIcon}>
          <Image src={img01} alt="Register Icon" width={200} height={200} priority />
        </div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepTitle}>Step 1: Register</h3>
          <p className={styles.stepDescription}>
            Start by creating an account on our platform. Provide your basic information such as name, email, and password.
          </p>
        </div>
      </div>

      <div className={styles.stepContainer}>
        <div className={styles.stepIcon}>
          <Image src={img02} alt="Login Icon" width={200} height={200} priority />
        </div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepTitle}>Step 2: Login</h3>
          <p className={styles.stepDescription}>
            After registration, log in using your email and password. Access your dashboard and explore the features.
          </p>
        </div>
      </div>

      <div className={styles.stepContainer}>
        <div className={styles.stepIcon}>
          <Image src={img03} alt="Complete Profile Icon" width={200} height={200} priority />
        </div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepTitle}>Step 3: Complete Profile</h3>
          <p className={styles.stepDescription}>
            Complete your profile by adding personal details, uploading a profile picture, and setting up your account preferences.
          </p>
        </div>
      </div>

      <div className={styles.stepContainer}>
        <div className={styles.stepIcon}>
          <Image src={img04} alt="KYC Icon" width={200} height={200} priority />
        </div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepTitle}>Step 4: KYC Verification</h3>
          <p className={styles.stepDescription}>
            For security purposes, complete the KYC process by uploading your identification documents.
          </p>
        </div>
      </div>

      <div className={styles.stepContainer}>
        <div className={styles.stepIcon}>
          <Image src={img05} alt="Payment Icon" width={200} height={200} priority />
        </div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepTitle}>Step 5: Make Payment</h3>
          <p className={styles.stepDescription}>
            Complete your transaction by making the necessary payment through our secure payment gateway.
          </p>
        </div>
      </div>

      <div className={styles.stepContainer}>
        <div className={styles.stepIcon}>
          <Image src={img06} alt="Verify Account Icon" width={200} height={200} priority />
        </div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepTitle}>Step 6: Verify Account</h3>
          <p className={styles.stepDescription}>
            After completing all the steps, verify your account to access all features. You’ll receive a confirmation email.
          </p>
        </div>
      </div>

      <div className={styles.stepContainer}>
        <div className={styles.stepIcon}>
          <Image src={img07} alt="Support Icon" width={200} height={200} priority />
        </div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepTitle}>Additional Options: Live Chat & Contact Page</h3>
          <p className={styles.stepDescription}>
            Need help? Use our live chat or visit the contact page for assistance with any issues or inquiries.
          </p>
        </div>
      </div>
    </div>
  );
}
