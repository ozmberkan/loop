import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  currentUser: null,
  status: "idle",
  error: "",
};

export const registerService = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}/api/auth/register`,
        data,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginService = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserService = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/api/auth/getUser`,
        { withCredentials: true }
      );

      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserByIdService = createAsyncThunk(
  "user/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/api/auth/getUserById/${id}`
      );

      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutService = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/api/auth/signout`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUserService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logoutService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        state.error = null;
      })
      .addCase(getUserByIdService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getUserByIdService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserByIdService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.error = null;
      });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
