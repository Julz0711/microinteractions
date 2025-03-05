import { twMerge } from "tailwind-merge";
import "./Slider.css";
import DynamicIcon from "../DynamicIcon";
import bulbAnim from "../../assets/lottie/BulbOn.json";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { useEffect, useRef } from "react";

export interface ISliderProps {
  hasGradient: boolean;
  isHorizontal?: boolean;
  size: string;
  clickable: boolean;
  value?: number;
  className?: string;
  range?: number;
  isPx?: boolean;
  step?: number;
  hasIcon?: boolean;
  icon?: string;
  iconColor?: string;
  onChange: (value: number) => void;
}

export function Slider(props: ISliderProps) {
  const {hasMicrointeractions, isOn} = useSelector(
    (state: AppState) => state.app
  );
  const sliderRef = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(Number(event.target.value));
  };

  useEffect(() => {

    props.onChange(isOn? 1 : 0);
  }, [isOn]);

  useEffect(() => {
    console.log(props.value);
  }, [props.value]);

  const handleTouchStart = (event: TouchEvent) => {
    handleTouchMove(event);
  };

  const handleTouchMove = (event: TouchEvent) => {
    console.log("touchmove");
    if (sliderRef.current) {
      const touch = event.touches[0];
      const rect = sliderRef.current.getBoundingClientRect();
      const newValue = props.isHorizontal
        ? ((touch.clientX - rect.left) / rect.width) * (props.range ?? 100)
        : ((rect.bottom - touch.clientY) / rect.height) * (props.range ?? 100);
        console.log(newValue);
      props.onChange(Math.min(Math.max(newValue, 0), props.range ?? 100));
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("touchstart", handleTouchStart);

      slider.addEventListener("touchmove", handleTouchMove);
      return () => {
        slider.addEventListener("touchstart", handleTouchStart);

        slider.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [props.range, props.isHorizontal]);

  return (
    <div
      className={twMerge("relative w-20")}
      style={
        props.isHorizontal
          ? props.isPx
            ? { width: `${props.size}px` }
            : { width: `${props.size}%` }
          : props.isPx
          ? { height: `${props.size}px` }
          : { height: `${props.size}%` }
      }
    >
      <input
        ref={sliderRef}
        type="range"
        step={props.step}
        min={0}
        max={props.range ? props.range : 100}
        value={props.value}
        className={twMerge(
          props.className,
          props.isHorizontal
            ? "left-0 top-0 w-full cursor-default"
            : `vertical absolute -translate-x-1/2 -translate-y-1/2 cursor-row-resize -rotate-90 left-1/2 top-1/2`,
          "border-0 shadow-2xl h-20",
          hasMicrointeractions
            ? props.hasGradient
              ? "gradient"
              : "solid"
            : "uggo"
        )}
        style={
          hasMicrointeractions && props.isPx
            ? { width: `${props.size}px`, height: "80px" }
            : { width: `${props.size}%`, height: "48px" }
        }
        onChange={props.clickable ? handleChange : undefined}
      />
      {props.hasIcon && hasMicrointeractions && (
        <div className="absolute left-1/2 scale-120 -translate-x-1/2 bottom-4 pointer-events-none">
          {(props.value ?? 0) > 15 ? (
            <Lottie
              options={{
                loop: false,
                autoplay: (props.value ?? 0) > 0,
                animationData: bulbAnim,
              }}
              speed={1}
            />
          ) : (
            <div className="pb-1">
              <DynamicIcon
                iconName={props.icon || ""}
                color={props.iconColor}
                size={"24"}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
