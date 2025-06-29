import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  username: string;
  status: 'active' | 'blocked';
  role: 'admin';
  organization?: string;
}

interface UsersState {
  users: User[];
  organizations: string[];
}

const initialState: UsersState = {
  users: [
    { id: '1', username: 'admin', status: 'active', role: 'admin', organization: 'Org1' },
  ],
  organizations: ['Org1', 'Org2', 'Org3'],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      if (action.payload.organization && !state.organizations.includes(action.payload.organization)) {
        state.organizations.push(action.payload.organization);
      }
    },
    editUser(state, action: PayloadAction<User>) {
      const idx = state.users.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state.users[idx] = action.payload;
    },
    blockUser(state, action: PayloadAction<string>) {
      const user = state.users.find(u => u.id === action.payload);
      if (user) user.status = 'blocked';
    },
    unblockUser(state, action: PayloadAction<string>) {
      const user = state.users.find(u => u.id === action.payload);
      if (user) user.status = 'active';
    },
    addOrganization(state, action: PayloadAction<string>) {
      if (!state.organizations.includes(action.payload)) {
        state.organizations.push(action.payload);
      }
    },
  },
});

export const { addUser, editUser, blockUser, unblockUser, addOrganization } = usersSlice.actions;
export default usersSlice.reducer; 