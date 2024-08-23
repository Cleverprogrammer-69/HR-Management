'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { z } from 'zod';
import { signupUser } from '@/lib/store/features/user/authSlice';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const FormSchema = z.object({
  username: z.string().trim().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  full_name: z.string().trim().min(2, {
    message: 'Fullname must be at least 2 characters.',
  }),
  phone: z.string().trim().min(2, {
    message: 'Phone number must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export default function Signup() {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      full_name: '',
      phone: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Form Data Submitted:', data);

    try {
      const user = await dispatch(signupUser(data)).unwrap();

      // Handle success
      console.log('Signup successful!', user);
      toast({
        title: 'Signup successful!',
        description: 'You have successfully signed up.',
        variant: 'default',
      });
      router.push('/login')
    } catch (error) {
      // Handle error
      console.error('Signup failed:', error);
      toast({
        title: 'Signup failed!',
        description: error as string,
        variant: 'destructive',
      });
    }
  }
  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-screen space-y-3 mx-auto bg-card p-9 h-[130vh] md:w-2/5 md:h-2/3 md:mt-10 md:rounded-lg"
      >
        <h2 className="mt-0 font-extrabold text-xl">Create your account</h2>
        <div className="mt-2 p-0">
          <span className="font-semibold text-sm text-foreground">
            Have an account?{' '}
          </span>
          <Link
            href={'/login'}
            className="text-primary ml-1 font-bold underline"
          >
            Log in now
          </Link>
        </div>
        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john122@yahoo.com" {...field} className="bg-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Username field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="john213" {...field} className="bg-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Full Name field */}
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="john greg" {...field} className="bg-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Phone field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="3402349933" {...field} className="bg-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password field with visibility toggle */}
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
                    className="bg-input"
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
        <Button type="submit" className="w-full">
          Signup
        </Button>
      </form>
    </Form>
  );
}
