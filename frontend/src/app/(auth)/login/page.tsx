"use client";

import { useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { loginUser } from "@/lib/store/features/user/authSlice";
import { redirect, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import Link from 'next/link';
const FormSchema = z.object({
  identifier: z.string().trim().min(2, {
    message: "Identifier must be 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Login() {
  const dispatch = useAppDispatch()
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const {status, error, user} = useAppSelector(state => state.auth)
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form Data Submitted:", data); 
    try {
      const User = await dispatch(loginUser(data)).unwrap();
      // console.log(User)
      toast({
        variant: "default",
        title: "Login Successful",
        description: "Redirecting to home page."
      })
      redirect("/")
      // router.push('/');
      } catch (e) {
      console.log(e)
      toast({
        title: "Login Failed",
        description: e as string,
        variant: "destructive"
      })
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-screen space-y-4 mx-auto bg-card p-9 h-screen md:w-2/5 md:h-2/3 md:mt-20 md:rounded-lg"
      >
        <h2 className="mt-0 font-extrabold text-xl">Login to your account</h2>
        <div className="mt-2 p-0">
          <span className="font-semibold text-sm text-foreground">
            Don&#39;t have an account?{' '}
          </span>
          <Link href={'/signup'} className="text-primary ml-1 font-bold underline">
            Sign Up
          </Link>
        </div>

        {/* Email field */}
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username or Email</FormLabel>
              <FormControl>
                <Input placeholder="username or email" {...field} className='bg-input' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="password"
                    {...field} 
                    className='bg-input'
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={status === 'loading' || status === 'success'}>
          Login
        </Button>
      </form>
    </Form>
  );
}
