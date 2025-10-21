import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setAllBlogs: (state, action) => {
      state = action.payload;
      return state;
    },
    clearAllBlogs: (state, action) => {
      state = [];
    },
    setBlog: (state, action) => {
      return [action.payload]; // we are not changing the state, but replacing it so we use return
    },
    addComment: (state, action) => {
      state[0].comments = action.payload; // assumes only 1 blog
    },
  },
});

export const { setAllBlogs, clearAllBlogs, addComment, setBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
