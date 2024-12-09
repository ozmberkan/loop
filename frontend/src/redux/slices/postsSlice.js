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
        "http://localhost:5858/api/post/createPost",
        post
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
      const res = await axios.get("http://localhost:5858/api/post/getAllPosts");
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
  reducers: {},
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
      });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
