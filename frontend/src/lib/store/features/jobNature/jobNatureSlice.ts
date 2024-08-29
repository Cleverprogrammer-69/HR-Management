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
        errorMsg || 'Something went wrong while fetching all jobnatures.'
      );
    }
  }
);
export const newJobNature = createAsyncThunk(
  'jobNature/new',
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.HR_API_V1}/jobNature`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while while creating new jobNature.'
      );
    }
  }
);

export const getOneJobNature = createAsyncThunk(
  'jobNature/getOne',
  async (jobNatureId: string | string[], thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.HR_API_V1}/jobNature/${jobNatureId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while while creating new jobNature.'
      );
    }
  }
);

export const deleteOneJobNature = createAsyncThunk(
  'jobNature/deleteOne',
  async (jobNatureId: string | string[], thunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.HR_API_V1}/jobNature/${jobNatureId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while deleting jobNature.'
      );
    }
  }
);

export const updateJobNature = createAsyncThunk(
  'jobNature/update',
  async (data: any, thunkAPI) => {
    const { jobNatureId, jobNatureData } = data;
    try {
      const response = await axios.patch(
        `${process.env.HR_API_V1}/jobNature/${jobNatureId}`,
        jobNatureData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while update jobNature.'
      );
    }
  }
);
const jobNatureSlice = createSlice({
  name: 'jobNature',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //All jobnatures
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
    //get One jobnature
    builder.addCase(getOneJobNature.pending, (state) => {
      state.jobNatureStatus = 'loading';
      state.jobNatureError = null;
    });
    builder.addCase(getOneJobNature.fulfilled, (state, action) => {
      state.jobNatureError = null;
      state.jobNature = action.payload;
      state.jobNatureStatus = 'succeeded';
    });
    builder.addCase(getOneJobNature.rejected, (state, action: any) => {
      state.jobNatureError = action.payload;
      state.jobNatureStatus = 'failed';
    });
    //new jobnature
    builder.addCase(newJobNature.pending, (state) => {
      state.jobNatureStatus = 'loading';
      state.jobNatureError = null;
    });
    builder.addCase(newJobNature.fulfilled, (state, action) => {
      state.jobNatureError = null;
      state.jobNature = action.payload;
      state.jobNatureStatus = 'succeeded';
    });
    builder.addCase(newJobNature.rejected, (state, action: any) => {
      state.jobNatureError = action.payload;
      state.jobNatureStatus = 'failed';
    });
    //delete an jobnature
    builder.addCase(deleteOneJobNature.pending, (state) => {
      state.jobNatureStatus = 'loading';
      state.jobNatureError = null;
    });
    builder.addCase(deleteOneJobNature.fulfilled, (state, action) => {
      state.jobNatureError = null;
      state.jobNature = action.payload;
      state.jobNatureStatus = 'succeeded';
    });
    builder.addCase(deleteOneJobNature.rejected, (state, action: any) => {
      state.jobNatureError = action.payload;
      state.jobNatureStatus = 'failed';
    });
    //update an jobnature
    builder.addCase(updateJobNature.pending, (state) => {
      state.jobNatureStatus = 'loading';
      state.jobNatureError = null;
    });
    builder.addCase(updateJobNature.fulfilled, (state, action) => {
      state.jobNatureError = null;
      state.jobNature = action.payload;
      state.jobNatureStatus = 'succeeded';
    });
    builder.addCase(updateJobNature.rejected, (state, action: any) => {
      state.jobNatureError = action.payload;
      state.jobNatureStatus = 'failed';
    });
  },
});
export default jobNatureSlice.reducer;
