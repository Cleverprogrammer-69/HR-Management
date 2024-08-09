'use client'

import { store } from "@/lib/store/store";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const  user  = store.getState().auth.user;
  useEffect(() => {
    user && console.log(user?.data?.user)
  
    
  }, [user])
  
  return (
    <>
      <h1 className="">Hello world</h1>
    </>
  );
}
