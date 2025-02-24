import { useState, useEffect } from "react";
import { useActiveDevices } from "../../Hooks/DeviceGrid/useActiveDevices";
import DynamicIcon from "../DynamicIcon";
import "./CategoryStats.css";
import { Category } from "../../types/dashboard.types";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";

export interface TemperatureProps {
  category: Category;
}
export function Temperature(props: TemperatureProps) {
  const activeDevices = useActiveDevices({ thisCategory: props.category });
  const [hasActiveDevices, sethasActiveDevices] = useState(false);
  const room = useSelector((state: AppState) => state.app.room);

  useEffect(() => {
    sethasActiveDevices(activeDevices > 0);
  }, [room, activeDevices]);

  return (
    <>
      <DynamicIcon
        iconName={"Temp"}
        color={twMerge("absolute -top-2 text-light")}
        size="35px"
      />
      <span className={twMerge("text-sm font-bold absolute text-light")}>
        22°C
      </span>
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        className="circular-progress"
      >
        <circle className={twMerge("bg")}></circle>
        <circle className={twMerge("fg")}></circle>
      </svg>
    </>
  );
}
