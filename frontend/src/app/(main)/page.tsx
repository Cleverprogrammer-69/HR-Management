'use client'

import { store, useAppSelector } from '@/lib/store/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [fullName, setFullName] = useState<string>('Guest');

  useEffect(() => {
    const user: any = store.getState().auth.user;
    const fetchedFullName = user?.data?.user?.full_name || 'Guest';
    setFullName(fetchedFullName);
  }, []);

  return (
    <div className="md:border-border md:border-2 rounded-lg p-7 h-full mt-3">
      <h1 className="text-3xl font-bold">
        Welcome back, <span className='underline'>{fullName}</span> .
      </h1>
      <h3 className='text-xl font-semibold mt-3'>Checkout the left sidebar for more information.</h3>
    </div>
  );
}
