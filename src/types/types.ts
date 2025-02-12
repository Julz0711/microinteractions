import { Category } from "./dashboard.types";

export type Device = {
  name: string;
  icon: string;
  room: string;
  isActive: boolean;
  isFavorite: boolean;
  additionalInfo: string;
  category: Category;
};
