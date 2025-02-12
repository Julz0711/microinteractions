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
  }
};
