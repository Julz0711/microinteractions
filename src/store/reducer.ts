import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  hasMicrointeractions: boolean;
  category: string;
}

const initialState: AppState = {
  hasMicrointeractions: false,
  category: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHasMicrointeractions(state: AppState, action: PayloadAction<boolean>) {
      state.hasMicrointeractions = action.payload;
    },
    setCategory(state: AppState, action: PayloadAction<string>) {
      state.category = action.payload;
    },
  },
});

export const { setHasMicrointeractions, setCategory } = appSlice.actions;
export const appReducer = appSlice.reducer;
