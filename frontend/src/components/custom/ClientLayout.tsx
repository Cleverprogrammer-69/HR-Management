'use client';

import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/custom/Navbar';
import Sidebar from '@/components/custom/Sidebar';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { toggleSideBar } from "@/lib/store/features/clientFeatures/clientSlice"
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sideBarOpen, hideComponents } = useAppSelector(state => state.client)
  const dispatch = useAppDispatch()
  const handleToggleSideBar = () => {
    dispatch(toggleSideBar())
  }
  return (
    
    <>
      { <Navbar />}

      <div className="flex">
        <div
          className={`fixed top-11 left-0 h-full w-[250px] transition-transform transform ${
            sideBarOpen ? 'translate-x-0' : '-translate-x-full'
          } z-40`}
        >
          <Sidebar />
        </div>
        {sideBarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
            onClick={handleToggleSideBar}
          ></div>
        )}
        <div className={`md:p-5 md:pt-10 w-full m-0 transition-transform ${sideBarOpen ? 'md:ml-[250px]' : 'md:ml-[20px]'} mt-10`}>
          {children}
          <Toaster />
        </div>
      </div>
    </>
  );
}
