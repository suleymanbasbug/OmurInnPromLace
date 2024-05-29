import {LoginApiResponse} from '@app/services/auth';
import {User} from '@app/services/user';
import {saveTokenToKeychain} from '@app/utils/keychain';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export const initialTokenState: LoginApiResponse = {
  access_token: '',
  token_type: '',
  expires_in: 0,
};

export const initialUserState: User = {
  id: 0,
  username: '',
  role_id: 0,
  store_id: 0,
  role: {
    id: 0,
    name: '',
    room: '',
  },
  store: {
    id: 0,
    name: '',
    address: '',
    created_at: '',
    updated_at: '',
    city: '',
  },
  topics: [],
  points: 0,
};

export const initialState: LoginApiResponse & User = {
  ...initialTokenState,
  ...initialUserState,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<LoginApiResponse>) => {
      const newTokenState = action.payload;
      saveTokenToKeychain(newTokenState);
      return {...state, ...newTokenState};
    },
    setUser: (state, action) => {
      const newUserState = action.payload;

      return {...state, ...newUserState};
    },
    incrementPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
  },
});

export const {setToken, setUser, incrementPoints} = userSlice.actions;

export default userSlice.reducer;
