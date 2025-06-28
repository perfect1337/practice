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

const testUsers = [
  { username: 'admin', password: 'admin', role: 'admin' },
  { username: 'admn', password: 'admn', role: 'admin' },
  // можно добавить других пользователей с role: 'user' для теста
  { username: 'yandex_user', password: 'oauth', role: 'admin' }, // mock Яндекс ID
];

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      const found = testUsers.find(
        u => u.username === action.payload.username && u.password === action.payload.password
      );
      if (found && found.role === 'admin') {
        state.isAuthenticated = true;
        state.user = { username: found.username, role: found.role };
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