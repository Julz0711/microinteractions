import { Category } from "../types/dashboard.types";
import { Room } from "../types/types";

export const devices = [
  // Living Room
  {
    icon: "Lamp",
    name: "Leselampe",
    model: "Lamp M200",
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: "100%",
    category: Category.Lights,
  },
  {
    icon: "Lamp",
    name: "Deckenlampe",
    model: "Lamp L500",
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: "100%",
    category: Category.Lights,
  },
  {
    icon: "Lamp",
    name: "Deckenlampe 2",
    model: "Lamp L500",
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: false,
    additionalInfo: "100%",
    category: Category.Lights,
  },
  {
    icon: "Temp",
    name: "Heizung Fenster",
    model: "Heater Pro",
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: "21°",
    category: Category.Heat,
  },
  {
    icon: "Temp",
    name: "Heizung Wand",
    model: "Heater Pro",
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: false,
    additionalInfo: "21°",
    category: Category.Heat,
  },
  {
    icon: "Entertainment",
    name: "Fernseher",
    model: "TV Ultra",
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: true,
    additionalInfo: "100%",
    category: Category.Entertainment,
  },
  {
    icon: "Entertainment",
    name: "BT Lautsprecher Soundbar",
    model: "Speaker S300",
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: false,
    additionalInfo: "100%",
    category: Category.Entertainment,
  },
  {
    icon: "Air",
    name: "Ventilator",
    model: "Fresh Air Pro",
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: "100%",
    category: Category.Air,
  },
  {
    icon: "Air",
    name: "Luftentfeuchter",
    model: "Air Pro",
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: false,
    additionalInfo: "Auto",
    category: Category.Air,
  },
  {
    icon: "Pluh",
    name: "Staubsauger Roboter",
    model: "Roomber",
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: true,
    additionalInfo: "Route 41%",
    category: Category.Household,
  },
  // Kitchen
  {
    icon: "Lamp",
    name: "Deckenleuchte",
    model: "Lamp L400",
    room: Room.Kitchen,
    isActive: true,
    isFavorite: false,
    additionalInfo: "70%",
    category: Category.Lights,
  },
  {
    icon: "Lamp",
    name: "Licht Spüle",
    model: "Lamp S50",
    room: Room.Kitchen,
    isActive: false,
    isFavorite: false,
    additionalInfo: "100%",
    category: Category.Lights,
  },
  {
    icon: "Entertainment",
    name: "BT Lautsprecher",
    model: "Speaker S500 Max",
    room: Room.Kitchen,
    isActive: false,
    isFavorite: true,
    additionalInfo: "100%",
    category: Category.Entertainment,
  },
  {
    icon: "Temp",
    name: "Heizung Fenster",
    model: "Heater Pro",
    room: Room.Kitchen,
    isActive: false,
    isFavorite: false,
    additionalInfo: "22°",
    category: Category.Heat,
  },
  {
    icon: "Pluh",
    name: "Kühlschrank",
    model: "Smart Fridge SF800",
    room: Room.Kitchen,
    isActive: true,
    isFavorite: true,
    additionalInfo: "Eco",
    category: Category.Household,
  },
  // Bedroom
  {
    icon: "Lamp",
    name: "Deckenleuchte",
    model: "Lamp M400",
    room: Room.Bedroom,
    isActive: true,
    isFavorite: true,
    additionalInfo: "100%",
    category: Category.Lights,
  },
  {
    icon: "Lamp",
    name: "Nachttischlampe",
    model: "Lamp S100",
    room: Room.Bedroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: "40%",
    category: Category.Lights,
  },
  {
    icon: "Temp",
    name: "Thermostat",
    model: "Thermo T20",
    room: Room.Bedroom,
    isActive: true,
    isFavorite: true,
    additionalInfo: "Auto",
    category: Category.Heat,
  },
  {
    icon: "Temp",
    name: "Heizung Wand",
    model: "Heater Pro",
    room: Room.Bedroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: "21°",
    category: Category.Heat,
  },
  {
    icon: "Air",
    name: "Klimaanlage",
    model: "A/C Pro",
    room: Room.Bedroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: "Auto",
    category: Category.Air,
  },
  {
    icon: "Entertainment",
    name: "BT Lautsprecher",
    model: "Speaker S500",
    room: Room.Bedroom,
    isActive: false,
    isFavorite: true,
    additionalInfo: "100%",
    category: Category.Entertainment,
  },
  /* Badezimmer */
  {
    icon: "Lamp",
    name: "Deckenleuchte",
    model: "Lamp M400",
    room: Room.Bathroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: "100%",
    category: Category.Lights,
  },
  {
    icon: "Lamp",
    name: "Spiegellampe",
    model: "Lamp M200",
    room: Room.Bathroom,
    isActive: false,
    isFavorite: true,
    additionalInfo: "100%",
    category: Category.Lights,
  },
  {
    icon: "Entertainment",
    name: "BT Lautsprecher",
    model: "Speaker S500",
    room: Room.Bathroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: "80%",
    category: Category.Entertainment,
  },
  {
    icon: "Air",
    name: "Luftentfeuchter",
    model: "Air Pro",
    room: Room.Bathroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: "50%",
    category: Category.Air,
  },
  {
    icon: "Temp",
    name: "Heizung",
    model: "Heater Pro",
    room: Room.Bathroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: "23°",
    category: Category.Heat,
  },
  /* Flur */
  {
    icon: "Lamp",
    name: "Deckenleuchte",
    model: "Lamp M400",
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: "80%",
    category: Category.Lights,
  },
  {
    icon: "Temp",
    name: "Thermostat",
    model: "Thermo T20",
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: "Auto",
    category: Category.Heat,
  },
  {
    icon: "Pluh",
    name: "Sicherheitssystem",
    model: "Securo S350",
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: "An",
    category: Category.Household,
  },
];

export const scenes = [
  {
    icon: "Controller",
    name: "Gaming",
    isActive: true,
    color: "green",
  },
  {
    icon: "Laptop",
    name: "Home Office",
    isActive: true,
    color: "yellow",
  },
  {
    icon: "Laptop",
    name: "TV Abend",
    isActive: false,
    color: "purple",
  },
  {
    icon: "Moon",
    name: "Gute Nacht",
    isActive: true,
    color: "blue",
  },
];

export const schedules = [
  {
    icon: "Sun",
    name: "Morgenroutine Mo-Fr",
    isActive: true,
    additionalInfo: "3 Räume, 11 Geräte",
    color: "yellow",
  },
  {
    icon: "Sun",
    name: "Morgenroutine Sa-So",
    isActive: false,
    additionalInfo: "2 Räume, 8 Geräte",
    color: "orange",
  },
];
