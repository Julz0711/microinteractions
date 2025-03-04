import { twMerge } from "tailwind-merge";
import Rhapsody from "../../assets/bohemian_rhapsody.jpg";
import DynamicIcon from "../DynamicIcon";
import styles from "./EntertainmentComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { toggleIsOn } from "../../store/reducer";
import { Equalizer } from "../SVGAnimations/Equalizer";

export function EntertainmentComponent() {
  const dispatch = useDispatch();
  const { isOn, hasMicrointeractions } = useSelector(
    (state: AppState) => state.app
  );

  const handleToggle = () => {
    dispatch(toggleIsOn());
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full mx-auto">
      <img
        src={Rhapsody}
        alt="Bohemian Rhapsody"
        className={twMerge(
          "w-32 h-32 sm:h-48 sm:w-48 rounded-md shadow-2xl",
          isOn ? "" : hasMicrointeractions && "grayscale"
        )}
      />

      <div className="flex flex-col items-center gap-0 w-full">
        <div className="text-dark whitespace-nowrap text-md font-bold flex items-center justify-center gap-0">
          {hasMicrointeractions && (
            <div
              className={twMerge(
                "duration-300 overflow-hidden",
                isOn ? "w-14 " : "w-0 "
              )}
            >
              <Equalizer />
            </div>
          )}
          Bohemian Rhapsody
        </div>
        <span className="text-dark/70 whitespace-nowrap text-sm font-bold">
          Queen
        </span>
      </div>
      <div className="relative w-2/3">
        <input
          type="range"
          min={0}
          max="100"
          value={isOn ? "30" : "0"}
          className={twMerge(
            "w-full border-0 shadow-2xl h-3",
            hasMicrointeractions
              ? isOn
                ? styles.isOn
                : styles.isOff
              : styles.isUgly
          )}
        />
        <span
          className={twMerge(
            "absolute left-1 top-6 text-xs font-bold",
            hasMicrointeractions
              ? isOn
                ? "text-purple"
                : "text-uwu"
              : "text-dark"
          )}
        >
          {isOn ? "1:34" : "-:--"}
        </span>
        <span
          className={twMerge(
            "absolute right-1 top-6 text-xs font-bold",
            hasMicrointeractions
              ? isOn
                ? "text-purple"
                : "text-uwu"
              : "text-dark"
          )}
        >
          {isOn ? "-2:56" : "--:--"}
        </span>
      </div>
      <div className="flex gap-6 items-center">
        <DynamicIcon
          iconName={"PreviousSong"}
          color={twMerge(
            hasMicrointeractions
              ? isOn
                ? "text-purple"
                : "text-uwu"
              : "text-dark"
          )}
          size={"40"}
        />
        <span onClick={handleToggle}>
          <DynamicIcon
            iconName={isOn ? "Pause" : "Play"}
            color={twMerge(
              hasMicrointeractions
                ? isOn
                  ? "text-purple"
                  : "text-uwu"
                : "text-dark"
            )}
            size={"48"}
          />
        </span>
        <DynamicIcon
          iconName={"NextSong"}
          color={twMerge(
            hasMicrointeractions
              ? isOn
                ? "text-purple"
                : "text-uwu"
              : "text-dark"
          )}
          size={"40"}
        />
      </div>
      <div className="w-2/3 flex flex-row items-center gap-4">
        <span className="text-xs text-purple font-bold">
          <DynamicIcon
            iconName={"SoundOff"}
            color={twMerge(
              hasMicrointeractions
                ? isOn
                  ? "text-purple"
                  : "text-uwu"
                : "text-dark"
            )}
            size={"16"}
          />
        </span>
        <input
          type="range"
          min={0}
          max="100"
          value="30"
          className={twMerge(
            "w-full border-0 shadow-2xl h-3",
            hasMicrointeractions
              ? isOn
                ? styles.isOn
                : styles.isOff
              : styles.isUgly
          )}
        />

        <span className={twMerge("text-xs font-bold")}>
          <DynamicIcon
            iconName={"SoundOn"}
            color={twMerge(
              hasMicrointeractions
                ? isOn
                  ? "text-purple"
                  : "text-uwu"
                : "text-dark"
            )}
            size={"25"}
          />
        </span>
      </div>
    </div>
  );
}
