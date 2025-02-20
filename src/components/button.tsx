import React from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "./DynamicIcon";

interface ButtonProps {
  label: string;
  icon?: string;
  style: string;
  link: string;
  isLarge?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label = "Button",
  icon = "",
  style = "bg-dark",
  link = "/",
  isLarge = false,
  disabled = false,
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(link)}
      className={twMerge(
        "btn-full flex flex-row items-center justify-center gap-4",
        style,
        isLarge ? "btn-lg" : ""
      )}
      disabled={disabled}
    >
      {icon ? <DynamicIcon iconName={icon} size={"24"} /> : null}
      {label}
    </button>
  );
};

export default Button;
