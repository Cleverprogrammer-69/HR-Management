import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { extractErrorMessage } from '@/lib/extractErrorMsg';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};
const URL = process.env.HR_API_V1
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData:any, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/user/register`, userData, {
        withCredentials: true,
      });

      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(errorMsg || 'An error occurred during signup.');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData:any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${URL}/user/login`,
        userData,
      );

      return response.data;
    } catch (error: any) {
      const errorMsg = extractErrorMessage(error.response?.data);
      return thunkAPI.rejectWithValue(errorMsg || 'An error occurred during signup.');
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI)=>{
    try {
      const response = await axios.post(
        `${URL}/user/logout`,
        {},
        {withCredentials:true},
      )
      console.log(response.data)
      return response.data
    } catch (error : any) {
      const errorMsg = extractErrorMessage(error.response?.data)
      return thunkAPI.rejectWithValue(
        errorMsg || 'An error occurred during logout.'
      );
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action : any) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default authSlice.reducer;
