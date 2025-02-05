import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "./dynamicIcon";

interface ButtonProps {
  label: string;
  hasIcon?: boolean;
  icon?: string;
  color: string;
  link: string;
}

const Button: React.FC<ButtonProps> = ({
  label = "Button",
  hasIcon = false,
  icon = null,
  color = "bg-dark",
  link = "/",
}) => {
  return (
    <Link to={link} className={twMerge("btn", color)}>
      {hasIcon && icon && <DynamicIcon iconName={icon} />}
      {label}
    </Link>
  );
};

export default Button;
