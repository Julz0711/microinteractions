import { Category } from "../types/dashboard.types";

export const devices = [
  {
    icon: "FaLightbulb",
    name: "Leselampe",
    room: "Wohnzimmer",
    active: true,
    isFavorite: true,
    color: "bg-yellow",
    additional: "100%",
    category: Category.Lights,
  },
  {
    icon: "FaLightbulb",
    name: "Deckenleuchte",
    room: "Wohnzimmer",
    active: false,
    isFavorite: true,
    color: "bg-yellow",
    additional: "100%",
    category: Category.Lights,
  },
  {
    icon: "FaLightbulb",
    name: "Deckenleuchte 2",
    room: "Wohnzimmer",
    active: false,
    isFavorite: false,
    color: "bg-yellow",
    additional: "100%",
    category: Category.Lights,
  },
  {
    icon: "FaLightbulb",
    name: "Deckenleuchte",
    room: "Küche",
    active: true,
    isFavorite: false,
    color: "bg-yellow",
    additional: "100%",
    category: Category.Lights,
  },
];
