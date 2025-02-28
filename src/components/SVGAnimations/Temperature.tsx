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
  const { isOn, room } = useSelector((state: AppState) => state.app);

  useEffect(() => {
    sethasActiveDevices(activeDevices > 0);
  }, [room, activeDevices]);

  const size = props.size ? props.size : 80;

  return (
    <div className={twMerge("relative w-full temperature", props.styles)}>
      <DynamicIcon
        iconName={"Temp"}
        color={twMerge(
          "absolute -top-[18%] left-1/2 -translate-x-1/2",
          props.size ? (isOn ? "text-red" : "text-dark/50") : "text-light"
        )}
        size={props.size ? `${props.size / 2.2}` : "40"}
      />
      <div
        className={twMerge(
          isOn
            ? "text-light drop-shadow-[0_0_10px_rgba(0,0,0,.3)]"
            : props.size && "text-dark",
          props.size ? "text-2xl" : "text-sm",
          "font-bold w-full absolute top-1/2 -translate-y-1/2 mx-auto text-center flex flex-col items-center"
        )}
      >
        22°C
        <span
          className={twMerge(
            isOn ? " text-light" : "text-dark",
            "text-sm opacity-50 drop-shadow-[0_5px_15px_rgba(0,0,0,1)]",
            props.size && "h-4"
          )}
        >
          {props.temp ? "Ziel: " + Math.floor(props.temp) + "°C" : " "}
        </span>
      </div>
      <svg
        width={size}
        height={size}
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
        <defs>
          <radialGradient
            id="gradientStroke"
            cx="40%"
            cy="5%"
            r="60%"
            fx="50%"
            fy="50%"
          >
            <stop
              offset="30%"
              style={{ stopColor: "#EF8555", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#e5527f", stopOpacity: 1 }}
            />
          </radialGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={250 / 2}
          className={twMerge(
            "bg",
            props.size && isOn ? "stroke-light" : "stroke-dark"
          )}
        ></circle>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={250 / 2}
          className={twMerge(
            "fg stroke-dark",
            props.size ? "duration-300" : "stroke-light"
          )}
          style={{ stroke: isOn ? "url(#gradientStroke)" : " " }}
        ></circle>
      </svg>
    </div>
  );
}
