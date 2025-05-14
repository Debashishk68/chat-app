import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGroupSelected: false,
  groupName: null,
  groupPic: null,
  groupId: null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.groupName = action.payload.groupName;
      state.groupPic = action.payload.groupPic;
      state.isGroupSelected = true;
      state.groupId = action.payload.groupId;
    },
    removeGroup: (state) => {
      state.groupName = null;
      state.groupPic = null;
      state.isGroupSelected = false;
      state.groupId = null;
    },
  },
});

export const { setGroup, removeGroup } = groupSlice.actions;

export default groupSlice.reducer;
