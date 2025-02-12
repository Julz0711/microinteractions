import { Category } from "../types/dashboard.types";

export const devices = [
  {
    icon: "FaLightbulb",
    name: "Leselampe",
    room: "Wohnzimmer",
    isActive: true,
    isFavorite: true,
    additionalInfo: "100%",
    category: Category.Lights,
  },
  {
    icon: "FaLightbulb",
    name: "Deckenleuchte",
    room: "Wohnzimmer",
    isActive: false,
    isFavorite: true,
    additionalInfo: "100%",
    category: Category.Lights,
  },
  {
    icon: "FaLightbulb",
    name: "Deckenleuchte 2",
    room: "Wohnzimmer",
    isActive: false,
    isFavorite: false,
    additionalInfo: "100%",
    category: Category.Lights,
  },
  {
    icon: "FaLightbulb",
    name: "Deckenleuchte",
    room: "Küche",
    isActive: true,
    isFavorite: false,
    additionalInfo: "100%",
    category: Category.Lights,
  },
];
