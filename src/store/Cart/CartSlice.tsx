import {createSlice} from '@reduxjs/toolkit';

interface CartSlice {
  cart: number;
  isButtonPressed: boolean;
}

const initialState: CartSlice = {
  cart: 0,
  isButtonPressed: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: state => {
      state.cart++;
    },
    pressed: (state, action) => {
      state.isButtonPressed = action.payload;
    },

    totalProduct: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {increase, totalProduct, pressed} = cartSlice.actions;

export default cartSlice.reducer;
