import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: string;
  email_address: string;
  is_email_verified?: boolean;
  name?: string;
  role?: string;
  profile_image?: string | null;
  contact_number?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user?: User | null;
        token?: string | null;
        tokens?: { access: string };
      }>,
    ) => {
      if (action.payload.user !== undefined) {
        state.user = action.payload.user;
      }
      if (action.payload.token !== undefined) {
        state.token = action.payload.token;
      } else if (action.payload.tokens?.access) {
        state.token = action.payload.tokens.access;
      }
      state.isInitialized = true;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isInitialized = true;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      } else if (action.payload.email_address) {
        state.user = action.payload as User;
      }
    },
  },
});

export const {
  setCredentials,
  setToken,
  setUser,
  setInitialized,
  logout,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectIsAuthInitialized = (state: RootState) =>
  state.auth.isInitialized;

