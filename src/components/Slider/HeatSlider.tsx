import { useEffect, useState } from "react";
import { Slider } from "./Slider";

type Props = {
  step: number;
  value: number;
  measure: string;
  custom?: string;
  range?: 8;
  onChange: (value: number) => void;
};

const HeatSlider = (props: Props) => {
  const [sliderValue, setSliderValue] = useState<number>(Number(props.value));

  useEffect(() => {
    setSliderValue(Number(props.value));
  }, [props.value]);

  const handleSliderChange = (newValue: number) => {
    setSliderValue(Math.round(newValue));
    props.onChange(Math.round(newValue));
  };

  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full grow">
        <Slider
          className={props.custom}
          hasGradient={false}
          isHorizontal={true}
          isPx={false}
          size={"100"}
          range={props.range}
          step={props.step}
          clickable={true}
          onChange={handleSliderChange}
        />
      </div>
      <div className="sliderValue h-12 w-20 max-w-24 flex items-center justify-center rounded-md text-dark bg-light font-bold shadow-2xl">
        {sliderValue + 18}
        {props.measure}
      </div>
    </div>
  );
};

export default HeatSlider;
