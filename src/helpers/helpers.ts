import { Category } from "../types/dashboard.types";
import { Room } from "../types/types";

export const getColor = (category: Category) => {
  const categoryMap: Record<string, Category> = {
    Beleuchtung: Category.Lights,
    Entertainment: Category.Entertainment,
    Heizung: Category.Heat,
    Luft: Category.Air,
    Haushalt: Category.Household,
  };

  const normalizedCategory = categoryMap[category] || category;

  switch (normalizedCategory) {
    case Category.Lights:
      return "bg-orange";
    case Category.Entertainment:
      return "bg-purple";
    case Category.Heat:
      return "bg-red";
    case Category.Air:
      return "bg-green";
    case Category.Household:
      return "bg-blue";
    default:
      return "bg-dark";
  }
};

export const getShadow = (category: Category) => {
  const categoryMap: Record<string, Category> = {
    Beleuchtung: Category.Lights,
    Entertainment: Category.Entertainment,
    Heizung: Category.Heat,
    Luft: Category.Air,
    Haushalt: Category.Household,
  };

  const normalizedCategory = categoryMap[category] || category;

  switch (normalizedCategory) {
    case Category.Lights:
      return "shadow-[0_0_8px_var(--color-orange)]";
    case Category.Entertainment:
      return "shadow-purple";
    case Category.Heat:
      return "shadow-red";
    case Category.Air:
      return "shadow-green";
    case Category.Household:
      return "shadow-blue";
    default:
      return "shadow-dark";
  }
};

export const getTextColor = (category: Category) => {
  const categoryMap: Record<string, Category> = {
    Beleuchtung: Category.Lights,
    Entertainment: Category.Entertainment,
    Heizung: Category.Heat,
    Luft: Category.Air,
    Haushalt: Category.Household,
  };

  const normalizedCategory = categoryMap[category] || category;

  switch (normalizedCategory) {
    case Category.Lights:
      return "text-orange";
    case Category.Entertainment:
      return "text-purple";
    case Category.Heat:
      return "text-red";
    case Category.Air:
      return "text-green";
    case Category.Household:
      return "text-blue";
    default:
      return "text-dark";
  }
};

export const getCategoryName = (category: Category) => {
  switch (category) {
    case Category.Lights:
      return "Beleuchtung";
    case Category.Entertainment:
      return "Entertainment";
    case Category.Heat:
      return "Heizung";
    case Category.Air:
      return "Luft";
    case Category.Household:
      return "Haushalt";
    default:
      return "bg-dark";
  }
};

export const getRoomName = (room: Room) => {
  switch (room) {
    case Room.LivingRoom:
      return "Wohnzimmer";
    case Room.Bedroom:
      return "Schlafzimmer";
    case Room.Kitchen:
      return "Küche";
    case Room.Bathroom:
      return "Badezimmer";
    case Room.Hallway:
      return "Flur";
    default:
      return "Unbekannt";
  }
};

export const getAllCategoryNames = () => {
  return Object.values(Category).map((category) =>
    getCategoryName(category as Category)
  );
};

export const getAllRoomNames = () => {
  return Object.values(Room).map((room) => getRoomName(room as Room));
};
