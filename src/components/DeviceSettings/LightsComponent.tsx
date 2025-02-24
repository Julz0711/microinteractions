import { Slider } from "../Slider/Slider";
import { useDispatch } from "react-redux";
import { setIsOn } from "../../store/reducer";

export function LightsComponent() {
  const dispatch = useDispatch();

  const handleSliderChange = (value: number) => {
    if (value === 0) {
      dispatch(setIsOn(false));
    } else {
      dispatch(setIsOn(true));
    }
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_1fr] gap-8 place-items-center h-80 px-12">
        <Slider
          hasGradient={false}
          size={"350"}
          clickable={true}
          onChange={handleSliderChange}
        />
        <Slider
          hasGradient={true}
          size={"350"}
          clickable={true}
          onChange={() => {}}
        />
      </div>
    </>
  );
}
