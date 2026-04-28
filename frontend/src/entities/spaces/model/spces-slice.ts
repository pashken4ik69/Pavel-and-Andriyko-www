import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ISpace } from "./types";

interface SpacesState {
    spaces: ISpace[];
    currentSpace: ISpace | null;
}

const initialState: SpacesState = {
    spaces: [],
    currentSpace: null,
};

const spacesSlice = createSlice({
    name: "spaces",
    initialState,
    reducers: {
        setSpaces: (state, action: PayloadAction<ISpace[]>) => {
            state.spaces = action.payload;
        },
        setCurrentSpace: (state, action: PayloadAction<ISpace | null>) => {
            state.currentSpace = action.payload;
        },
        addSpace: (state, action: PayloadAction<ISpace>) => {
            state.spaces.push(action.payload);
        },
        updateSpace: (state, action: PayloadAction<ISpace>) => {
            const index = state.spaces.findIndex(s => s.id === action.payload.id);
            if (index !== -1) {
                state.spaces[index] = action.payload;
            }
        },
        deleteSpace: (state, action: PayloadAction<number | string>) => {
            state.spaces = state.spaces.filter(s => s.id !== action.payload);
        },
    },
});

export const {
    setSpaces,
    setCurrentSpace,
    addSpace,
    updateSpace,
    deleteSpace
} = spacesSlice.actions;

export default spacesSlice.reducer;
