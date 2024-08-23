import { extractErrorMessage } from '@/lib/extractErrorMsg';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { JobTypeResponse } from '@/types/jobTypeTypes';
type InitialState = {
  jobType: JobTypeResponse | null;
  jobTypeStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  jobTypeError: string | null;
};
const initialState: InitialState = {
  jobType: null,
  jobTypeStatus: 'idle',
  jobTypeError: null,
};
export const getAllJobTypes = createAsyncThunk(
  'jobType/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.HR_API_V1}/jobType`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while fetching all jobTypes.'
      );
    }
  }
);
const jobTypeSlice = createSlice({
  name: 'jobType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllJobTypes.pending, (state) => {
      state.jobTypeStatus = 'loading';
      state.jobTypeError = null;
    });
    builder.addCase(getAllJobTypes.fulfilled, (state, action) => {
      state.jobTypeError = null;
      state.jobType = action.payload;
      state.jobTypeStatus = 'succeeded';
    });
    builder.addCase(getAllJobTypes.rejected, (state, action: any) => {
      state.jobTypeError = action.payload;
      state.jobTypeStatus = 'failed';
    });
  },
});
export default jobTypeSlice.reducer;
