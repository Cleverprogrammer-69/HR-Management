'use client'
import React, { useEffect } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { ToastAction } from '@/components/ui/toast';
interface Props {
    success: boolean,
    error?: string | null
}
export const JobTypeDataToast = ({success, error}: Props) => {
    const refreshHandler = () => {
        window.location.reload();
    }
useEffect(() => {
    if(success){
        toast({
            title: "Success",
            variant: 'default',
            description: "All JobTypes fetched successfuly.",
            duration: 3000
        })
    } else {
         toast({
           title: 'Error',
           variant: 'destructive',
           description: error || "Something went wrong while fetching JobTypes.",
           action: <ToastAction altText={'Refresh'} onClick={refreshHandler}>Refresh</ToastAction>
         });
    }
  
}, [success, error])

  return (
    <><Toaster /></>
  )
}
