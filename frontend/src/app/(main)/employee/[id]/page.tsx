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
import { Checkbox } from '@/components/ui/checkbox';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { getAllDepartments } from '@/lib/store/features/department/departmentSlice';
import { getAllDesignations } from '@/lib/store/features/designation/designationSlice';
import { getAllJobNatures } from '@/lib/store/features/jobNature/jobNatureSlice';
import { getAllJobTypes } from '@/lib/store/features/jobType/jobTypeSlice';
import type { ChangeEvent } from 'react';
import {
  getOneEmployee,
  updateEmployee,
} from '@/lib/store/features/employee/employeeSlice';
import { useParams } from 'next/navigation';
import { Employee } from '@/types/employeeTypes';
import Image from 'next/image';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const imageSchema = z.custom<File>(
  (file) => {
    if (!(file instanceof File)) {
      return false;
    }

    const isValidFileType = ACCEPTED_IMAGE_TYPES.includes(file.type);
    const isValidFileSize = file.size <= MAX_FILE_SIZE;

    return isValidFileType && isValidFileSize;
  },
  {
    message: 'Invalid image. Only JPEG, PNG, GIF files under 5MB are allowed.',
  }
);

const formSchema = z.object({
  emp_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z
    .string()
    .optional()
    .refine(
      (val) =>
        val === undefined ||
        val.length === 0 ||
        z.string().email().safeParse(val).success,
      {
        message: 'Email is not valid.',
      }
    ),
  father: z.string().min(2, {
    message: 'Father name must be at least 2 characters.',
  }),
  phone: z.string().min(2, {
    message: 'Phone must be 2 characters.',
  }),
  nic: z.string().min(2, {
    message: 'NIC must be 2 characters.',
  }),
  prof_qualification: z.string().min(2, {
    message: 'Prof. Qualification must be at least 2 characters.',
  }),
  tech_skill: z.string().min(0, {
    message: 'Tech. Skill must be at least 2 characters.',
  }),
  departmentId: z.string().min(1, {
    message: 'Department is required.',
  }),
  designationId: z.string().min(1, {
    message: 'Designation is required.',
  }),
  jobTypeId: z.string().min(1, {
    message: 'JobType is required.',
  }),
  jobNatureId: z.string().min(1, {
    message: 'JobNature is required.',
  }),
  // image: imageSchema.optional(),
});

export default function Page() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [image, setImage] = useState('');
  const [areFieldsDisabled, setAreFieldsDisabled] = useState(true);
  const { employeeStatus, employeeError, employee } = useAppSelector(
    (state) => state.employee
  );
  const { department, departmentError, departmentStatus } = useAppSelector(
    (state) => state.department
  );
  const { designation, designationError, designationStatus } = useAppSelector(
    (state) => state.designation
  );
  const { jobType, jobTypeError, jobTypeStatus } = useAppSelector(
    (state) => state.jobType
  );
  const { jobNature, jobNatureError, jobNatureStatus } = useAppSelector(
    (state) => state.jobNature
  );

  // const { _id, email } = employee?.data?.[0] || {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emp_name: '',
      email: '',
      phone: '',
      father: '',
      nic: '',
      prof_qualification: '',
      tech_skill: '',
      departmentId: '',
      designationId: '',
      jobTypeId: '',
      jobNatureId: '',
      // image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('onSubmit triggered');
      const formData = new FormData();

      formData.append('emp_name', values.emp_name);
      formData.append('email', values.email || '');
      formData.append('father', values.father);
      formData.append('phone', values.phone);
      formData.append('nic', values.nic);
      formData.append('prof_qualification', values.prof_qualification);
      formData.append('tech_skill', values.tech_skill || '');
      formData.append('emp_department', values.departmentId);
      formData.append('emp_designation', values.designationId);
      formData.append('emp_type', values.jobTypeId);
      formData.append('emp_nature', values.jobNatureId);

      // if (values.image && values.image instanceof File) {
      //   formData.append('image', values.image);
      // }
      // console.log(formData.get("emp_name"))
      const updatedEmployee = await dispatch(
        updateEmployee({
          employeeId: params.id,
          employeeData: formData,
        })
      ).unwrap();
      console.log(updatedEmployee);
      toast({
        title: 'Employee Updated',
        description: 'Employee is updated successfuly.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Employee update Failed',
        description: err as string,
      });
      console.error(err);
    }
  }

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const fetchedEmployee = await dispatch(
          getOneEmployee(params.id)
        ).unwrap();
        if (
          fetchedEmployee &&
          fetchedEmployee.data &&
          fetchedEmployee.data[0]
        ) {
          const emp = fetchedEmployee.data[0];
          form.reset({
            emp_name: emp.emp_name || '',
            email: emp.email || '',
            phone: emp.phone || '',
            father: emp.father || '',
            nic: emp.nic || '',
            prof_qualification: emp.prof_qualification || '',
            tech_skill: emp.tech_skill || '',
            departmentId: emp.emp_department._id || '',
            designationId: emp.emp_designation._id || '',
            jobTypeId: emp.emp_type._id || '',
            jobNatureId: emp.emp_nature._id || '',
            // image: emp.image || '',
          });
          emp.image && setImage(emp.image);
        }
        // console.log(employee?.data[0])
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    }
    dispatch(getAllDepartments());
    dispatch(getAllDesignations());
    dispatch(getAllJobNatures());
    dispatch(getAllJobTypes());
    fetchEmployee();
  }, [dispatch, params.id, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
      >
        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms1"
            checked={!areFieldsDisabled}
            onCheckedChange={() => setAreFieldsDisabled(!areFieldsDisabled)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Want to edit?
            </label>
          </div>
        </div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3 mt-5">
          <div className="container border-2 border-border rounded-lg text-center ">
            {image?.length !== 0 ? (
              <Image
                src={image}
                alt="employee-image"
                width={100}
                height={100}
              />
            ) : (
              <span className='text-sm pt-3'>No image</span>
            )}
          </div>

          <FormField
            control={form.control}
            name="emp_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name"
                    {...field}
                    disabled={areFieldsDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="father"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Father name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="father"
                    {...field}
                    disabled={areFieldsDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="phone"
                    {...field}
                    disabled={areFieldsDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                    disabled={areFieldsDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIC</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nic"
                    {...field}
                    disabled={areFieldsDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prof_qualification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prof. Qualification</FormLabel>
                <FormControl>
                  <Input
                    placeholder="qualification"
                    {...field}
                    disabled={areFieldsDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tech_skill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech. skill</FormLabel>
                <FormControl>
                  <Input
                    placeholder="skill"
                    {...field}
                    disabled={areFieldsDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={(value) =>
                    form.setValue('departmentId', value)
                  }
                  value={form.watch('departmentId') || ''}
                  disabled={areFieldsDisabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {department &&
                      department.data.map((department) => (
                        <SelectItem
                          key={department._id}
                          value={String(department._id)}
                        >
                          {department.department}
                        </SelectItem>
                      ))}
                    {departmentError && <span>{departmentError}</span>}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <Select
                  onValueChange={(value) =>
                    form.setValue('designationId', value)
                  }
                  value={form.watch('designationId') || ''}
                  disabled={areFieldsDisabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a designation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {designation &&
                      designation.data.map((designation) => (
                        <SelectItem
                          key={designation._id}
                          value={String(designation._id)}
                        >
                          {designation.designation}
                        </SelectItem>
                      ))}
                    {designationError && <span>{designationError}</span>}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobNatureId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job-Nature</FormLabel>
                <Select
                  onValueChange={(value) => form.setValue('jobNatureId', value)}
                  value={form.watch('jobNatureId') || ''}
                  disabled={areFieldsDisabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job-nature" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jobNature &&
                      jobNature.data.map((jobNature) => (
                        <SelectItem
                          key={jobNature._id}
                          value={String(jobNature._id)}
                        >
                          {jobNature.job_nature}
                        </SelectItem>
                      ))}
                    {jobNatureError && <span>{jobNatureError}</span>}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job-Type</FormLabel>
                <Select
                  onValueChange={(value) => form.setValue('jobTypeId', value)}
                  value={form.watch('jobTypeId') || ''}
                  disabled={areFieldsDisabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job-type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jobType &&
                      jobType.data.map((jobType) => (
                        <SelectItem
                          key={jobType._id}
                          value={String(jobType._id)}
                        >
                          {jobType.job_type}
                        </SelectItem>
                      ))}
                    {jobTypeError && <span>{jobTypeError}</span>}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <div className="min-w-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                    placeholder="Upload an image"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      if (event.target.files && event.target.files[0]) {
                        field.onChange(event.target.files[0]);
                      }
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={employeeStatus === 'loading' || areFieldsDisabled}
        >
          {employeeStatus === 'loading' ? (
            <span>Updating...</span>
          ) : (
            <span>Update</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
