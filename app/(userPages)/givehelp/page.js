'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import User from "./user";
import AdminTransaction from "./admin";
import Kyc from "./check/kyc"; 

const Page = () => {
  return (
    <div>
      <User />
      <AdminTransaction />
       <Kyc /> 
    </div>
  );
}

export default Page;




