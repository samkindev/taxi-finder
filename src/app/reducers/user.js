import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    connected: false,
    user: null,
    loading: false,
};

export const { actions, reducer } = createSlice({
    name: "user",
    initialState,
    reducers: {
        connectUser: (state, action) => {
            const payload = action.payload;
            state.loading = payload.loading;
            if (payload.user) {
                state.connected = true;
                state.user = payload.user;
            }
        },
        disconnectUser: (state, action) => {
            state.connected = false;
            state.user = null;
        }
    }
});

export const getUser = state => state.user.user;
export const getConnectedState = state => state.user.connected;
export const getLoadingState = state => state.loading;