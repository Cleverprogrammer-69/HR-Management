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
  getOneDesignation,
  updateDesignation,
} from '@/lib/store/features/designation/designationSlice';
import { useParams } from 'next/navigation';

const formSchema = z.object({
  designation: z.string().min(2, {
    message: 'Designation name must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
  abbrevation: z.string().min(2, {
    message: 'Abbrevation must be at least 2 characters.',
  }),
});

export default function Page() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { designationStatus, designationError, designation } = useAppSelector(
    (state) => state.designation
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designation: '',
      description: '',
      abbrevation: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('onSubmit triggered');
      const updatedDesignation = await dispatch(
        updateDesignation({
          designationId: params.id,
          designationData: values,
        })
      ).unwrap();
      toast({
        title: 'Designation Updated',
        description: 'Designation is updated successfuly.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Designation Update Failed',
        description: err as string,
      });
      console.error(err);
    }
  }
  useEffect(() => {
    async function fetchDesignation() {
      try {
        const fetchedDesignation = await dispatch(
          getOneDesignation(params.id)
        ).unwrap();
        if (
          fetchedDesignation &&
          fetchedDesignation.data &&
          fetchedDesignation.data[0]
        ) {
          const designation = fetchedDesignation.data[0];
          console.log(designation)
          form.reset({
            designation: designation.designation || '',
            description: designation.description || '',
            abbrevation: designation.abbrevation || '',
          });
        }
        // console.log(designation?.data[0])
      } catch (error) {
        console.error('Error fetching designation:', error);
      }
    }

    fetchDesignation();
  }, [params.id, dispatch, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
      >
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation name</FormLabel>
                <FormControl>
                  <Input placeholder="designation name" {...field} />
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
        </div>
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={designationStatus === 'loading'}
        >
          {designationStatus === 'loading' ? (
            <span>Updating...</span>
          ) : (
            <span>Update</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
