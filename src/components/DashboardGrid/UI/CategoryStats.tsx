import DynamicIcon from "../../DynamicIcon";
import { Category } from "../../../types/dashboard.types";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import "./WaveAnimation.css";
import "./CategoryStats.css";

export interface ICategoryStatsProps {
  category: Category;
}

export function CategoryStats(props: ICategoryStatsProps) {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  switch (props.category) {
    case Category.Lights:
      return (
        <span className="p-4 bg-light rounded-full">
          <DynamicIcon iconName={"Lamp"} color="text-yellow" />
        </span>
      );
    case Category.Heat:
      return hasMicrointeractions ? (
        <div className="flex items-center justify-center w-full pt-2 relative">
          <DynamicIcon
            iconName={"Temp"}
            color="text-light absolute -top-2"
            size="35px"
          />
          <span className="text-light text-sm font-bold absolute">22°C</span>
          <svg
            width="80"
            height="80"
            viewBox="0 0 250 250"
            className="circular-progress"
          >
            <circle className="bg"></circle>
            <circle className="fg"></circle>
          </svg>
        </div>
      ) : (
        <DynamicIcon iconName={"Thermometer"} color="text-red" />
      );
    case Category.Entertainment:
      return (
        <div className="flex gap-2">
          <DynamicIcon iconName={"PreviousSong"} color="text-light" />
          <DynamicIcon iconName={"Pause"} color="text-light" />
          <DynamicIcon iconName={"NextSong"} color="text-light" />
        </div>
      );
    case Category.Air:
      return (
        <div className="flex gap-2 justify-center items-center">
          <div className="flex gap-1 flex-col items-center">
            <DynamicIcon
              iconName={"Fan"}
              color={twMerge(
                "text-light",
                hasMicrointeractions ? "animate-fan" : ""
              )}
            />
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-light"></span>
              <span className="w-1 h-1 rounded-full bg-light"></span>
              <span className="w-1 h-1 rounded-full bg-[#167565]"></span>
            </div>
          </div>
          <div className="relative">
            <div className=" w-10 h-10 flex flex-col bg-[#167565] rounded-full overflow-hidden relative">
              <div
                className={twMerge(
                  " bg-[url(/public/Wave.svg)] bg-repeat-x top-2 opacity-100 w-10 h-10 absolute ",
                  hasMicrointeractions ? "waveAnimation" : ""
                )}
              ></div>
              <div
                className={twMerge(
                  " bg-[url(/public/Wave.svg)] bg-repeat-x top-[5px] opacity-40 w-10 h-10 absolute ",
                  hasMicrointeractions ? "waveAnimation2" : ""
                )}
              ></div>
              <div className="font-bold text-[#167565] text-center mt-4 text-xs z-10">
                60%
              </div>
            </div>
          </div>
        </div>
      );
    case Category.Household:
      return <span className="p-4 rounded-full"></span>;
    default:
      return <></>;
  }
}
