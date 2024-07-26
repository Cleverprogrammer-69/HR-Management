"use client"; // Required for client-side components in Next.js 13+

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
import { extractErrorMessage } from "@/lib/extractErrorMsg";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  full_name: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone number must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function InputForm() {
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      full_name: "",
      phone: "",
      password: "",
    },
  });

 
  const URL = "http://localhost:4000/api/v1";

  
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form Data Submitted:", data); 
    try {
     
      const response = await axios.post(`${URL}/user/register`, data, {
        withCredentials: true,
      });

      // Handle successful response
      if (response.status >= 200 && response.status < 300) {
        console.log("API Response:", response.data[0]); 
        toast({
          title: "Signup successful!",
          description: "You have successfully signed up.",
          variant: "default",
        });
      }
    } catch (error: any | never ) {
      const errorMsg = extractErrorMessage(error.response?.data);
      console.error("API Error:", errorMsg);

      toast({
        title: "Signup failed!",
        description:
          errorMsg || "An error occurred during signup.",
        variant: "destructive", 
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-screen space-y-6 mx-auto bg-card p-9 h-screen md:w-2/5 md:h-2/3 md:mt-10 md:rounded-lg"
      >
        <h2 className="mt-0 font-extrabold text-xl">Create an account</h2>
        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john122@yahoo.com" {...field} />
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
                <Input placeholder="john213" {...field} />
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
                <Input placeholder="john greg" {...field} />
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
                <Input placeholder="3402349933" {...field} />
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
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Singup</Button>
      </form>
    </Form>
  );
}
