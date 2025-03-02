import React from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "./DynamicIcon";

interface ButtonProps {
  label: string;
  icon?: string;
  style: string;
  link?: string;
  isLarge?: boolean;
  isSmall?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label = "Button",
  icon = "",
  style = "bg-dark",
  link = "",
  isLarge = false,
  isSmall = false,
  disabled = false,
  onClick,
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={link ? () => navigate(link) : onClick}
      className={twMerge(
        "flex flex-row items-center justify-center gap-4",
        style,
        isLarge && "btn-lg",
        isSmall ? "btn-sm" : "btn-full"
      )}
      disabled={disabled}
    >
      {icon ? <DynamicIcon iconName={icon} size={"24"} /> : null}
      {label}
    </button>
  );
};

export default Button;
