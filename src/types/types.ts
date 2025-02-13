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

export enum Room {
  LivingRoom = "livingRoom",
  Bedroom = "bedroom",
  Kitchen = "kitchen",
  Bathroom = "bathroom",
  Hallway = "hallway",
}
