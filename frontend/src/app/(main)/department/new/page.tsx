'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { getAllDepartments } from '@/lib/store/features/department/departmentSlice';
import type { ChangeEvent } from 'react';
import { newDepartment } from '@/lib/store/features/department/departmentSlice';

const formSchema = z.object({
  department: z.string().min(2, {
    message: 'Department name must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.'
  }),
  hod: z.string().min(2, {
    message: 'HOD must be at least 2 characters.'
  }),
  abbrevation: z.string().min(2, {
    message: 'Abbrevation must be at least 2 characters.'
  })

});

export default function Page() {
  const dispatch = useAppDispatch();
  const { departmentStatus, departmentError, department } = useAppSelector(
    (state) => state.department
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: '',
      description: '',
      abbrevation: '',
      hod: ''
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('onSubmit triggered');
      const createdDepartment = await dispatch(
        newDepartment(values)
      ).unwrap();
      toast({
        title: 'Department Created',
        description: 'New department is registered successfuly.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Department Creation Failed',
        description: err as string,
      });
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
      >
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department name</FormLabel>
                <FormControl>
                  <Input placeholder="department name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="abbrevation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Abbrevation</FormLabel>
                <FormControl>
                  <Input placeholder="abbrevation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Head of department</FormLabel>
                <FormControl>
                  <Input placeholder="hod" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={departmentStatus === 'loading'}
        >
          {departmentStatus === 'loading' ? (
            <span>Creating...</span>
          ) : (
            <span>Create</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
