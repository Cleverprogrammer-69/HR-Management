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
  getOneJobType,
  updateJobType,
} from '@/lib/store/features/jobType/jobTypeSlice';
import { useParams } from 'next/navigation';

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
  const params = useParams();
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
      const updatedJobType = await dispatch(
        updateJobType({
          jobTypeId: params.id,
          jobTypeData: values,
        })
      ).unwrap();
      toast({
        title: 'JobType Updated',
        description: 'JobType is updated successfuly.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'JobType Update Failed',
        description: err as string,
      });
      console.error(err);
    }
  }
  useEffect(() => {
    async function fetchJobType() {
      try {
        const fetchedJobType = await dispatch(
          getOneJobType(params.id)
        ).unwrap();
        if (fetchedJobType && fetchedJobType.data && fetchedJobType.data[0]) {
          const JobType = fetchedJobType.data[0];
          form.reset({
            job_type: JobType.job_type || '',
            description: JobType.description || '',
          });
        }
        // console.log(jobtype?.data[0])
      } catch (error) {
        console.error('Error fetching jobtype:', error);
      }
    }

    fetchJobType();
  }, [params.id, dispatch, form]);

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
            <span>Updating...</span>
          ) : (
            <span>Update</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
