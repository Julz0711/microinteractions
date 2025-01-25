import React from "react";
import * as FaIcons6 from "react-icons/fa6";
import * as FaIcons from "react-icons/fa";

type IconLibrary = Record<string, React.ElementType>;

interface DynamicIconProps {
  iconName: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName }) => {
  const IconComponent =
    (FaIcons as IconLibrary)[iconName] || (FaIcons6 as IconLibrary)[iconName];

  return IconComponent ? <IconComponent /> : <span>X</span>;
};

export default DynamicIcon;
