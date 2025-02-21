import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, HierarchyStep } from "../types/dashboard.types";
import { Device, Room } from "../types/types";

interface AppState {
  hasMicrointeractions: boolean;
  category: Category | null;
  hierarchy: HierarchyStep;
  room: Room | null;
  device: Device | null;
}

const initialState: AppState = {
  hasMicrointeractions: JSON.parse(
    localStorage.getItem("hasMicrointeractions") || "true"
  ),
  category: null,
  hierarchy: HierarchyStep.SmartHomeGrid,
  room: (localStorage.getItem("room") as Room) || Room.LivingRoom,
  device: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHasMicrointeractions(state: AppState, action: PayloadAction<boolean>) {
      state.hasMicrointeractions = action.payload;
      localStorage.setItem(
        "hasMicrointeractions",
        JSON.stringify(action.payload)
      );
    },
    setCategory(state: AppState, action: PayloadAction<Category | null>) {
      state.category = action.payload;
    },
    setHierarchy(state: AppState, action: PayloadAction<HierarchyStep>) {
      state.hierarchy = action.payload;
    },
    setRoom(state: AppState, action: PayloadAction<Room | null>) {
      state.room = action.payload;
      localStorage.setItem("room", action.payload || "");
    },
    setDevice(state: AppState, action: PayloadAction<Device | null>) {
      state.device = action.payload;
    },
  },
});

export const {
  setHasMicrointeractions,
  setCategory,
  setHierarchy,
  setRoom,
  setDevice,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
