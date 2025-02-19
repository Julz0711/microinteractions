import DynamicIcon from "../../DynamicIcon";
import { Category } from "../../../types/dashboard.types";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import "./WaveAnimation.css";
import Rhapsody from "../../../assets/bohemian_rhapsody.jpg";
import { Temperature } from "../../SVGAnimations/Temperature";
import { useActiveDevices } from "../../../Hooks/useActiveDevices";

export interface ICategoryStatsProps {
  category: Category;
}

export function CategoryStats(props: ICategoryStatsProps) {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const activeDevices = useActiveDevices({ thisCategory: props.category });


  if(activeDevices > 0) {
    switch (props.category) {
    case Category.Lights:
      return hasMicrointeractions ? (
        <div className="p-4 bg-light rounded-full flex items-center justify-center">
          <DynamicIcon iconName={"Lamp"} color="text-yellow" />
          <span className="rounded-full bg-radial from-yellow to-transparent to-60% w-12 h-12 absolute animate-light opacity-35"></span>
        </div>
       ) : ""
      ;
    case Category.Heat:
      return hasMicrointeractions ? (
        <div className="flex items-center justify-center w-full pt-2 relative">
          <Temperature />
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <p className="text-xs text-light">Heizung: <span className="font-bold">21°C</span></p>
        </div>      );
    case Category.Entertainment:
      return hasMicrointeractions ? (
        <>
          <div className="flex gap-2 max-w-full relative">
            <img
              src={Rhapsody}
              alt="Bohemian Rhapsody"
              className="w-10 h-10 rounded-sm"
            />
            <div className="flex flex-col justify-center max-w-full overflow-x-hidden">
              <span className="text-light whitespace-nowrap text-[11px] font-bold">
                Bohemian Rhapsody
              </span>
              <span className="absolute right-0 bg-gradient-to-l from-purple to-transparent w-10 h-10"></span>
              <span className="text-light text-xs">Queen</span>
            </div>
          </div>
          <div className="flex gap-2">
            <DynamicIcon iconName={"PreviousSong"} color="text-light" />
            <DynamicIcon iconName={"Pause"} color="text-light" />
            <DynamicIcon iconName={"NextSong"} color="text-light" />
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col">
          <p className="text-xs text-light">Aktueller Song: <span className="font-bold">Bohemian Rapsody</span></p>
        </div>
      );
    case Category.Air:
      return hasMicrointeractions ? (
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
      ) : (
        <div className="w-full flex flex-col">
          <p className="text-xs text-light">Ventilator: <span className="font-bold">Mittel</span></p>
          <p className="text-xs text-light">Luftfeuchtigkeit: <span className="font-bold">60%</span></p>
        </div>

      );
    case Category.Household:
      return <span className="p-4 rounded-full"></span>;
    default:
      return <></>;
  }
} else {
  return <></>; 
}
}
