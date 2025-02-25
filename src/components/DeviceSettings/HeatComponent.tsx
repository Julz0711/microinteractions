import HeatSlider from "../Slider/HeatSlider";
import styles from "./HeatComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsOn } from "../../store/reducer";
import { useEffect, useState } from "react";
import { Temperature } from "../SVGAnimations/Temperature";
import { Category } from "../../types/dashboard.types";
import { AppState } from "../../store/store";

interface HeatComponentProps {
  isOn: boolean;
}
export function HeatComponent({ isOn }: HeatComponentProps) {
  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState(22);
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  useEffect(() => {
    dispatch(setIsOn(isOn));
  }, [isOn, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center gap-16 w-4/5 mx-auto">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        {hasMicrointeractions ? (
          <Temperature
            category={Category.Heat}
            size={200}
            temp={sliderValue}
            styles={styles.temp}
            progressOverride={(sliderValue - 18) * 15}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 ">
            <div className="text-3xl text-red font-bold w-full">22°C</div>
          </div>
        )}
      </div>
      <HeatSlider
        value={22}
        measure={"°C"}
        hasExtraMeasurements={18}
        onChange={handleSliderChange}
        custom={isOn ? styles.solid : styles.off}
        step={0.2}
      />
    </div>
  );
}
