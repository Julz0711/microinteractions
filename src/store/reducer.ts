import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { hierarchyStep } from "../types/dashboard.types";

interface AppState {
  hasMicrointeractions: boolean;
  category: string;
  hierarchy: hierarchyStep;
}

const initialState: AppState = {
  hasMicrointeractions: true,
  category: "",
  hierarchy: hierarchyStep.SmartHomeGrid,
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
    setHierarchy(state: AppState, action: PayloadAction<hierarchyStep>) {
      state.hierarchy = action.payload;
    },
  },
});

export const { setHasMicrointeractions, setCategory, setHierarchy } =
  appSlice.actions;
export const appReducer = appSlice.reducer;
