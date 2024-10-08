import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { EmployeeResponse } from '@/types/employeeTypes';
import Cookies from 'js-cookie';
type InitialState = {
  employee: EmployeeResponse | null;
  employeeStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  employeeError: string | null;
};
const initialState: InitialState = {
  employee: null,
  employeeStatus: 'idle',
  employeeError: null,
};
const getAccessToken = () => Cookies.get('accessToken');
export const getAllEmployees = createAsyncThunk(
  'employee/getAll',
  async (_, thunkAPI) => {
    const token = getAccessToken();
    try {
      const response = await axios.get(`${process.env.HR_API_V1}/employee`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while fetching all employees.'
      );
    }
  }
);
export const newEmployee = createAsyncThunk(
  'employee/new',
  async (data: any, thunkAPI) => {
    const token = getAccessToken();
    try {
      const response = await axios.post(
        `${process.env.HR_API_V1}/employee`,
        data,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while while creating new employee.'
      );
    }
  }
);

export const getOneEmployee = createAsyncThunk(
  'employee/getOne',
  async (employeeId: string | string[], thunkAPI) => {
    const token = getAccessToken();
    try {
      const response = await axios.get(
        `${process.env.HR_API_V1}/employee/${employeeId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while while creating new employee.'
      );
    }
  }
);

export const deleteOneEmployee = createAsyncThunk(
  'employee/deleteOne',
  async (employeeId: string | string[], thunkAPI) => {
    const token = getAccessToken();
    try {
      const response = await axios.delete(
        `${process.env.HR_API_V1}/employee/${employeeId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while deleting employee.'
      );
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employee/update',
  async (data: any, thunkAPI) => {
    const token = getAccessToken();
    const { employeeId, employeeData } = data;
    try {
      console.log(employeeData.get('emp_name'));
      const response = await axios.patch(
        `${process.env.HR_API_V1}/employee/${employeeId}`,
        employeeData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while update employee.'
      );
    }
  }
);
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //All employees
    builder.addCase(getAllEmployees.pending, (state) => {
      state.employeeStatus = 'loading';
      state.employeeError = null;
    });
    builder.addCase(getAllEmployees.fulfilled, (state, action) => {
      state.employeeError = null;
      state.employee = action.payload;
      state.employeeStatus = 'succeeded';
    });
    builder.addCase(getAllEmployees.rejected, (state, action: any) => {
      state.employeeError = action.payload;
      state.employeeStatus = 'failed';
    });
    //get One employee
    builder.addCase(getOneEmployee.pending, (state) => {
      state.employeeStatus = 'loading';
      state.employeeError = null;
    });
    builder.addCase(getOneEmployee.fulfilled, (state, action) => {
      state.employeeError = null;
      state.employee = action.payload;
      state.employeeStatus = 'succeeded';
    });
    builder.addCase(getOneEmployee.rejected, (state, action: any) => {
      state.employeeError = action.payload;
      state.employeeStatus = 'failed';
    });
    //new employee
    builder.addCase(newEmployee.pending, (state) => {
      state.employeeStatus = 'loading';
      state.employeeError = null;
    });
    builder.addCase(newEmployee.fulfilled, (state, action) => {
      state.employeeError = null;
      state.employee = action.payload;
      state.employeeStatus = 'succeeded';
    });
    builder.addCase(newEmployee.rejected, (state, action: any) => {
      state.employeeError = action.payload;
      state.employeeStatus = 'failed';
    });
    //delete an employee
    builder.addCase(deleteOneEmployee.pending, (state) => {
      state.employeeStatus = 'loading';
      state.employeeError = null;
    });
    builder.addCase(deleteOneEmployee.fulfilled, (state, action) => {
      state.employeeError = null;
      state.employee = action.payload;
      state.employeeStatus = 'succeeded';
    });
    builder.addCase(deleteOneEmployee.rejected, (state, action: any) => {
      state.employeeError = action.payload;
      state.employeeStatus = 'failed';
    });
    //update an employee
    builder.addCase(updateEmployee.pending, (state) => {
      state.employeeStatus = 'loading';
      state.employeeError = null;
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.employeeError = null;
      state.employee = action.payload;
      state.employeeStatus = 'succeeded';
    });
    builder.addCase(updateEmployee.rejected, (state, action: any) => {
      state.employeeError = action.payload;
      state.employeeStatus = 'failed';
    });
  },
});
export default employeeSlice.reducer;
