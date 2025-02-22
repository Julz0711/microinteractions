import { motion } from "framer-motion";
import * as React from "react";
import { useState } from "react";

export function HeatComponent() {
  const [SliderValue, setSliderValue] = useState(25);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };
  return (
    <>
      <input
        type="range"
        min={0}
        max="100"
        value={SliderValue}
        className="range"
        step="25"
        onChange={handleSliderChange} // Handle slider change
      />
      <div className="range flex w-full justify-between px-2 text-xs">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
    </>
  );
}
