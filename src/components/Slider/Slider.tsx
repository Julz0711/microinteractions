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
  onChange: (value: number) => void;
}

export function Slider(props: ISliderProps) {
  const [SliderValue, setSliderValue] = useState(props.defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(Number(event.target.value));
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
        max={100}
        value={SliderValue}
        className={twMerge(
          props.className,
          props.isHorizontal
            ? "left-0 top-0 w-full cursor-default"
            : `-translate-x-1/2 -translate-y-1/2 cursor-row-resize -rotate-90 left-1/2 top-1/2 w-${props.size}`,
          "border-0 shadow-2xl absolute h-20",
          props.hasGradient ? "gradient" : "solid"
        )}
        onChange={props.clickable ? handleChange : undefined}
      />
    </div>
  );
}
