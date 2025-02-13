import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "./DynamicIcon";

interface ButtonProps {
  label: string;
  hasIcon?: boolean;
  icon?: string;
  color: string;
  link: string;
  isLarge?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label = "Button",
  hasIcon = false,
  icon = null,
  color = "bg-dark",
  link = "/",
  isLarge = false,
}) => {
  return (
    <Link
      to={link}
      className={twMerge("btn btn-neutral", color, isLarge ? "btn-lg" : "")}
    >
      {hasIcon && icon && <DynamicIcon iconName={"Bluetooth"} />}
      {label}
    </Link>
  );
};

export default Button;
