import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-named-as-default
import user from './user';

const store = configureStore({
  reducer: {
    user,
},
})


export default store;