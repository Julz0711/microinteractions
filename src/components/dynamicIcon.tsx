import React from "react";
import * as FaIcons6 from "react-icons/fa6";
import * as FaIcons from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type IconLibrary = Record<string, React.ElementType>;

interface DynamicIconProps {
  iconName: string;
  size?: string;
  color?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, size, color }) => {
  const IconComponent =
    (FaIcons as IconLibrary)[iconName] || (FaIcons6 as IconLibrary)[iconName];

  return IconComponent ? (
    <IconComponent className={twMerge(size, color)} />
  ) : (
    <span>X</span>
  );
};

export default DynamicIcon;
