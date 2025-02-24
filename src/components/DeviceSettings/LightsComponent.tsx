import { Slider } from "../Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setIsOn } from "../../store/reducer";
import { useEffect, useState } from "react";
import { AppState } from "../../store/store";

export function LightsComponent() {
  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState(75);
  const [iconColor, setIconColor] = useState("text-light");
  const isOn = useSelector((state: AppState) => state.app.isOn);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    if (value === 0) {
      dispatch(setIsOn(false));
      setIconColor("text-uwu");
    } else {
      dispatch(setIsOn(true));
      setIconColor("text-light");
    }
  };

  useEffect(() => {
    if (!isOn) {
      setSliderValue(0);
      setIconColor("text-uwu");
    } else {
      setSliderValue(10);
      setIconColor("text-light");
    }
  }, [isOn]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-16 w-full mx-auto">
        <div className="grid grid-cols-[1fr_1fr] gap-8 place-items-center h-80 px-12">
          <Slider
            hasGradient={false}
            isPx={true}
            size={"250"}
            clickable={true}
            onChange={handleSliderChange}
            hasIcon={true}
            icon="Lamp"
            iconColor={iconColor}
            value={sliderValue}
          />
          <Slider
            hasGradient={true}
            isPx={true}
            size={"250"}
            clickable={true}
            onChange={() => {}}
          />
        </div>
        <div>
          <span className="font-bold">Schnellauswahl</span>
        </div>
      </div>
    </>
  );
}
