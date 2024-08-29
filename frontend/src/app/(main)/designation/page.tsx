'use client';
import { Designation_data, columns } from './columns';
import { DataTable } from './data-table';
import { Designation } from '@/types/designationTypes';
import { DesignationDataToast } from '@/components/custom/Designation/DesignationDataToast';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { getAllDesignations } from '@/lib/store/features/designation/designationSlice';

export default function Page() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Designation_data[]>([]);

  const hasFetched = useRef(false);

  const { designation, designationError, designationStatus } = useAppSelector(
    (state) => state.designation
  );

  useEffect(() => {
    const fetchAllDesignations = async () => {
      try {
        const designations = await dispatch(getAllDesignations()).unwrap();
        const designation_data: Designation_data[] = designations.data.map(
          (desig: Designation) => {
            const { _id, designation, abbrevation } = desig;
            return {
              id: _id,
              abbrevation: abbrevation,
              name: designation,
            };
          }
        );
        setData(designation_data);
      } catch (error) {
        console.error('Failed to fetch designations:', error);
      }
    };
    if (!hasFetched.current) {
      fetchAllDesignations();
      hasFetched.current = true;
    }
  }, [dispatch]);

  return (
    <div className="md:container md:mx-auto m-0 p-0 md:py-2 w-screen md:w-full">
      {designationStatus === 'succeeded' && (
        <DataTable columns={columns} data={data} />
      )}
      <DesignationDataToast
        success={designationStatus !== 'failed'}
        error={designationError}
      />
    </div>
  );
}
