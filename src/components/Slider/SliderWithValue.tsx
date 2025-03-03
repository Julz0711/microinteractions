import { useEffect, useState } from "react";
import { Slider } from "./Slider";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import "./Slider.css";

type Props = {
  step: number;
  value: number;
  measure: string;
  hasExtraMeasurements?: number;
  custom?: string;
  onChange: (value: number) => void;
};

const SliderWithValue = (props: Props) => {
  const [sliderValue, setSliderValue] = useState<number>(Number(props.value));
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  useEffect(() => {
    setSliderValue(Number(props.value));
  }, [props.value]);

  const handleSliderChange = (newValue: number) => {
    setSliderValue(
      Math.round(newValue / props.step + (props.hasExtraMeasurements ?? 0))
    );
    props.onChange(
      Math.round(newValue / props.step + (props.hasExtraMeasurements ?? 0))
    );
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
          step={props.step}
          clickable={true}
          onChange={handleSliderChange}
        />
        {hasMicrointeractions && (
          <div
            className="flex justify-start items-center w-full absolute top-0 left-0 h-full pointer-events-none overflow-hidden rounded-lg"
            style={{ gap: "calc(" + props.step + "% -  1px" }}
          >
            {Array.from(
              { length: Math.floor(100 / props.step) },
              (_, index) => (
                <div
                  key={index}
                  className="h-[51px]  -translate-x-[1px] -translate-y-1 w-[1px] bg-dark/20 "
                />
              )
            )}
          </div>
        )}
      </div>
      <div className="sliderValue h-12 w-20 max-w-24 flex items-center justify-center rounded-md text-dark bg-light font-bold shadow-2xl">
        {sliderValue}
        {props.measure}
      </div>
    </div>
  );
};

export default SliderWithValue;
