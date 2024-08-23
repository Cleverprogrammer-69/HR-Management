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
const designationSlice = createSlice({
  name: 'designation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});
export default designationSlice.reducer;
