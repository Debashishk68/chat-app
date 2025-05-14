import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: null, 
};

const sidebarSlice = createSlice({
  name: "sidebar", 
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload; 
    },
  },
});

export const { setSelectedItem } = sidebarSlice.actions;
export default sidebarSlice.reducer;
