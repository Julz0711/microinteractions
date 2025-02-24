import { twMerge } from "tailwind-merge";
import "./Slider.css";
import { useState } from "react";
import DynamicIcon from "../DynamicIcon";

export interface ISliderProps {
  hasGradient: boolean;
  isHorizontal?: boolean;
  size: string;
  clickable: boolean;
  value?: number;
  className?: string;
  isPx?: boolean;
  step?: number;
  hasIcon?: boolean;
  icon?: string;
  iconColor?: string;
  onChange: (value: number) => void;
}

export function Slider(props: ISliderProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(Number(event.target.value));
  };
  return (
    <div
      className={twMerge("relative w-20")}
      style={
        props.isHorizontal
          ? props.isPx
            ? { width: `${props.size}px` }
            : { width: `${props.size}%` }
          : props.isPx
          ? { height: `${props.size}px` }
          : { height: `${props.size}%` }
      }
    >
      <input
        type="range"
        step={props.step}
        min={0}
        max={100}
        value={props.value}
        className={twMerge(
          props.className,
          props.isHorizontal
            ? "left-0 top-0 w-full cursor-default"
            : `absolute -translate-x-1/2 -translate-y-1/2 cursor-row-resize -rotate-90 left-1/2 top-1/2`,
          "border-0 shadow-2xl h-20",
          props.hasGradient ? "gradient" : "solid"
        )}
        style={
          props.isPx
            ? { width: `${props.size}px`, height: "80px" }
            : { width: `${props.size}%`, height: "48px" }
        }
        onChange={props.clickable ? handleChange : undefined}
      />
      {props.hasIcon && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4">
          <DynamicIcon
            iconName={props.icon || ""}
            size={"32"}
            color={props.iconColor}
          />
        </div>
      )}
    </div>
  );
}
