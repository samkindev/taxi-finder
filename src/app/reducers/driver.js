import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    driver: null,
};

export const { actions, reducer } = createSlice({
    name: "driver",
    initialState,
    reducers: {
        setDriver: (state, action) => {
            const payload = action.payload;
            if (payload.driver) {
                state.driver = payload.driver;
            }
        },
        clearDriver: (state) => {
            state.driver = null;
        }
    }
});

export const getCurrentDriver = state => state.driver.driver;