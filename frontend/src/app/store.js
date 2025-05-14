import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import sidebarSlice from '../features/sidebar/sideBarSlice'
import groupSlice  from '../features/groups/groupSlice';
import personSlice from '../features/persons/personSlice'

export const store = configureStore({
  reducer: {
    user: userReducer, 
    sidebar:sidebarSlice,
    group:groupSlice,
    persons:personSlice
  },
});
