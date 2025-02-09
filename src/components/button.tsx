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
}

const Button: React.FC<ButtonProps> = ({
  label = "Button",
  hasIcon = false,
  icon = null,
  color = "bg-dark",
  link = "/",
}) => {
  return (
    <Link to={link} className={twMerge("btn btn-neutral", color)}>
      {hasIcon && icon && <DynamicIcon iconName={"bluetooth"} />}
      {label}
    </Link>
  );
};

export default Button;
