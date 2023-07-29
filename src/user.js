import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    login: false,
    nama: undefined,
    email: undefined,
    identity: {},
    role: 'user'
  },
  reducers: {
    successLogin: (state) => {
      state.login = true;
    },
    logout: (state) => {
      state.login = false;
    },
    changeRole: (state, action) => {
      state.role = action.payload;
    },
    changeUser: (state, action) => {
      state.nama = action.payload;
    },
    changeIdentity: (state, action) => {
      state.identity = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { successLogin, logout, changeRole, changeUser, changeIdentity, changeEmail } = user.actions;
export default user.reducer;