import DynamicIcon from "../DynamicIcon";
import SliderWithValue from "../Slider/SliderWithValue";
import styles from "./AirComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsOn } from "../../store/reducer";
import { useState, useEffect } from "react";
import { AppState } from "../../store/store";

export function AirComponent() {
  const dispatch = useDispatch();
  const [strengthValue, setStrengthValue] = useState(2);
  const [timerValue, setTimerValue] = useState(3);
  const [iconColor, setIconColor] = useState("text-green");
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(24);
  const [seconds, setSeconds] = useState(6);
  const isOn = useSelector((state: AppState) => state.app.isOn);

  useEffect(() => {
    if (strengthValue === 0) {
      dispatch(setIsOn(false));
    } else {
      dispatch(setIsOn(true));
    }
  }, [strengthValue, dispatch]);

  useEffect(() => {
    if (!isOn) {
      setIconColor("text-light/50");
      setStrengthValue(0);
      setTimerValue(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setIconColor("text-green");
      setStrengthValue(2);
      setTimerValue(3);
      setHours(2);
      setMinutes(24);
      setSeconds(6);
    }
  }, [isOn]);

  return (
    <div className="flex flex-col items-center justify-center gap-16 w-full mx-auto">
      <div className="flex flex-col items-center gap-2 w-full">
        <DynamicIcon iconName={"Fan"} color={iconColor} size={"200"} />
        <span className="font-normal">Noch aktiv für:</span>
        <div className="flex gap-5 text-center">
          <div className="flex flex-col font-normal">
            <span className="countdown font-bold text-3xl">
              <span style={{ "--value": hours } as React.CSSProperties}>
                02
              </span>
            </span>
            Std
          </div>
          <div className="flex flex-col font-normal">
            <span className="countdown font-bold text-3xl">
              <span style={{ "--value": minutes } as React.CSSProperties}>
                24
              </span>
            </span>
            Min
          </div>
          <div className="flex flex-col font-normal">
            <span className="countdown font-bold text-3xl">
              <span style={{ "--value": seconds } as React.CSSProperties}>
                06
              </span>
            </span>
            Sek
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 w-6/7">
        <table className="w-full table table-auto">
          <tbody>
            <tr>
              <td className="">
                <span className="font-bold">Stärke</span>
              </td>
              <td>
                <SliderWithValue
                  custom={styles.solid}
                  value={strengthValue}
                  step={33.333}
                  measure={""}
                  onChange={(value) => setStrengthValue(value)}
                />
              </td>
            </tr>
            <tr>
              <td className="">
                <span className="font-bold">Timer</span>
              </td>
              <td>
                <SliderWithValue
                  custom={styles.solid}
                  value={timerValue}
                  step={20}
                  measure={"h"}
                  onChange={(value) => setTimerValue(value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
