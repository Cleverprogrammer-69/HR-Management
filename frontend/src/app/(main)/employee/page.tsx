'use client';
import { Emp_data, columns } from './columns';
import { DataTable } from './data-table';
import { Employee } from '@/types/employeeTypes';
import { EmployeeDataToast } from '@/components/custom/Employee/EmployeeDataToast';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { getAllEmployees } from '@/lib/store/features/employee/employeeSlice';

export default function Page() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Emp_data[]>([]);

  const hasFetched = useRef(false);

  const { employee, employeeError, employeeStatus } = useAppSelector(
    (state) => state.employee
  );

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const employees = await dispatch(getAllEmployees()).unwrap();
        const emp_data: Emp_data[] = employees.data.map((emp: Employee) => {
          const { _id, emp_name, phone, emp_department } = emp;
          return {
            id: _id,
            name: emp_name,
            phone: phone,
            department: emp_department.department,
          };
        });
        setData(emp_data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };
    if (!hasFetched.current) {
      fetchAllEmployees();
      hasFetched.current = true;
    }
  },[dispatch]);

  return (
    <div className="md:container md:mx-auto m-0 p-0 md:py-2 w-screen md:w-full">
      {employeeStatus === 'succeeded' && (
        <DataTable columns={columns} data={data} />
      )}
      <EmployeeDataToast
        success={employeeStatus !== 'failed'}
        error={employeeError}
      />
    </div>
  );
}
