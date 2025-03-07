import React from "react";
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
import Lottie from "react-lottie";

import bulbAnim from "../../../assets/lottie/BulbOn.json";
import { AnimatePresence, motion } from "framer-motion";

export interface ICategoryStatsProps {
  category: Category;
  devices: number;
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

  const variants = {
    enter: () => ({
      scale: 0,
      opacity: 0,
    }),
    center: { scale: 1, opacity: 1 },
    exit: () => ({
      scale: 0,
      opacity: 0,
    }),
  };

  switch (props.category) {
    case Category.Lights:
      return hasMicrointeractions ? (
        <AnimatePresence>
          <motion.div
            variants={hasMicrointeractions ? variants : undefined}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full flex flex-col items-center justify-center"
          >
            {hasActiveDevices ? (
              <div
                className={twMerge(
                  "p-4 w-14 rounded-full flex items-center justify-center",
                  hasActiveDevices
                    ? "bg-light"
                    : props.devices > 0
                    ? "bg-light"
                    : "bg-uwu"
                )}
              >
                <DynamicIcon iconName={"Lamp"} color={"text-yellow"} />
                <span
                  className={twMerge(
                    "rounded-full bg-radial to-transparent to-60% w-12 h-12 absolute animate-light opacity-35",
                    hasActiveDevices ? "from-yellow" : "from-transparent"
                  )}
                />
              </div>
            ) : (
              <div
                className={twMerge(
                  "p-4 w-14 rounded-full flex items-center justify-center",
                  hasActiveDevices
                    ? "bg-dark"
                    : props.devices > 0
                    ? "bg-dark"
                    : "bg-uwu"
                )}
              >
                <DynamicIcon iconName={"Lamp"} color={"text-white"} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div
          className={twMerge(
            "p-4 rounded-full flex items-center justify-center",
            hasActiveDevices ? "bg-light" : "bg-dark"
          )}
        >
          <DynamicIcon
            iconName={"Lamp"}
            color={hasActiveDevices ? "text-yellow" : "text-white"}
          />
        </div>
      );
    case Category.Heat:
      return hasMicrointeractions ? (
        <>
          {hasActiveDevices ? (
            <div className="flex items-center justify-center w-full pt-2 relative">
              <Temperature category={Category.Heat} isDashboard={true} />
            </div>
          ) : (
            <>
              {props.devices > 0 ? (
                <div
                  className={twMerge(
                    "text-xs flex justify-center flex-col items-center gap-2 text-dark"
                  )}
                >
                  <DynamicIcon iconName={"Temp"} color="text-dark" size="40" />
                  <span className="font-bold text-sm">21°C</span>
                </div>
              ) : (
                <span className="text-uwu text-xs font-bold text-center">
                  Keine Geräte registriert
                </span>
              )}
            </>
          )}
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          {hasActiveDevices ? (
            <div
              className={twMerge(
                "text-xs flex justify-center flex-col items-center gap-2 text-light"
              )}
            >
              <DynamicIcon iconName={"Temp"} color="text-light" size="40" />
              <span className="font-bold text-sm">21°C</span>
            </div>
          ) : (
            <div
              className={twMerge(
                "text-xs flex justify-center flex-col items-center gap-2 text-dark"
              )}
            >
              <DynamicIcon iconName={"Temp"} color="text-dark" size="40" />
              <span className="font-bold text-sm">21°C</span>
            </div>
          )}
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
            <>
              {props.devices > 0 ? (
                <div
                  className={twMerge(
                    "p-4 rounded-full flex items-center justify-center",
                    props.devices > 0 ? "bg-dark" : "bg-uwu"
                  )}
                >
                  <DynamicIcon iconName={"Entertainment"} color="text-light" />
                </div>
              ) : (
                <span className="text-uwu text-xs font-bold text-center">
                  Keine Geräte registriert
                </span>
              )}
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col">
          {hasActiveDevices ? (
            <>
              <img
                src={Rhapsody}
                alt="Bohemian Rhapsody"
                className="w-10 h-10 rounded-sm"
              />
              <p
                className={twMerge(
                  "text-xs",
                  hasActiveDevices ? "text-light" : "text-uwu"
                )}
              >
                <span className="font-bold">Bohemian Rapsody</span>
              </p>
            </>
          ) : (
            <>
              {props.devices > 0 ? (
                <div
                  className={twMerge(
                    "p-4  rounded-full flex items-center justify-center",
                    props.devices > 0 ? "bg-dark" : "bg-uwu"
                  )}
                >
                  <DynamicIcon iconName={"Entertainment"} color="text-light" />
                </div>
              ) : (
                <span className="text-uwu text-xs font-bold text-center">
                  Keine Geräte registriert
                </span>
              )}
            </>
          )}
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
              <div className="relative pointer-events-none">
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
            <>
              {props.devices > 0 ? (
                <div
                  className={twMerge(
                    "p-4 rounded-full flex items-center justify-center",
                    props.devices > 0 ? "bg-dark" : "bg-uwu"
                  )}
                >
                  <DynamicIcon iconName={"Air"} color="text-light" />
                </div>
              ) : (
                <span className="text-uwu text-xs font-bold text-center">
                  Keine Geräte registriert
                </span>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-row gap-4 justify-center">
          {hasActiveDevices ? (
            <>
              <div
                className={twMerge(
                  "text-xs justify-center flex flex-col items-center gap-2",
                  hasActiveDevices ? "text-light" : "text-uwu"
                )}
              >
                <DynamicIcon iconName={"Fan"} color="text-light" />
                <span className="font-bold">Mittel</span>
              </div>
              <div
                className={twMerge(
                  "text-xs justify-center flex flex-col items-center gap-2",
                  hasActiveDevices ? "text-light" : "text-uwu"
                )}
              >
                <DynamicIcon iconName={"Humidity"} color="text-light" />
                <span className="font-bold">60%</span>
              </div>
            </>
          ) : (
            <span className="text-uwu text-[10px] font-bold text-center">
              Keine Geräte registriert
            </span>
          )}
        </div>
      );
    case Category.Household:
      return (
        <div className="flex gap-2 justify-center items-center">
          <>
            {hasMicrointeractions && props.devices > 0 ? (
              <div
                className={twMerge(
                  "p-2 rounded-full flex items-center justify-center",
                  hasActiveDevices
                    ? "bg-light"
                    : props.devices > 0
                    ? "bg-dark"
                    : "bg-uwu"
                )}
              >
                <DynamicIcon
                  iconName={"Pluh"}
                  color={hasActiveDevices ? "text-green" : "text-light"}
                />
              </div>
            ) : (
              <span className="text-uwu text-[10px] font-bold text-center">
                {props.devices > 0 ? (
                  <div
                    className={twMerge(
                      "p-2 rounded-full flex items-center justify-center",
                      hasActiveDevices
                        ? "bg-light"
                        : props.devices > 0
                        ? "bg-dark"
                        : "bg-uwu"
                    )}
                  >
                    <DynamicIcon
                      iconName={"Pluh"}
                      color={hasActiveDevices ? "text-green" : "text-light"}
                    />
                  </div>
                ) : (
                  "Keine Geräte registriert"
                )}
              </span>
            )}
          </>
        </div>
      );
    default:
      return <></>;
  }
}
