import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const commandEntity = createEntityAdapter({
    selectId: item => item.id,
});

const initialState = commandEntity.getInitialState({
    currentDestination: null,
});

export const { actions, reducer } = createSlice({
    name: "commande",
    initialState,
    reducers: {
        setCurrentCommand: (state, action) => {
            const d = action.payload;
            state.currentDestination = d;
        },
        getHistory: (state, action) => {
            const data = action.payload.commands;
            commandEntity.setMany(state, data);
        }
    }
});

export const getCurrentDestinaton = state => state.commands.currentDestination;