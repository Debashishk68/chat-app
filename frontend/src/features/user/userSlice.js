import { createSlice } from "@reduxjs/toolkit";
import { use } from "react";

const initialState = {
  isUserSelected: false,
  userName: null,
  userPic: null,
  userId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state,action) => {
        state.userName = action.payload.userName;
        state.userPic = action.payload.userPic;
        state.isUserSelected = true;
        state.userId = action.payload.userId;

    },
    removeUser: (state) => {
        state.userName = null;
        state.isUserSelected = false;
        state.userPic = null;
        state.userId = null;
        state.onchange = false;
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { setUser,removeUser } = userSlice.actions;

export default userSlice.reducer;
