import { extractErrorMessage } from '@/lib/extractErrorMsg';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { DesignationResponse } from '@/types/designationTypes';
type InitialState = {
  designation: DesignationResponse | null;
  designationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  designationError: string | null;
};
const initialState: InitialState = {
  designation: null,
  designationStatus: 'idle',
  designationError: null,
};
export const getAllDesignations = createAsyncThunk(
  'designation/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.HR_API_V1}/designation`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while fetching all designations.'
      );
    }
  }
);
export const newDesignation = createAsyncThunk(
  'designation/new',
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.HR_API_V1}/designation`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while while creating new designation.'
      );
    }
  }
);

export const getOneDesignation = createAsyncThunk(
  'designation/getOne',
  async (designationId: string | string[], thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.HR_API_V1}/designation/${designationId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while while creating new designation.'
      );
    }
  }
);

export const deleteOneDesignation = createAsyncThunk(
  'designation/deleteOne',
  async (designationId: string | string[], thunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.HR_API_V1}/designation/${designationId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while deleting designation.'
      );
    }
  }
);

export const updateDesignation = createAsyncThunk(
  'designation/update',
  async (data: any, thunkAPI) => {
    const { designationId, designationData } = data;
    try {
      const response = await axios.patch(
        `${process.env.HR_API_V1}/designation/${designationId}`,
        designationData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response.data);
      return thunkAPI.rejectWithValue(
        errorMsg || 'Something went wrong while update designation.'
      );
    }
  }
);
const designationSlice = createSlice({
  name: 'designation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //All designations
    builder.addCase(getAllDesignations.pending, (state) => {
      state.designationStatus = 'loading';
      state.designationError = null;
    });
    builder.addCase(getAllDesignations.fulfilled, (state, action) => {
      state.designationError = null;
      state.designation = action.payload;
      state.designationStatus = 'succeeded';
    });
    builder.addCase(getAllDesignations.rejected, (state, action: any) => {
      state.designationError = action.payload;
      state.designationStatus = 'failed';
    });
    //get One designation
    builder.addCase(getOneDesignation.pending, (state) => {
      state.designationStatus = 'loading';
      state.designationError = null;
    });
    builder.addCase(getOneDesignation.fulfilled, (state, action) => {
      state.designationError = null;
      state.designation = action.payload;
      state.designationStatus = 'succeeded';
    });
    builder.addCase(getOneDesignation.rejected, (state, action: any) => {
      state.designationError = action.payload;
      state.designationStatus = 'failed';
    });
    //new designation
    builder.addCase(newDesignation.pending, (state) => {
      state.designationStatus = 'loading';
      state.designationError = null;
    });
    builder.addCase(newDesignation.fulfilled, (state, action) => {
      state.designationError = null;
      state.designation = action.payload;
      state.designationStatus = 'succeeded';
    });
    builder.addCase(newDesignation.rejected, (state, action: any) => {
      state.designationError = action.payload;
      state.designationStatus = 'failed';
    });
    //delete an designation
    builder.addCase(deleteOneDesignation.pending, (state) => {
      state.designationStatus = 'loading';
      state.designationError = null;
    });
    builder.addCase(deleteOneDesignation.fulfilled, (state, action) => {
      state.designationError = null;
      state.designation = action.payload;
      state.designationStatus = 'succeeded';
    });
    builder.addCase(deleteOneDesignation.rejected, (state, action: any) => {
      state.designationError = action.payload;
      state.designationStatus = 'failed';
    });
    //update an designation
    builder.addCase(updateDesignation.pending, (state) => {
      state.designationStatus = 'loading';
      state.designationError = null;
    });
    builder.addCase(updateDesignation.fulfilled, (state, action) => {
      state.designationError = null;
      state.designation = action.payload;
      state.designationStatus = 'succeeded';
    });
    builder.addCase(updateDesignation.rejected, (state, action: any) => {
      state.designationError = action.payload;
      state.designationStatus = 'failed';
    });
  },
});
export default designationSlice.reducer;
