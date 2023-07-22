/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

export type IIdentityInitialState = {
  isLoading: boolean;
  location: any;
};

const name = 'APP';

const initialState: IIdentityInitialState = {
  isLoading: false,
  location: null,
};

const appSlicer = createSlice({
  name,
  initialState,
  reducers: {
    loadingStateOn(state) {
      state.isLoading = true;
    },
    loadingStateOff(state) {
      state.isLoading = false;
    },
    // setGeolocation(state, {payload}) {
    //   state.location = payload;
    // },
  },
});

export const selectIsLoading = (state: any) => state.app.isLoading;
export const selectLocation = (state: any) => state.app.location;

export const {
  loadingStateOff,
  loadingStateOn,
  //setGeolocation
} = appSlicer.actions;

export default appSlicer.reducer;
