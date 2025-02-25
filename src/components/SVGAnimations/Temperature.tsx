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
  size?: number;
  temp?: number;
  styles?: string;
  progressOverride?: number;
}

export function Temperature(props: TemperatureProps) {
  const activeDevices = useActiveDevices({ thisCategory: props.category });
  const [hasActiveDevices, sethasActiveDevices] = useState(false);
  const room = useSelector((state: AppState) => state.app.room);

  useEffect(() => {
    sethasActiveDevices(activeDevices > 0);
  }, [room, activeDevices]);

  return (
    <div className={twMerge("relative w-full temperature", props.styles)}>
      <DynamicIcon
        iconName={"Temp"}
        color={twMerge(
          "absolute -top-[18%] left-1/2 -translate-x-1/2",
          props.size ? "text-red" : "text-light"
        )}
        size={props.size ? `${props.size / 2.2}px` : "40px"}
      />
      <div
        className={twMerge(
          props.size ? "text-3xl text-red" : "text-sm text-light",
          "font-bold w-full absolute top-1/2 -translate-y-1/2 mx-auto text-center flex flex-col items-center"
        )}
      >
        22°C
        <span className="text-sm text-red opacity-50">
          {props.temp ? "Ziel: " + props.temp + "°C" : ""}
        </span>
      </div>
      <svg
        width={props.size ? props.size : "80"}
        height={props.size ? props.size : "80"}
        viewBox="0 0 250 250"
        className={twMerge(
          "circular-progress mx-auto ",
          !props.progressOverride
            ? "circular-progress mx-auto circular-progress-animated"
            : "circular-progress mx-auto "
        )}
        style={
          props.progressOverride
            ? ({
                "--progress": props.progressOverride,
              } as React.CSSProperties)
            : undefined
        }
      >
        <circle
          className={twMerge("bg", props.size ? "stroke-red" : "stroke-light")}
        ></circle>
        <circle
          className={twMerge("fg", props.size ? "stroke-red" : "stroke-light")}
        ></circle>
      </svg>
    </div>
  );
}
