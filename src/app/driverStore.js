import { configureStore } from '@reduxjs/toolkit';
import { reducer as driverReducer } from './reducers/driver';

export const driverStore = configureStore({
    reducer: {
        driver: driverReducer,
    },
});
