import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'user';

interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    username: string;
    role: UserRole;
  };
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      // mock: только admin/admin
      if (action.payload.username === 'admin' && action.payload.password === 'admin') {
        state.isAuthenticated = true;
        state.user = { username: 'admin', role: 'admin' };
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.error = 'Неверный логин или пароль, либо нет прав администратора';
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    }
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer; 