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
        errorMsg || 'Something went wrong while fetching all jobtypes.'
      );
    }
  }
);
export const newJobType = createAsyncThunk(
  'jobType/new',
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.HR_API_V1}/jobType`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while while creating new jobType.'
      );
    }
  }
);

export const getOneJobType = createAsyncThunk(
  'jobType/getOne',
  async (jobTypeId: string | string[], thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.HR_API_V1}/jobtype/${jobTypeId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while while creating new jobType.'
      );
    }
  }
);

export const deleteOneJobType = createAsyncThunk(
  'jobType/deleteOne',
  async (jobTypeId: string | string[], thunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.HR_API_V1}/jobtype/${jobTypeId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while deleting jobType.'
      );
    }
  }
);

export const updateJobType = createAsyncThunk(
  'jobType/update',
  async (data: any, thunkAPI) => {
    const { jobTypeId, jobTypeData } = data;
    try {
      const response = await axios.patch(
        `${process.env.HR_API_V1}/jobType/${jobTypeId}`,
        jobTypeData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while update jobType.'
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
