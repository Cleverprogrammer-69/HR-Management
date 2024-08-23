'use client'

import { store, useAppSelector } from '@/lib/store/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [fullName, setFullName] = useState<string>('Guest');

  useEffect(() => {
    const user = store.getState().auth.user;
    const fetchedFullName = user?.data?.user?.full_name || 'Guest';
    setFullName(fetchedFullName);
  }, []);

  return (
    <div className="border-border border-2 rounded-lg p-7 h-full mt-3">
      <h1 className="text-3xl font-bold">
        Welcome back, <span className='underline'>{fullName}</span> .
      </h1>
      <h3>Top things to do here: </h3>
    </div>
  );
}
