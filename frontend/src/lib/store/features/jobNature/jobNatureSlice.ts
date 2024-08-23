
import { extractErrorMessage } from '@/lib/extractErrorMsg';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { JobNatureResponse } from '@/types/jobNatureTypes';
type InitialState = {
  jobNature: JobNatureResponse | null;
  jobNatureStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  jobNatureError: string | null;
};
const initialState: InitialState = {
  jobNature: null,
  jobNatureStatus: 'idle',
  jobNatureError: null,
};
export const getAllJobNatures = createAsyncThunk(
  'jobNature/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.HR_API_V1}/jobNature`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while fetching all jobNatures.'
      );
    }
  }
);
const jobNatureSlice = createSlice({
  name: 'jobNature',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllJobNatures.pending, (state) => {
      state.jobNatureStatus = 'loading';
      state.jobNatureError = null;
    });
    builder.addCase(getAllJobNatures.fulfilled, (state, action) => {
      state.jobNatureError = null;
      state.jobNature = action.payload;
      state.jobNatureStatus = 'succeeded';
    });
    builder.addCase(getAllJobNatures.rejected, (state, action: any) => {
      state.jobNatureError = action.payload;
      state.jobNatureStatus = 'failed';
    });
  },
});
export default jobNatureSlice.reducer;
