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
const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});
export default departmentSlice.reducer;
