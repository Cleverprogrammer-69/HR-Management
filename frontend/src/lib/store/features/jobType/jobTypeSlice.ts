import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { JobTypeResponse } from '@/types/jobTypeTypes';
import Cookies from 'js-cookie';
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
const URL = process.env.HR_API_V1;
const getAccessToken = () => Cookies.get('accessToken');
export const getAllJobTypes = createAsyncThunk(
  'jobType/getAll',
  async (_, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${URL}/jobType`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while fetching all job types.'
      );
    }
  }
);

export const newJobType = createAsyncThunk(
  'jobType/new',
  async (data: any, thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await axios.post(`${URL}/jobType`, data, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while creating a new job type.'
      );
    }
  }
);

export const getOneJobType = createAsyncThunk(
  'jobType/getOne',
  async (jobTypeId: string | string[], thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${URL}/jobtype/${jobTypeId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while fetching the job type.'
      );
    }
  }
);

export const deleteOneJobType = createAsyncThunk(
  'jobType/deleteOne',
  async (jobTypeId: string | string[], thunkAPI) => {
    try {
      const token = getAccessToken();
      const response = await axios.delete(`${URL}/jobtype/${jobTypeId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while deleting the job type.'
      );
    }
  }
);

export const updateJobType = createAsyncThunk(
  'jobType/update',
  async (data: any, thunkAPI) => {
    const { jobTypeId, jobTypeData } = data;
    try {
      const token = getAccessToken();
      const response = await axios.patch(
        `${URL}/jobType/${jobTypeId}`,
        jobTypeData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while updating the job type.'
      );
    }
  }
);
const jobTypeSlice = createSlice({
  name: 'jobType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //All jobtypes
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
    //get One jobtype
    builder.addCase(getOneJobType.pending, (state) => {
      state.jobTypeStatus = 'loading';
      state.jobTypeError = null;
    });
    builder.addCase(getOneJobType.fulfilled, (state, action) => {
      state.jobTypeError = null;
      state.jobType = action.payload;
      state.jobTypeStatus = 'succeeded';
    });
    builder.addCase(getOneJobType.rejected, (state, action: any) => {
      state.jobTypeError = action.payload;
      state.jobTypeStatus = 'failed';
    });
    //new jobtype
    builder.addCase(newJobType.pending, (state) => {
      state.jobTypeStatus = 'loading';
      state.jobTypeError = null;
    });
    builder.addCase(newJobType.fulfilled, (state, action) => {
      state.jobTypeError = null;
      state.jobType = action.payload;
      state.jobTypeStatus = 'succeeded';
    });
    builder.addCase(newJobType.rejected, (state, action: any) => {
      state.jobTypeError = action.payload;
      state.jobTypeStatus = 'failed';
    });
    //delete an jobtype
    builder.addCase(deleteOneJobType.pending, (state) => {
      state.jobTypeStatus = 'loading';
      state.jobTypeError = null;
    });
    builder.addCase(deleteOneJobType.fulfilled, (state, action) => {
      state.jobTypeError = null;
      state.jobType = action.payload;
      state.jobTypeStatus = 'succeeded';
    });
    builder.addCase(deleteOneJobType.rejected, (state, action: any) => {
      state.jobTypeError = action.payload;
      state.jobTypeStatus = 'failed';
    });
    //update an jobtype
    builder.addCase(updateJobType.pending, (state) => {
      state.jobTypeStatus = 'loading';
      state.jobTypeError = null;
    });
    builder.addCase(updateJobType.fulfilled, (state, action) => {
      state.jobTypeError = null;
      state.jobType = action.payload;
      state.jobTypeStatus = 'succeeded';
    });
    builder.addCase(updateJobType.rejected, (state, action: any) => {
      state.jobTypeError = action.payload;
      state.jobTypeStatus = 'failed';
    });
  },
});
export default jobTypeSlice.reducer;
