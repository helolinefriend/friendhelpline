'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../../pagedesign/Team.module.css';

const Team = () => {
  const [teamData, setTeamData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTeamData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/api/myteam', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTeamData(response.data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, [router]);

  if (!teamData) return <p>Loading...</p>;

  return (
    <div className={styles.tearmcontainer}>
      <h1 className={styles.title}>My Team</h1>
      <div className={styles.teamDetails}>
      <h2 className={styles.title}>Referred By</h2> 
      {teamData.referredBy ? (
        <div>
        <p><strong>Aadhar Number:</strong> {kyc.aadhar}</p>

          <p> <strong>Name: </strong> {teamData.referredBy.username}</p>

          <p><strong>Email:</strong> {teamData.referredBy.email}</p>
          <p> <strong>Phone:</strong>  {teamData.referredBy.phoneNumber}</p>
        </div>
      ) : (
        <p>You were not referred by anyone.</p>
      )}
      
        <h2 className={styles.title}>My Info</h2>
        <p> <strong>Name: </strong> {teamData.myInfo.username}</p>
        <p> <strong>Email:  </strong>  {teamData.myInfo.email}</p>
        <p> <strong>Phone: </strong>  {teamData.myInfo.phoneNumber}</p>
     
      

        <h2 className={styles.title}>People I Referred</h2>
        {teamData.referredUsers.length > 0 ? (
          teamData.referredUsers.map((user, index) => (
            <div key={index}>
              <p> <strong>Name: </strong>  {user.username}</p>
              <p> <strong>Email: </strong> {user.email}</p>
              <p> <strong>Phone:</strong>  {user.phoneNumber}</p>
            </div>
          ))
        ) : (
          <p>No one has used your referral link yet.</p>
        )}
      </div>
    </div>
  );
};

export default Team;
