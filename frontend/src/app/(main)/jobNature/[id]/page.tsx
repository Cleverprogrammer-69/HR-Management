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
import {
  getOneJobNature,
  updateJobNature,
} from '@/lib/store/features/jobNature/jobNatureSlice';
import { useParams } from 'next/navigation';

const formSchema = z.object({
  job_nature: z.string().min(2, {
    message: 'JobNature name must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description name must be at least 2 characters.',
  }),
});

export default function Page() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { jobNatureStatus, jobNatureError, jobNature } = useAppSelector(
    (state) => state.jobNature
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_nature: '',
      description: ''
  }});

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('onSubmit triggered');
      const updatedJobNature = await dispatch(
        updateJobNature({
          jobNatureId: params.id,
          jobNatureData: values,
        })
      ).unwrap();
      toast({
        title: 'JobNature Updated',
        description: 'JobNature is updated successfuly.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'JobNature Update Failed',
        description: err as string,
      });
      console.error(err);
    }
  }
  useEffect(() => {
    async function fetchJobNature() {
      try {
        const fetchedJobNature = await dispatch(
          getOneJobNature(params.id)
        ).unwrap();
        if (
          fetchedJobNature &&
          fetchedJobNature.data &&
          fetchedJobNature.data[0]
        ) {
          const JobNature = fetchedJobNature.data[0];
          console.log(JobNature);
          form.reset({
            job_nature: JobNature.job_nature || '',
            description: JobNature.description
          });
        }
        // console.log(JobNature?.data[0])
      } catch (error) {
        console.error('Error fetching JobNature:', error);
      }
    }

    fetchJobNature();
  }, [params.id, dispatch, form]);

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
          disabled={jobNatureStatus === 'loading'}
        >
          {jobNatureStatus === 'loading' ? (
            <span>Updating...</span>
          ) : (
            <span>Update</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
