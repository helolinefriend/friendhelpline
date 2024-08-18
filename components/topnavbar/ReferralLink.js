

// delete 

import { useEffect, useState } from 'react';
import axios from 'axios';

const ReferralLink = ({ userId }) => {
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setReferralLink(response.data.referralLink);
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      <h1>Referral Link</h1>
      <p>Share this link with your friends to refer them:</p>
      <input type="text" value={`${window.location.origin}/register?ref=${referralLink}`} readOnly />
    </div>
  );
};

export default ReferralLink;
