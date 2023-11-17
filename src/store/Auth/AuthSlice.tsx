import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {getToken} = authSlice.actions;

export default authSlice.reducer;
