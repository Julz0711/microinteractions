import SliderWithValue from "../Slider/SliderWithValue";
import styles from "./HeatComponent.module.css";
import { useDispatch } from "react-redux";
import { setIsOn } from "../../store/reducer";
import { useEffect, useState } from "react";
import { Temperature } from "../SVGAnimations/Temperature";
import { Category } from "../../types/dashboard.types";

interface HeatComponentProps {
  isOn: boolean;
}
export function HeatComponent({ isOn }: HeatComponentProps) {
  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState(22);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  useEffect(() => {
    dispatch(setIsOn(isOn));
  }, [isOn, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center gap-16 w-4/5 mx-auto">
      <div className="relative w-full">
        <Temperature
          category={Category.Heat}
          size={200}
          temp={sliderValue}
          styles={styles.temp}
        />
      </div>
      <SliderWithValue
        step={12.5}
        value={22}
        measure={"°C"}
        hasExtraMeasurements={18}
        onChange={handleSliderChange}
        custom={isOn ? styles.solid : styles.off}
      />
    </div>
  );
}
