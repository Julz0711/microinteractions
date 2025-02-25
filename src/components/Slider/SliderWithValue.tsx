import { useEffect, useState } from "react";
import { Slider } from "./Slider";

type Props = {
  step: number;
  value: number;
  measure: string;
  custom?: string;
  onChange: (value: number) => void;
};

const SliderWithValue = (props: Props) => {
  const [sliderValue, setSliderValue] = useState<number>(Number(props.value));

  useEffect(() => {
    setSliderValue(Number(props.value));
  }, [props.value]);

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue / props.step);
    props.onChange(newValue / props.step);
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
          step={props.step}
          clickable={true}
          onChange={handleSliderChange}
        />
      </div>
      <div className="h-12 w-20 max-w-24 flex items-center justify-center rounded-md bg-light font-bold shadow-2xl">
        {sliderValue} {props.measure}
      </div>
    </div>
  );
};

export default SliderWithValue;
