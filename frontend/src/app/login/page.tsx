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
  identifier: z.string().min(2, {
    message: "Identifier must be 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function InputForm() {
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

 
  const URL = "http://localhost:4000/api/v1";

  
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form Data Submitted:", data); 
    try {
     
      const response = await axios.post(`${URL}/user/login`, data, {
        withCredentials: true,
      });

      // Handle successful response
      if (response.status >= 200 && response.status < 300) {
        console.log("API Response:", response.data[0]); 
        toast({
          title: "Login successful!",
          description: "You have successfully Logged in.",
          variant: "default",
        });
      }
    } catch (error: any | never ) {
      const errorMsg = extractErrorMessage(error.response?.data);
      console.error("API Error:", errorMsg);

      toast({
        title: "Login failed!",
        description:
          errorMsg || "An error occurred during login.",
        variant: "destructive", 
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-screen space-y-6 mx-auto bg-card p-9 h-screen md:w-2/5 md:h-2/3 md:mt-20 md:rounded-lg"
      >
        <h2 className="mt-0 font-extrabold text-xl">Login to your account</h2>
        {/* Email field */}
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username or Email</FormLabel>
              <FormControl>
                <Input placeholder="username or email" {...field} />
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
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
