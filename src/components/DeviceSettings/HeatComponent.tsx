import HeatSlider from "../Slider/HeatSlider";
import styles from "./HeatComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsOn } from "../../store/reducer";
import { useEffect, useState } from "react";
import { Temperature } from "../SVGAnimations/Temperature";
import { Category } from "../../types/dashboard.types";
import { AppState } from "../../store/store";
import DynamicIcon from "../DynamicIcon";
import { twMerge } from "tailwind-merge";

interface HeatComponentProps {
  isOn: boolean;
}
export function HeatComponent({ isOn }: HeatComponentProps) {
  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState<number>(isOn ? 22 : 0.1);
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    if (value - 18 === 0) {
      dispatch(setIsOn(false));
    } else {
      dispatch(setIsOn(true));
    }
  };

  useEffect(() => {
    if (!isOn) {
      setSliderValue(0.1);
    } else {
      setSliderValue(22);
    }
  }, [isOn]);

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center w-4/5 mx-auto",
        hasMicrointeractions ? "gap-16" : "gap-2"
      )}
    >
      <div className="flex w-full flex-col items-center justify-center gap-2">
        {hasMicrointeractions ? (
          <Temperature
            category={Category.Heat}
            size={200}
            temp={sliderValue}
            styles={styles.temp}
            progressOverride={(sliderValue - 18) * 37.5}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 ">
            <DynamicIcon iconName={"Temp"} size="80" color={"text-red"} />
            <div className="text-2xl text-light font-bold w-full text-center">
              22°C
              <br />
            </div>
          </div>
        )}
      </div>

      {hasMicrointeractions ? (
        <HeatSlider
          value={4}
          measure={"°C"}
          range={8}
          onChange={(value) => {
            handleSliderChange(value + 18);
          }}
          custom={isOn ? styles.solid : styles.off + " inactive"}
          step={0.1}
        />
      ) : (
        <>
          <div className="w-full text-center flex gap-4 items-center justify-center mb-4">
            <span className="w-32 font-bold text-center text-light drop-shadow-[0_0_10px_rgba(0,0,0,.4)] opacity-80">
              Ziel: {sliderValue}°C
            </span>
          </div>
          <HeatSlider
            value={4}
            measure={"°C"}
            range={8}
            onChange={(value) => {
              handleSliderChange(value + 18);
            }}
            custom={isOn ? styles.solid : styles.off + " inactive"}
            step={0.1}
          />
        </>
      )}
    </div>
  );
}
