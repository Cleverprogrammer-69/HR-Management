import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://localhost:4000/api/v1";

export const signup = createAsyncThunk(
  "user/signup",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/user/register`, userCredentials, {
        withCredentials: true,
      });

      if (response.status < 400) {
        return response.data;
      } else {
        return rejectWithValue("Failed to sign up. Please try again.");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "An error occurred during signup."
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
