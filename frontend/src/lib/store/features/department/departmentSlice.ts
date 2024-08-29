import { extractErrorMessage } from '@/lib/extractErrorMsg';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { DepartmentResponse } from '@/types/departmentTypes';
type InitialState = {
  department: DepartmentResponse | null;
  departmentStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  departmentError: string | null;
};
const initialState: InitialState = {
  department: null,
  departmentStatus: 'idle',
  departmentError: null,
};
export const getAllDepartments = createAsyncThunk(
  'department/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.HR_API_V1}/department`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while fetching all departments.'
      );
    }
  }
);
export const newDepartment = createAsyncThunk(
  'department/new',
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.HR_API_V1}/department`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while while creating new department.'
      );
    }
  }
);

export const getOneDepartment = createAsyncThunk(
  'department/getOne',
  async (departmentId: string | string[], thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.HR_API_V1}/department/${departmentId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while while creating new department.'
      );
    }
  }
);

export const deleteOneDepartment = createAsyncThunk(
  'department/deleteOne',
  async (departmentId: string | string[], thunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.HR_API_V1}/department/${departmentId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while deleting department.'
      );
    }
  }
);

export const updateDepartment = createAsyncThunk(
  'department/update',
  async (data: any, thunkAPI) => {
    const { departmentId, departmentData } = data;
    try {
      const response = await axios.patch(
        `${process.env.HR_API_V1}/department/${departmentId}`,
        departmentData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while update department.'
      );
    }
  }
);
const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //All departments
    builder.addCase(getAllDepartments.pending, (state) => {
      state.departmentStatus = 'loading';
      state.departmentError = null;
    });
    builder.addCase(getAllDepartments.fulfilled, (state, action) => {
      state.departmentError = null;
      state.department = action.payload;
      state.departmentStatus = 'succeeded';
    });
    builder.addCase(getAllDepartments.rejected, (state, action: any) => {
      state.departmentError = action.payload;
      state.departmentStatus = 'failed';
    });
    //get One department
    builder.addCase(getOneDepartment.pending, (state) => {
      state.departmentStatus = 'loading';
      state.departmentError = null;
    });
    builder.addCase(getOneDepartment.fulfilled, (state, action) => {
      state.departmentError = null;
      state.department = action.payload;
      state.departmentStatus = 'succeeded';
    });
    builder.addCase(getOneDepartment.rejected, (state, action: any) => {
      state.departmentError = action.payload;
      state.departmentStatus = 'failed';
    });
    //new department
    builder.addCase(newDepartment.pending, (state) => {
      state.departmentStatus = 'loading';
      state.departmentError = null;
    });
    builder.addCase(newDepartment.fulfilled, (state, action) => {
      state.departmentError = null;
      state.department = action.payload;
      state.departmentStatus = 'succeeded';
    });
    builder.addCase(newDepartment.rejected, (state, action: any) => {
      state.departmentError = action.payload;
      state.departmentStatus = 'failed';
    });
    //delete an department
    builder.addCase(deleteOneDepartment.pending, (state) => {
      state.departmentStatus = 'loading';
      state.departmentError = null;
    });
    builder.addCase(deleteOneDepartment.fulfilled, (state, action) => {
      state.departmentError = null;
      state.department = action.payload;
      state.departmentStatus = 'succeeded';
    });
    builder.addCase(deleteOneDepartment.rejected, (state, action: any) => {
      state.departmentError = action.payload;
      state.departmentStatus = 'failed';
    });
    //update an department
    builder.addCase(updateDepartment.pending, (state) => {
      state.departmentStatus = 'loading';
      state.departmentError = null;
    });
    builder.addCase(updateDepartment.fulfilled, (state, action) => {
      state.departmentError = null;
      state.department = action.payload;
      state.departmentStatus = 'succeeded';
    });
    builder.addCase(updateDepartment.rejected, (state, action: any) => {
      state.departmentError = action.payload;
      state.departmentStatus = 'failed';
    });
  },
});
export default departmentSlice.reducer;
