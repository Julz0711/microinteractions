import { useEffect, useState } from "react";
import { Slider } from "./Slider";

type Props = {
  step: number;
  value: number;
  measure: string;
  custom?: string;
  range?: number;
  onChange: (value: number) => void;
};

const AirSlider = (props: Props) => {
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
      <div className="w-full grow relative">
        <Slider
          className={props.custom}
          hasGradient={false}
          isHorizontal={true}
          isPx={false}
          size={"100"}
          value={sliderValue}
          range={props.range}
          clickable={true}
          onChange={handleSliderChange}
        />

{ props.step === 33.33 ? 
      <div className="flex justify-start items-center w-full absolute top-0 left-0 h-full pointer-events-none overflow-hidden gap-[calc(33%-1px)] rounded-lg">
            {Array.from(
              { length: Math.floor(100 / props.step) },
              (_, index) => (
                <div
                  key={index}
                  className="h-[51px] -translate-x-[1px] -translate-y-[3px] w-[2px] bg-green/20 "
                />
              )
            )}
          </div>
      : 
      <div className="flex justify-start items-center w-full absolute top-0 left-0 h-full pointer-events-none overflow-hidden gap-[calc(20%-2px)] rounded-lg">
      {Array.from(
        { length: Math.floor(100 / props.step) },
        (_, index) => (
          <div
            key={index}
            className="h-[51px] -translate-x-[1px] -translate-y-[3px] w-[2px] bg-green/20 "
          />
        )
      )}
    </div>}
    
</div>
      <div className="sliderValue h-12 w-20 max-w-24 flex items-center justify-center rounded-md text-dark bg-light font-bold shadow-2xl">
        {sliderValue}
        {props.measure}
      </div>
    </div>
  );
};

export default AirSlider;
