import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, HierarchyStep } from "../types/dashboard.types";
import { Room } from "../types/types";

interface AppState {
  hasMicrointeractions: boolean;
  category: Category | null;
  hierarchy: HierarchyStep;
  room: Room  | null;
}

const initialState: AppState = {
  hasMicrointeractions: true,
  category: null,
  hierarchy: HierarchyStep.SmartHomeGrid,
  room: Room.LivingRoom,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHasMicrointeractions(state: AppState, action: PayloadAction<boolean>) {
      state.hasMicrointeractions = action.payload;
    },
    setCategory(state: AppState, action: PayloadAction<Category | null>) {
      state.category = action.payload;
    },
    setHierarchy(state: AppState, action: PayloadAction<HierarchyStep>) {
      state.hierarchy = action.payload;
    },
    setRoom(state: AppState, action: PayloadAction<Room | null>) {
      state.room = action.payload;  
    },
  },
});

export const { setHasMicrointeractions, setCategory, setHierarchy, setRoom } =
  appSlice.actions;
export const appReducer = appSlice.reducer;
