import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personsData: [], 
};

const personSlice = createSlice({
  name: "persons", 
  initialState,
  reducers: {
    setPersons: (state, action) => {
      state.personsData = action.payload.personsData; 
    },
  },
});

export const { setPersons } = personSlice.actions;
export default personSlice.reducer;
