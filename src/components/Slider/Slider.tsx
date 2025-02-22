import { twMerge } from "tailwind-merge";
import "./Slider.css";
import { useState } from "react";

export interface ISliderProps {
  hasGradient: boolean;
}

export function Slider(props: ISliderProps) {
  const [SliderValue, setSliderValue] = useState(25);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };
  return (
    <div className="relative h-20 w-20">
      <input
        type="range"
        min={0}
        max="100"
        value={SliderValue}
        className={twMerge(
          "border-0 shadow-2xl w-60 left-1/2 top-1/2 absolute cursor-row-resize",
          props.hasGradient ? "gradient" : "solid"
        )}
        onChange={handleSliderChange}
      />
    </div>
  );
}
