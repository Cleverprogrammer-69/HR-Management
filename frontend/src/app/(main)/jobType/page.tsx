'use client';
import { JobType_data, columns } from './columns';
import { DataTable } from './data-table';
import { JobType } from '@/types/jobTypeTypes';
import { JobTypeDataToast } from '@/components/custom/JobType/JobTypeDataToast';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { getAllJobTypes } from '@/lib/store/features/jobType/jobTypeSlice';

export default function Page() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<JobType_data[]>([]);

  const hasFetched = useRef(false);

  const { jobType, jobTypeError, jobTypeStatus } = useAppSelector(
    (state) => state.jobType
  );

  useEffect(() => {
    const fetchAllJobTypes = async () => {
      try {
        const jobtypes = await dispatch(getAllJobTypes()).unwrap();
        const jobtype_data: JobType_data[] = jobtypes.data.map(
          (jobtype: JobType) => {
            const { _id, job_type } = jobtype;
            return {
              id: _id,
              name: job_type,
            };
          }
        );
        setData(jobtype_data);
      } catch (error) {
        console.error('Failed to fetch jobtypes:', error);
      }
    };
    if (!hasFetched.current) {
      fetchAllJobTypes();
      hasFetched.current = true;
    }
  }, [dispatch]);

  return (
    <div className="md:container md:mx-auto m-0 p-0 md:py-2 w-screen md:w-full">
      {jobTypeStatus === 'succeeded' && (
        <DataTable columns={columns} data={data} />
      )}
      <JobTypeDataToast
        success={jobTypeStatus !== 'failed'}
        error={jobTypeError}
      />
    </div>
  );
}
