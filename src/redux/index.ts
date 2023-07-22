import {Action, combineReducers, configureStore} from '@reduxjs/toolkit';
import loginReducer from './slicers/loginSlice';
import appReducer from './slicers/app';
// import wishlistReducer from './slicers/wishlistSlice';
// import allItemsReducer from './slicers/allItemsSlice';
// import shoppingBagReducer from './slicers/shoppingBagSlice';
// import shippingAddressReducer from './slicers/shippingAddressSlice';
// import paymentReducer from './slicers/paymentSlice';
// import recommendItemsReducer from './slicers/recommendSlice';

const combinedReducers = combineReducers({
  login: loginReducer,
  app: appReducer,
//   wishlist: wishlistReducer,
//   allItems: allItemsReducer,
//   shoppingBag: shoppingBagReducer,
//   shippingAddress: shippingAddressReducer,
//   payment: paymentReducer,
//   recommendItems: recommendItemsReducer,
});

const rootReducer = (state: any | undefined, action: Action) =>
  combinedReducers(state, action);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

export default store;
