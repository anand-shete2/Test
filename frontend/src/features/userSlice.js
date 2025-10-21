import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,
    name: null,
    profileImageURL: null,
    role: null,
  },
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.profileImageURL = action.payload.profileImageURL;
      state.role = action.payload.role;
    },
    clearUser: (state, action) => {
      state._id = null;
      state.name = null;
      state.profileImageURL = null;
      state.role = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
