'use client';
import { JobNature_data, columns } from './columns';
import { DataTable } from './data-table';
import { JobNature } from '@/types/jobNatureTypes';
import { JobNatureDataToast } from '@/components/custom/JobNature/JobNatureDataToast';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { getAllJobNatures } from '@/lib/store/features/jobNature/jobNatureSlice';

export default function Page() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<JobNature_data[]>([]);

  const hasFetched = useRef(false);

  const { jobNature, jobNatureError, jobNatureStatus } = useAppSelector(
    (state) => state.jobNature
  );

  useEffect(() => {
    const fetchAlljobNatures = async () => {
      try {
        const jobNatures = await dispatch(getAllJobNatures()).unwrap();
        const jobNature_data: JobNature_data[] = jobNatures.data.map(
          (jobnature: JobNature) => {
            const { _id, job_nature } = jobnature;
            return {
              id: _id,
              name: job_nature,
            };
          }
        );
        setData(jobNature_data);
      } catch (error) {
        console.error('Failed to fetch jobNatures:', error);
      }
    };
    if (!hasFetched.current) {
      fetchAlljobNatures();
      hasFetched.current = true;
    }
  }, [dispatch]);

  return (
    <div className="md:container md:mx-auto m-0 p-0 md:py-2 w-screen md:w-full">
      {jobNatureStatus === 'succeeded' && (
        <DataTable columns={columns} data={data} />
      )}
      <JobNatureDataToast
        success={jobNatureStatus !== 'failed'}
        error={jobNatureError}
      />
    </div>
  );
}
