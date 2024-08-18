// /app/admin/dashboard/page.js
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import AdminDashboard from "./admin";

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export default function AdminDas() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const checkAdminRole = async () => {
//       try {
//         // Assuming you have stored the JWT in localStorage or a similar place
//         const token = localStorage.getItem('token');
//         if (!token) {
//           router.push('/');
//           return;
//         }

//         const response = await axios.get('/api/admin/user', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.status === 200) {
//           setLoading(false);
//         }
//       } catch (err) {
//         toast.error('You are not authorized to view this page...|');
//         setError('You are not authorized to view this page.');
//         router.push('/');
//       }
//     };

//     checkAdminRole();
//   }, [router]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <AdminDashboard />
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminDashboard from "./admin";
import Loader from '../../../../components/Loader'; // Ensure you have this component
import { showToast } from '../../../../components/toastUtil'; // Use your custom toast function

export default function AdminDas() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        // Assuming you have stored the JWT in localStorage or a similar place
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }

        const response = await axios.get('/api/admin/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setLoading(false);
        }
      } catch (err) {
        showToast('You are not authorized to view this page.', 'error');
        setError('You are not authorized to view this page.');
        router.push('/');
      }
    };

    checkAdminRole();
  }, [router]);

  if (loading) return <Loader />; // Display Loader while checking admin role
  if (error) return <p>{error}</p>;

  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
