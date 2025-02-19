import { Easing, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";

export interface IuseDeviceAnimationProps {
  buttonState: any;
  previousState: any;
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
    const animationDuration = hasMicrointeractions
      ? 0.25 + 0.05 * props.index : 0.0;
    const animationOptions = {
          duration: animationDuration,
        }
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
    props.previousState,
    scope,
  ]);
  return { scope };
}
