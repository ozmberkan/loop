import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}/api/post/createPost`,
        post
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/api/post/getMyPosts/${userId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getAllPost = createAsyncThunk(
  "posts/getAllPost",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/api/post/getAllPosts`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPost: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [...state.posts, action.payload];
      })
      .addCase(createPost.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getAllPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getAllPost.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getMyPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getMyPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetPost } = postsSlice.actions;

export default postsSlice.reducer;
