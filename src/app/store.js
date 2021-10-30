import { configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './reducers/user';
import { reducer as driverReducer } from './reducers/driver';
import { reducer as commandReducer } from './reducers/commads';

export const store = configureStore({
  reducer: {
    user: userReducer,
    driver: driverReducer,
    commands: commandReducer,
  },
});
