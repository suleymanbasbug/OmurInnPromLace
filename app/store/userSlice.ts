import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  token: {
    access_token: '',
    token_type: '',
    expires_in: 0,
  },
  user: {
    id: 0,
    username: '',
    role_id: 0,
    store_id: 0,
    role: {
      id: 0,
      name: '',
      role: '',
    },
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {setToken, setUser} = userSlice.actions;

export default userSlice.reducer;
