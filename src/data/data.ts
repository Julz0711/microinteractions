import { Category } from '../types/dashboard.types';
import { Room } from '../types/types';

export const devices = [
  // Living Room
  {
    icon: 'Lamp',
    name: 'Leselampe',
    model: 'Lamp M200',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Tischlampe',
    model: 'Lamp S700',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Deckenlampe',
    model: 'Lamp L500',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Deckenlampe 2',
    model: 'Lamp L500',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Temp',
    name: 'Heizung Fenster',
    model: 'Heater Pro',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: '21°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung Wand',
    model: 'Heater Pro',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '21°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Smart Heater',
    model: 'Heater Pro S',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '21°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Smart Heater',
    model: 'Heater Pro M',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '22°',
    category: Category.Heat
  },
  {
    icon: 'Entertainment',
    name: 'Fernseher',
    model: 'TV Ultra',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S300',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'Homepod',
    model: 'Speaker S200',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'Homepod',
    model: 'Speaker S100',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Air',
    name: 'Ventilator',
    model: 'Fresh Air Pro',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Air
  },
  {
    icon: 'Air',
    name: 'Luftentfeuchter',
    model: 'Air Pro',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'Auto',
    category: Category.Air
  },
  {
    icon: 'Air',
    name: 'Luftentfeuchter',
    model: 'Air Fresh',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'Auto',
    category: Category.Air
  },
  {
    icon: 'Air',
    name: 'Luftentfeuchter',
    model: 'Fresh Plus',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: false,
    additionalInfo: 'Auto',
    category: Category.Air
  },
  {
    icon: 'Pluh',
    name: 'Staubsauger Roboter',
    model: 'Roomber',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: true,
    additionalInfo: 'Route 41%',
    category: Category.Household
  },
  {
    icon: 'Pluh',
    name: 'Staubsauger Roboter',
    model: 'Roomber',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: true,
    additionalInfo: 'Route 35%',
    category: Category.Household
  },
  {
    icon: 'Pluh',
    name: 'Staubsauger Roboter',
    model: 'Roomber',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: true,
    additionalInfo: 'Route 41%',
    category: Category.Household
  },
  {
    icon: 'Pluh',
    name: 'Staubsauger Roboter',
    model: 'Roomber',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: true,
    additionalInfo: 'Route 21%',
    category: Category.Household
  },
  // Kitchen
  {
    icon: 'Lamp',
    name: 'Deckenleuchte',
    model: 'Lamp L400',
    room: Room.Kitchen,
    isActive: true,
    isFavorite: false,
    additionalInfo: '70%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Licht Spüle',
    model: 'Lamp S50',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Licht Spüle',
    model: 'Lamp S50',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: false,
    additionalInfo: '50%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Licht Spüle',
    model: 'Lamp S50',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: false,
    additionalInfo: '70%',
    category: Category.Lights
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S500 Max',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S550',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S400 Max',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S300 Max',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Temp',
    name: 'Heizung Fenster',
    model: 'Heater Pro',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: false,
    additionalInfo: '22°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung 2',
    model: 'Heater Pro',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: false,
    additionalInfo: '22°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung 3',
    model: 'Heater Pro',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: false,
    additionalInfo: '22°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung 4',
    model: 'Heater Pro',
    room: Room.Kitchen,
    isActive: false,
    isFavorite: false,
    additionalInfo: '22°',
    category: Category.Heat
  },
  {
    icon: 'Pluh',
    name: 'Kühlschrank',
    model: 'Smart Fridge SF800',
    room: Room.Kitchen,
    isActive: true,
    isFavorite: true,
    additionalInfo: 'Eco',
    category: Category.Household
  },
  {
    icon: 'Pluh',
    name: 'Kühlschrank',
    model: 'Smart Fridge SF4800',
    room: Room.Kitchen,
    isActive: true,
    isFavorite: true,
    additionalInfo: 'Eco',
    category: Category.Household
  },
  {
    icon: 'Pluh',
    name: 'Kühlschrank',
    model: 'Smart Fridge SF500',
    room: Room.Kitchen,
    isActive: true,
    isFavorite: true,
    additionalInfo: 'Eco',
    category: Category.Household
  },
  {
    icon: 'Pluh',
    name: 'Kühlschrank',
    model: 'Smart Fridge SW800',
    room: Room.Kitchen,
    isActive: true,
    isFavorite: true,
    additionalInfo: 'Eco',
    category: Category.Household
  },
  // Bedroom
  {
    icon: 'Lamp',
    name: 'Deckenleuchte',
    model: 'Lamp M400',
    room: Room.Bedroom,
    isActive: true,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Nachttischlampe',
    model: 'Lamp S100',
    room: Room.Bedroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '40%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Nachttischlampe',
    model: 'Lamp M100',
    room: Room.Bedroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '70%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Nachttischlampe',
    model: 'Lamp S400',
    room: Room.Bedroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '40%',
    category: Category.Lights
  },
  {
    icon: 'Temp',
    name: 'Thermostat',
    model: 'Thermo T20',
    room: Room.Bedroom,
    isActive: true,
    isFavorite: true,
    additionalInfo: 'Auto',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung Wand',
    model: 'Heater Pro',
    room: Room.Bedroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '21°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung Wand',
    model: 'Heater Pro 200',
    room: Room.Bedroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '21°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung Wand',
    model: 'Heater Pro 400',
    room: Room.Bedroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '21°',
    category: Category.Heat
  },
  {
    icon: 'Air',
    name: 'Klimaanlage',
    model: 'A/C Pro',
    room: Room.Bedroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'Auto',
    category: Category.Air
  },
  {
    icon: 'Air',
    name: 'Klimaanlage',
    model: 'A/C Pro XL',
    room: Room.Bedroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'Auto',
    category: Category.Air
  },
  {
    icon: 'Air',
    name: 'Klimaanlage',
    model: 'A/C Pro Max',
    room: Room.Bedroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'Auto',
    category: Category.Air
  },
  {
    icon: 'Air',
    name: 'Klimaanlage',
    model: 'A/C Pro 2000',
    room: Room.Bedroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'Auto',
    category: Category.Air
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S500',
    room: Room.Bedroom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S600',
    room: Room.Bedroom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S400',
    room: Room.Bedroom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S300',
    room: Room.Bedroom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  /* Badezimmer */
  {
    icon: 'Lamp',
    name: 'Deckenleuchte',
    model: 'Lamp M400',
    room: Room.Bathroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Spiegellampe',
    model: 'Lamp M200',
    room: Room.Bathroom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Spiegellampe',
    model: 'Lamp M400',
    room: Room.Bathroom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Spiegellampe',
    model: 'Lamp S200',
    room: Room.Bathroom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S500',
    room: Room.Bathroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '80%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S150',
    room: Room.Bathroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '80%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker S200',
    room: Room.Bathroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '80%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'BT Lautsprecher',
    model: 'Speaker M500',
    room: Room.Bathroom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '80%',
    category: Category.Entertainment
  },
  {
    icon: 'Air',
    name: 'Luftentfeuchter',
    model: 'Air Pro',
    room: Room.Bathroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '50%',
    category: Category.Air
  },
  {
    icon: 'Air',
    name: 'Luftentfeuchter',
    model: 'Air Pro',
    room: Room.Bathroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '50%',
    category: Category.Air
  },
  {
    icon: 'Air',
    name: 'Luftentfeuchter',
    model: 'Air Pro Max',
    room: Room.Bathroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '50%',
    category: Category.Air
  },
  {
    icon: 'Temp',
    name: 'Heizung',
    model: 'Heater Pro',
    room: Room.Bathroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '23°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung',
    model: 'Heater Pro',
    room: Room.Bathroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '23°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung',
    model: 'Heater Pro',
    room: Room.Bathroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '23°',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung',
    model: 'Heater Pro',
    room: Room.Bathroom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '23°',
    category: Category.Heat
  },
  /* Flur */
  {
    icon: 'Lamp',
    name: 'Deckenleuchte',
    model: 'Lamp S400',
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: '80%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Deckenleuchte',
    model: 'Lamp S400',
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: '80%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Deckenleuchte',
    model: 'Lamp S400',
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: '80%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Deckenleuchte',
    model: 'Lamp S400',
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: '80%',
    category: Category.Lights
  },
  {
    icon: 'Temp',
    name: 'Thermostat',
    model: 'Thermo T20',
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'Auto',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Thermostat',
    model: 'Thermo S20',
    room: Room.Hallway,
    isActive: false,
    isFavorite: false,
    additionalInfo: 'Auto',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Thermostat',
    model: 'Thermo T40',
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'Auto',
    category: Category.Heat
  },
  {
    icon: 'Pluh',
    name: 'Sicherheitssystem',
    model: 'Securo S350',
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'An',
    category: Category.Household
  },
  {
    icon: 'Pluh',
    name: 'Sicherheitssystem',
    model: 'Securo S350',
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'An',
    category: Category.Household
  },
  {
    icon: 'Pluh',
    name: 'Sicherheitssystem',
    model: 'Securo S350',
    room: Room.Hallway,
    isActive: true,
    isFavorite: false,
    additionalInfo: 'An',
    category: Category.Household
  }
];

export const scenes = [
  {
    icon: 'Controller',
    name: 'Gaming',
    isActive: true,
    color: 'green'
  },
  {
    icon: 'Laptop',
    name: 'Home Office',
    isActive: false,
    color: 'yellow'
  },
  {
    icon: 'Laptop',
    name: 'TV Abend',
    isActive: false,
    color: 'purple'
  },
  {
    icon: 'Moon',
    name: 'Gute Nacht',
    isActive: false,
    color: 'blue'
  }
];

export const schedules = [
  {
    icon: 'Sun',
    name: 'Morgen Mo-Fr',
    isActive: true,
    additionalInfo: '3 Räume, 11 Geräte',
    color: 'yellow'
  },
  {
    icon: 'Sun',
    name: 'Morgen Sa-So',
    isActive: false,
    additionalInfo: '2 Räume, 8 Geräte',
    color: 'orange'
  },
  {
    icon: 'Moon',
    name: 'Abend',
    isActive: false,
    additionalInfo: '3 Räume, 14 Geräte',
    color: 'blue'
  }
];
