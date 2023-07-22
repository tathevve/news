import {createSlice} from '@reduxjs/toolkit';

const name = 'APP';

const initialState = {
  userData: null,
};

const loginSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUserData(state, {payload}) {
      state.userData = payload;
    },
  },
});

export const {setUserData} = loginSlice.actions;

export const selectUserData = (state: any) => state.login.userData;

export default loginSlice.reducer;
