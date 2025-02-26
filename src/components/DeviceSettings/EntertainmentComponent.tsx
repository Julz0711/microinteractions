import { twMerge } from "tailwind-merge";
import Rhapsody from "../../assets/bohemian_rhapsody.jpg";
import DynamicIcon from "../DynamicIcon";
import styles from "./EntertainmentComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { toggleIsOn } from "../../store/reducer";

export function EntertainmentComponent() {
  const dispatch = useDispatch();
  const isOn = useSelector((state: AppState) => state.app.isOn);

  const handleToggle = () => {
    dispatch(toggleIsOn());
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full mx-auto">
      {isOn ? (
        <img
          src={Rhapsody}
          alt="Bohemian Rhapsody"
          className="w-48 h-48 rounded-md shadow-2xl"
        />
      ) : (
        <div className="w-48 h-48 rounded-md shadow-2xl bg-dark/44"></div>
      )}

      <div className="flex flex-col items-center gap-0 w-full">
        <span className="text-dark whitespace-nowrap text-md font-bold">
          Bohemian Rhapsody
        </span>
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
            isOn ? styles.isOn : styles.isOff
          )}
        />
        <span
          className={twMerge(
            "absolute left-1 top-6 text-xs font-bold",
            isOn ? "text-purple" : "text-uwu"
          )}
        >
          {isOn ? "1:34" : "-:--"}
        </span>
        <span
          className={twMerge(
            "absolute right-1 top-6 text-xs font-bold",
            isOn ? "text-purple" : "text-uwu"
          )}
        >
          {isOn ? "-2:56" : "--:--"}
        </span>
      </div>
      <div className="flex gap-6 items-center">
        <DynamicIcon
          iconName={"PreviousSong"}
          color={twMerge(isOn ? "text-purple" : "text-dark")}
          size={"40"}
        />
        <DynamicIcon
          iconName={isOn ? "Pause" : "Play"}
          color={twMerge(isOn ? "text-purple" : "text-dark")}
          size={"48"}
        />
        <DynamicIcon
          iconName={"NextSong"}
          color={twMerge(isOn ? "text-purple" : "text-dark")}
          size={"40"}
        />
      </div>
      <div className="w-2/3 flex flex-row items-center gap-4">
        <span className="text-xs text-purple font-bold">
          <DynamicIcon
            iconName={"SoundOff"}
            color={twMerge(isOn ? "text-purple" : "text-uwu")}
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
            isOn ? styles.isOn : styles.isOff
          )}
        />

        <span className="text-xs text-purple font-bold">
          <DynamicIcon
            iconName={"SoundOn"}
            color={twMerge(isOn ? "text-purple" : "text-uwu")}
            size={"25"}
          />
        </span>
      </div>
    </div>
  );
}
