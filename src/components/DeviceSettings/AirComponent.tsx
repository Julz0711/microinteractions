import DynamicIcon from "../DynamicIcon";
import SliderWithValue from "../Slider/SliderWithValue";
import styles from "./AirComponent.module.css";
import { useDispatch } from "react-redux";
import { setIsOn } from "../../store/reducer";
import { useState, useEffect } from "react";

export function AirComponent() {
  const dispatch = useDispatch();
  const [isOn, setIsOnState] = useState(true);
  const [strengthValue, setStrengthValue] = useState(2);
  const [timerValue, setTimerValue] = useState(3);

  useEffect(() => {
    if (strengthValue === 0) {
      dispatch(setIsOn(false));
      setIsOnState(false);
    } else {
      dispatch(setIsOn(true));
      setIsOnState(true);
    }
  }, [strengthValue, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center gap-16 w-full mx-auto">
      <div className="flex flex-col items-center gap-2 w-full">
        <DynamicIcon iconName={"Fan"} color={"text-green"} size={"200"} />
        <span className="font-normal">Noch aktiv für:</span>
        <div className="flex gap-5 text-center">
          <div className="flex flex-col font-normal">
            <span className="countdown font-bold text-3xl">
              <span style={{ "--value": 2 } as React.CSSProperties}>02</span>
            </span>
            Std
          </div>
          <div className="flex flex-col font-normal">
            <span className="countdown font-bold text-3xl">
              <span style={{ "--value": 24 } as React.CSSProperties}>24</span>
            </span>
            Min
          </div>
          <div className="flex flex-col font-normal">
            <span className="countdown font-bold text-3xl">
              <span style={{ "--value": 6 } as React.CSSProperties}>06</span>
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
