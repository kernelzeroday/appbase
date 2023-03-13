import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { Token, UserModel } from '../../axios/model';
import { TokenModel, UserResponseModel } from '../../axios';


interface LoginInfo {
  email: string;
  password: string;
}

const initialState = {
  user: undefined as undefined | UserResponseModel,
  token: undefined as undefined | TokenModel,
  loginInfo: {
    email: '',
    password: '',
  } as LoginInfo,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    resetAuthData: (state) => {
      state.user = undefined;
      state.token = undefined;
    },
    setUser(state, action: PayloadAction<UserResponseModel>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<TokenModel>) {
      state.token = action.payload;
    },
    setLoginEmail(state, action: PayloadAction<LoginInfo>) {
      state.loginInfo = action.payload;
    },
  },
});

export const { reset, resetAuthData, setUser, setToken, setLoginEmail } =
  authSlice.actions;
export default authSlice.reducer;
