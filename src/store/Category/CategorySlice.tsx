import {createSlice} from '@reduxjs/toolkit';
import {Products} from '../../models/products';
import {CategoryProducts} from '../../models/categoryProduct';

interface CategorySlice {
  category: Products[];
  product: CategoryProducts[];
}

const initialState: CategorySlice = {
  category: [],
  product: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategory: (state, action) => {
      state.category = action.payload;
    },
    getProducts: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const {getCategory, getProducts} = categorySlice.actions;

export default categorySlice.reducer;
