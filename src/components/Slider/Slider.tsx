import { twMerge } from "tailwind-merge";
import "./Slider.css";
import { useState } from "react";

export interface ISliderProps {
  hasGradient: boolean;
  isHorizontal?: boolean;
  size: string;
  clickable: boolean;
  defaultValue?: number;
  className?: string;
}

export function Slider(props: ISliderProps) {
  const [SliderValue, setSliderValue] = useState(props.defaultValue);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };
  return (
    <div
      className={twMerge(
        "relative",
        props.isHorizontal ? `h-20 w-${props.size}` : `w-20 h-${props.size}`
      )}
    >
      <input
        type="range"
        min={0}
        max="100"
        value={SliderValue}
        className={twMerge(
          props.className,
          props.isHorizontal
            ? "left-0 top-0 w-full"
            : `-translate-x-1/2 -translate-y-1/2 -rotate-90 left-1/2 top-1/2 w-${props.size}`,
          "border-0 shadow-2xl absolute cursor-row-resize h-20",
          props.hasGradient ? "gradient" : "solid"
        )}
        onChange={props.clickable ? handleSliderChange : undefined}
      />
    </div>
  );
}
