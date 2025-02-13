import { Category } from "../types/dashboard.types";

export const getColor = (category: Category) => {
  switch (category) {
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
  }
};

export const getName = (category: Category) => {
  switch (category) {
    case Category.Lights:
      return "Beleuchtung";
    case Category.Entertainment:
      return "Entertainment";
    case Category.Heat:
      return "Temperatur";
    case Category.Air:
      return "Luft";
    case Category.Household:
      return "Household";
  }
};
