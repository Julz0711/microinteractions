import { Easing, useAnimate } from "framer-motion";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";

export interface IuseDeviceAnimationProps {
  buttonState: any;
  buttonVariants: any;
  index: number;
}

export function useDeviceAnimation(props: IuseDeviceAnimationProps) {
  const [scope, animate] = useAnimate();
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  useEffect(() => {
    if (props.buttonState == null) return;
    const animationOptions = hasMicrointeractions
      ? {
          duration: 0.15 * props.index,
          ease: "easeOut" as Easing,
        }
      : {
          duration: 0.0,
          ease: "easeOut" as Easing,
        };
    animate(
      scope.current,
      props.buttonVariants[props.buttonState],
      animationOptions
    );
  }, [
    animate,
    hasMicrointeractions,
    props.buttonState,
    props.buttonVariants,
    props.index,
    scope,
  ]);
  return { scope };
}
