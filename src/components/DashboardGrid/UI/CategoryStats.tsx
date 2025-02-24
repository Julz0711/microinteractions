import DynamicIcon from "../../DynamicIcon";
import { Category } from "../../../types/dashboard.types";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import "./WaveAnimation.css";
import Rhapsody from "../../../assets/bohemian_rhapsody.jpg";
import { Temperature } from "../../SVGAnimations/Temperature";
import { useActiveDevices } from "../../../Hooks/useActiveDevices";
import { useEffect, useState } from "react";

export interface ICategoryStatsProps {
  category: Category;
}

export function CategoryStats(props: ICategoryStatsProps) {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const activeDevices = useActiveDevices({ thisCategory: props.category });
  const [hasActiveDevices, sethasActiveDevices] = useState(activeDevices > 0);

  useEffect(() => {
    sethasActiveDevices(activeDevices > 0);
  }, [activeDevices]);

  switch (props.category) {
    case Category.Lights:
      return hasMicrointeractions ? (
        <div
          className={twMerge(
            "p-4 rounded-full flex items-center justify-center",
            hasActiveDevices ? "bg-light" : "bg-dark"
          )}
        >
          <DynamicIcon
            iconName={"Lamp"}
            color={hasActiveDevices ? "text-yellow" : "text-light"}
          />
          <span
            className={twMerge(
              "rounded-full bg-radial to-transparent to-60% w-12 h-12 absolute animate-light opacity-35",
              hasActiveDevices ? "from-yellow" : "from-transparent"
            )}
          ></span>
        </div>
      ) : (
        ""
      );
    case Category.Heat:
      return hasMicrointeractions ? (
        <>
          {hasActiveDevices ? (
            <div className="flex items-center justify-center w-full pt-2 relative">
              <Temperature category={Category.Entertainment} />
            </div>
          ) : (
            <div
              className={twMerge(
                "p-4 rounded-full flex items-center justify-center bg-dark"
              )}
            >
              <DynamicIcon iconName={"Controller"} color="text-light" />
            </div>
          )}
        </>
      ) : (
        <div className="w-full flex flex-col">
          <p
            className={twMerge(
              "text-xs",
              hasActiveDevices ? "text-light" : "text-uwu"
            )}
          >
            Heizung: <span className="font-bold">21°C</span>
          </p>
        </div>
      );
    case Category.Entertainment:
      return hasMicrointeractions ? (
        <>
          {hasActiveDevices ? (
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
            <div
              className={twMerge(
                "p-4 rounded-full flex items-center justify-center bg-dark"
              )}
            >
              <DynamicIcon iconName={"Controller"} color="text-light" />
            </div>
          )}
        </>
      ) : (
        <div className="w-full flex flex-col">
          <p
            className={twMerge(
              "text-xs",
              hasActiveDevices ? "text-light" : "text-uwu"
            )}
          >
            Aktueller Song: <span className="font-bold">Bohemian Rapsody</span>
          </p>
        </div>
      );
    case Category.Air:
      return hasMicrointeractions ? (
        <div className="flex gap-2 justify-center items-center">
          {hasActiveDevices ? (
            <>
              <div className="flex gap-1 flex-col items-center">
                <DynamicIcon
                  iconName={"Fan"}
                  color={twMerge("text-light", "animate-fan text-light")}
                />
                <div className="flex gap-1">
                  <span
                    className={twMerge("w-1 h-1 rounded-full", "bg-light")}
                  ></span>
                  <span
                    className={twMerge("w-1 h-1 rounded-full", "bg-light")}
                  ></span>
                  <span
                    className={twMerge("w-1 h-1 rounded-full", " bg-[#167565]")}
                  ></span>
                </div>
              </div>
              <div className="relative">
                <div
                  className={twMerge(
                    " w-10 h-10 flex flex-col rounded-full overflow-hidden relative bg-green"
                  )}
                >
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
                  <div
                    className={twMerge(
                      "font-bold text-center mt-4 text-xs z-10 text-green"
                    )}
                  >
                    60%
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              className={twMerge(
                "p-4 rounded-full flex items-center justify-center bg-dark"
              )}
            >
              <DynamicIcon iconName={"Air"} color="text-light" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <p
            className={twMerge(
              "text-xs",
              hasActiveDevices ? "text-light" : "text-uwu"
            )}
          >
            Ventilator: <span className="font-bold">Mittel</span>
          </p>
          <p
            className={twMerge(
              "text-xs",
              hasActiveDevices ? "text-light" : "text-uwu"
            )}
          >
            Luftfeuchtigkeit: <span className="font-bold">60%</span>
          </p>
        </div>
      );
    case Category.Household:
      return (
        <span className="p-1 rounded-full">
          <>
            {hasMicrointeractions ? (
              <div
                className={twMerge(
                  "p-2 rounded-full flex items-center justify-center",
                  hasActiveDevices ? "bg-light" : "bg-dark"
                )}
              >
                <DynamicIcon
                  iconName={"Pluh"}
                  color={hasActiveDevices ? "text-green" : "text-light"}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        </span>
      );
    default:
      return <></>;
  }
}
