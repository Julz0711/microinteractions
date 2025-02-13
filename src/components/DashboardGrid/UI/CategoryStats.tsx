import DynamicIcon from "../../DynamicIcon";
import { Category } from "../../../types/dashboard.types";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import "./WaveAnimation.css";

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
      return (
        <span className="p-4 bg-light rounded-full">
          <DynamicIcon iconName={"Thermometer"} color="text-red" />
        </span>
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
        <div className="flex gap-4 justify-center items-center">
          <div className="relative">
            <DynamicIcon
              iconName={"Fan"}
              color={twMerge(
                "text-light",
                hasMicrointeractions ? "animate-spin" : ""
              )}
            />
            <div className="font-bold text-light text-center mt-2 text-xs">
              ...
            </div>
          </div>
          <div className="relative">
            <div className="w-7 h-7 flex flex-col bg-[#167565] rounded-full overflow-hidden relative">
              <div
                className={twMerge(
                  " bg-[url(/public/Wave.svg)] bg-repeat-x top-2 opacity-100 w-8 h-8 absolute ",
                  hasMicrointeractions ? "waveAnimation" : ""
                )}
              ></div>
              <div
                className={twMerge(
                  " bg-[url(/public/Wave.svg)] bg-repeat-x top-[5px] opacity-40 w-8 h-8 absolute ",
                  hasMicrointeractions ? "waveAnimation2" : ""
                )}
              ></div>
            </div>
            <div className="font-bold text-light text-center mt-2 text-xs">
              50%
            </div>
          </div>
        </div>
      );
    case Category.Household:
      return (
        <span className="p-4 bg-light rounded-full">
          <DynamicIcon iconName={"Gas"} color="text-blue" />
        </span>
      );
    default:
      return <></>;
  }
}
