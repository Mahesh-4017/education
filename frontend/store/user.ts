import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postApiCall, ErrorResponse } from '../utils/api';

interface UserState {
  userInfo: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk<{ success: true, token: string, user: User } | ErrorResponse, { email: string, password: string }>(
  'user/login',
  (body) => postApiCall<{ success: true, token: string, user: User } | ErrorResponse>('/user/login', body)
);

export const signupUser = createAsyncThunk<{ success: true, token: string } | ErrorResponse, { name: string, password: string, email: string, confirmPassword: string }>(
  'user/signup',
  (body) => postApiCall<{ success: true, token: string } | ErrorResponse>('/user', body)
);

export const verifyUser = createAsyncThunk<{ success: true, token: string, user: User } | ErrorResponse, { otp: string, token: string }>(
  'user/verify',
  (body) => postApiCall<{ success: true, token: string, user: User }>('/user/verify', body)
);

export const forgotPassword = createAsyncThunk<{ success: true, token: string } | ErrorResponse, { email: string, password: string }>(
  'user/forgotPassword',
  (body) => postApiCall<{ success: true, token: string } | ErrorResponse>('/user/forgotPassword', body)
);

export const resetPassword = createAsyncThunk<{ success: true, } | ErrorResponse, { token: string, otp: string }>(
  'user/resetPassword',
  (body) => postApiCall<{ success: true, } | ErrorResponse>('/user/resetPassword', body)
);

export const tokenLoginUser = createAsyncThunk<{ success: true, user: User } | ErrorResponse, { token: string }>(
  'user/tokenLogin',
  (body) => postApiCall<{ success: true, user: User }>('/user/tokenLogin', body)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.status = 'idle';
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.success === false) {
          state.status = 'failed';
          state.error = action.payload.message;
        } else if (action.payload.success === true) {
          state.status = 'succeeded';
          state.userInfo = action.payload.user;
          if (action.payload.token && typeof window !== 'undefined') {
            localStorage.setItem('token', action.payload.token);
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        if ((action.payload as ErrorResponse).success === false) {
          state.status = 'failed';
          state.error = (action.payload as ErrorResponse).message;
        } else {
          state.status = 'succeeded';
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      })
      // Verify
      .addCase(verifyUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        if ((action.payload as ErrorResponse).success === false) {
          state.status = 'failed';
          state.error = (action.payload as ErrorResponse).message;
        } else {
          state.status = 'succeeded';
        }
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      })
      // Token Login
      .addCase(tokenLoginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(tokenLoginUser.fulfilled, (state, action) => {
        if ((action.payload as ErrorResponse).success === false) {
          state.status = 'failed';
          state.error = (action.payload as ErrorResponse).message;
          state.userInfo = null;
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
        } else if (action.payload.success === true) {
          state.status = 'succeeded';
          state.userInfo = action.payload.user;
        }
      })
      .addCase(tokenLoginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
        state.userInfo = null;
      });
  },
});

export const { logout, clearError } = userSlice.actions;

export default userSlice.reducer;
