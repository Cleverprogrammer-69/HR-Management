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
import { getAllJobTypes } from '@/lib/store/features/jobType/jobTypeSlice';
import type { ChangeEvent } from 'react';
import { newJobType } from '@/lib/store/features/jobType/jobTypeSlice';

const formSchema = z.object({
  job_type: z.string().min(2, {
    message: 'JobType name must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
});

export default function Page() {
  const dispatch = useAppDispatch();
  const { jobTypeStatus, jobTypeError, jobType } = useAppSelector(
    (state) => state.jobType
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_type: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('onSubmit triggered');
      const createdJobType = await dispatch(newJobType(values)).unwrap();
      toast({
        title: 'JobType Created',
        description: 'New jobtype is registered successfuly.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'JobType Creation Failed',
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
            name="job_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>JobType name</FormLabel>
                <FormControl>
                  <Input placeholder="jobtype name" {...field} />
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
        </div>
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={jobTypeStatus === 'loading'}
        >
          {jobTypeStatus === 'loading' ? (
            <span>Creating...</span>
          ) : (
            <span>Create</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
