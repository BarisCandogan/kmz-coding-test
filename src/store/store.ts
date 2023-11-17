import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './Auth/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import cartSlice from './Cart/CartSlice';
import categorySlice from './Category/CategorySlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['categories'],
};

const rootReducer = combineReducers({
  auth: authSlice,
  cartItems: cartSlice,
  categories: categorySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
