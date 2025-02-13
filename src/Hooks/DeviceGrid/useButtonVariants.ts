import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { useState } from "react";
import { delay, easeIn } from "framer-motion";

export interface IuseButtonVariantsProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  index: number;
}
const getButtonVariants = (
  styleXPos: number,
  styleYPos: number,
  styleXPosHidden: number
) => ({
  visible: {
    scale: 1,
    left: styleXPos + "px",
    top: styleYPos + "px",
    x: "0%",
    height: "8rem",
    width: "8rem",
  },
  open: {
    left: "50%",
    x: "-50%",
    top: "40%",
    height: "8rem",
    width: "8rem",
  },
  hidden: {
    left: styleXPosHidden + "px",
    top: styleYPos + "px",
    x: "0%",
    height: "8rem",
    width: "8rem",
    yPercent: -50,
  },
});

export function useButtonVariants(props: IuseButtonVariantsProps) {
  const hierarchy = useSelector((state: AppState) => state.app.hierarchy);
  const [buttonVariants, setButtonVariants] = useState<any>();
  const padding = 0;

  React.useEffect(() => {
    const setbuttonVariants = () => {
      const windowWidth = props.canvasRef.current!.clientWidth;
      const windowHeight = props.canvasRef.current!.clientHeight;

      const styleXPos =
        Math.floor(props.index % 2) * 150 +
        Math.floor(props.index % 2) * padding;
      const styleYPos =
        Math.floor(props.index / 2) * 150 +
        Math.floor(props.index / 2) * padding;

      const xDirection = styleXPos - windowWidth / 2;
      const yDirection = styleYPos - windowHeight / 2;
      const length = Math.sqrt(xDirection ** 2 + yDirection ** 2);
      const xNormalized = xDirection / length;
      const styleXPosHidden = styleXPos + xNormalized * 500;
      setButtonVariants(
        getButtonVariants(styleXPos, styleYPos, styleXPosHidden)
      );
    };
    setbuttonVariants();
  }, [props.canvasRef, hierarchy, props.index]);

  return { buttonVariants };
}
