'use client';
import { Department_data, columns } from './columns';
import { DataTable } from './data-table';
import { Department } from '@/types/departmentTypes';
import { DepartmentDataToast } from '@/components/custom/Department/DepartmentDataToast';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { getAllDepartments } from '@/lib/store/features/department/departmentSlice';

export default function Page() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Department_data[]>([]);

  const hasFetched = useRef(false);

  const { department, departmentError, departmentStatus } = useAppSelector(
    (state) => state.department
  );

  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const departments = await dispatch(getAllDepartments()).unwrap();
        const department_data: Department_data[] = departments.data.map(
          (depart: Department) => {
            const { _id, department, hod, abbrevation } = depart;
            return {
              id: _id,
              abbrevation: abbrevation,
              name: department,
              hod: hod,
            };
          }
        );
        setData(department_data);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };
    if (!hasFetched.current) {
      fetchAllDepartments();
      hasFetched.current = true;
    }
  }, [dispatch]);

  return (
    <div className="md:container md:mx-auto m-0 p-0 md:py-2 w-screen md:w-full">
      {departmentStatus === 'succeeded' && (
        <DataTable columns={columns} data={data} />
      )}
      <DepartmentDataToast
        success={departmentStatus !== 'failed'}
        error={departmentError}
      />
    </div>
  );
}
