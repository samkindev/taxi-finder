import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const commandEntity = createEntityAdapter({
    selectId: item => item.id,
});

const initialState = commandEntity.getInitialState({
    currentDestination: null,
    currentCommand: null
});

export const { actions, reducer } = createSlice({
    name: "commande",
    initialState,
    reducers: {
        setCurrentDestination: (state, action) => {
            const d = action.payload;
            state.currentDestination = d;
        },
        setCurrentCommand: (state, action) => {
            state.currentCommand = action.payload;
        },
        getHistory: (state, action) => {
            const data = action.payload.commands;
            commandEntity.setMany(state, data);
        }
    }
});

export const getCurrentDestinaton = state => state.commands.currentDestination;
export const getCurrentCommand = state => state.commands.currentCommand;