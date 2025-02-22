import { Category } from "./dashboard.types";

export type Device = {
  name: string;
  model: string;
  icon: string;
  room: string;
  isActive: boolean;
  isFavorite: boolean;
  additionalInfo: string;
  category: Category;
};

export type Scene = {
  name: string;
  icon: string;
  isActive: boolean;
  color: string;
};

export type Schedule = {
  name: string;
  icon: string;
  isActive: boolean;
  additionalInfo: string;
  color: string;
};

export enum Room {
  LivingRoom = "livingRoom",
  Bedroom = "bedroom",
  Kitchen = "kitchen",
  Bathroom = "bathroom",
  Hallway = "hallway",
}
