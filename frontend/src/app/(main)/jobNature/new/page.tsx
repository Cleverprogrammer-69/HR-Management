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
import { toast } from '@/components/ui/use-toast';

import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { getAllJobNatures } from '@/lib/store/features/jobNature/jobNatureSlice';
import type { ChangeEvent } from 'react';
import { newJobNature } from '@/lib/store/features/jobNature/jobNatureSlice';

const formSchema = z.object({
  job_nature: z.string().min(2, {
    message: 'JobNature name must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'JobNature name must be at least 2 characters.',
  }),
});

export default function Page() {
  const dispatch = useAppDispatch();
  const { jobNatureStatus, jobNatureError, jobNature } = useAppSelector(
    (state) => state.jobNature
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_nature: '',
      description: ''
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('onSubmit triggered');
      const createdJobNature = await dispatch(newJobNature(values)).unwrap();
      toast({
        title: 'JobNature Created',
        description: 'New JobNature is registered successfuly.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'JobNature Creation Failed',
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
            name="job_nature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>JobNature name</FormLabel>
                <FormControl>
                  <Input placeholder="JobNature name" {...field} />
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
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={jobNatureStatus === 'loading'}
        >
          {jobNatureStatus === 'loading' ? (
            <span>Creating...</span>
          ) : (
            <span>Create</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
