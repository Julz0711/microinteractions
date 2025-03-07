import { Slider } from "../Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setIsOn } from "../../store/reducer";
import { useEffect, useState } from "react";
import { AppState } from "../../store/store";
import { twMerge } from "tailwind-merge";

export function LightsComponent() {
  const dispatch = useDispatch();
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
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
      setSliderValue(75);
      setIconColor("text-light");
    }
  }, [isOn]);

  const colors = [
    "bg-[#8AB7FB]",
    "bg-[#B6D1FA]",
    "bg-[#F8F8F8]",
    "bg-[#FDCB9F]",
    "bg-[#FC983D]",
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-16 w-full mx-auto">
        <div className="grid grid-cols-[1fr_1fr] gap-8 place-items-center h-60 px-12">
          <div className="flex flex-col items-center">
            <Slider
              hasGradient={false}
              isPx={true}
              size={"250"}
              clickable={true}
              onChange={handleSliderChange}
              hasIcon={true}
              icon="Lamp"
              iconColor={"text-light"}
              value={sliderValue}
            />
            {!hasMicrointeractions && <p>Helligkeit</p>}
          </div>
          <div
            className={twMerge(
              "flex flex-col items-center"
            )}
          >
            <Slider
              hasGradient={true}
              isPx={true}
              size={"250"}
              clickable={isOn ? true : false}
              onChange={() => {}}
            />
            {!hasMicrointeractions && <p>Lichttemperatur</p>}
          </div>
        </div>
        <div className="w-full text-center flex flex-col gap-4">
          <span className="font-bold w-full">Schnellauswahl</span>
          <div className="flex flex-row gap-4 mx-auto">
            {colors.map((color, index) => (
              <div
                key={index}
                className={twMerge(
                  "w-12 h-12 bg-dark rounded-full shadow-2xl border-2 border-[#00000033]",
                  color
                )}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
