// "use client";

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useRouter } from 'next/navigation';
// import UpdatePaymentStatus from '../UpdatePaymentStatus';

// const PaymentUpdatePage = () => {
//   const { id } = useParams();
//   const router = useRouter();
//   const [transaction, setTransaction] = useState(null);

//   const getToken = () => {
//     return localStorage.getItem('token');
//   };

//   useEffect(() => {
//     if (id) {
//       const fetchTransaction = async () => {
//         try {
//           const token = getToken();
//           if (!token) {
//             console.error('User not authenticated');
//             return;
//           }
//           const response = await axios.get(`/api/transactions/${id}`, {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
//           setTransaction(response.data.transaction);
//         } catch (error) {
//           console.error('Error fetching transaction:', error);
//         }
//       };
//       fetchTransaction();
//     }
//   }, [id]);

//   if (!transaction) {
//     return <div>Loading... transaction</div>;
//   }

//   return <UpdatePaymentStatus transaction={transaction} />;
// };

// export default PaymentUpdatePage;



"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import UpdatePaymentStatus from '../UpdatePaymentStatus';
import Loader from '../../../../../components/Loader'; 
import { showToast } from '../../../../../components/toastUtil'; 

const PaymentUpdatePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    if (id) {
      const fetchTransaction = async () => {
        try {
          const token = getToken();
          if (!token) {
            showToast('User not authenticated. Redirecting to login...', 'error');
            router.push('/login');
            return;
          }
          const response = await axios.get(`/api/transactions/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setTransaction(response.data.transaction);
        } catch (error) {
          showToast('Error fetching transaction. Please try again later.', 'error');
          console.error('Error fetching transaction:', error);
          setError('Error fetching transaction. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      fetchTransaction();
    }
  }, [id, router]);

  if (loading) {
    return <div><Loader /> Loading transaction...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!transaction) {
    return <div>No transaction found.</div>;
  }

  return <UpdatePaymentStatus transaction={transaction} />;
};

export default PaymentUpdatePage;
