import { Category } from '../types/dashboard.types';
import { Room } from '../types/types';

export const devices = [
  {
    icon: 'Lamp',
    name: 'Leselampe',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Deckenleuchte',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Deckenleuchte 2',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Lamp',
    name: 'Deckenleuchte',
    room: Room.Kitchen,
    isActive: true,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Lights
  },
  {
    icon: 'Temp',
    name: 'Heizung Fenster',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung Fenster 2',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Heat
  },
  {
    icon: 'Temp',
    name: 'Heizung Wand',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Heat
  },
  {
    icon: 'Entertainment',
    name: 'Fernseher',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Entertainment',
    name: 'Sonos Speaker',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: false,
    additionalInfo: '100%',
    category: Category.Entertainment
  },
  {
    icon: 'Air',
    name: 'Ventilator',
    room: Room.LivingRoom,
    isActive: true,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Air
  },
  {
    icon: 'Pluh',
    name: 'Staubsauger Roboter',
    room: Room.LivingRoom,
    isActive: false,
    isFavorite: true,
    additionalInfo: '100%',
    category: Category.Household
  }
];

export const scenes = [
  {
    icon: 'Controller',
    name: 'Gaming',
    isActive: true,
    color: 'bg-green'
  },
  {
    icon: 'Laptop',
    name: 'Home Office',
    isActive: true,
    color: 'bg-yellow'
  },
  {
    icon: 'Laptop',
    name: 'TV Abend',
    isActive: false,
    color: 'bg-purple'
  },
  {
    icon: 'Moon',
    name: 'Gute Nacht',
    isActive: true,
    color: 'bg-blue'
  }
];

export const schedules = [
  {
    icon: 'Sun',
    name: 'Morgenroutine Mo-Fr',
    isActive: true,
    additionalInfo: '3 Räume, 11 Geräte',
    color: 'bg-yellow'
  },
  {
    icon: 'Sun',
    name: 'Morgenroutine Sa-So',
    isActive: true,
    additionalInfo: '2 Räume, 8 Geräte',
    color: 'bg-orange'
  }
];
