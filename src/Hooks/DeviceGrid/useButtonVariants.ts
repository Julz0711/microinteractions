import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { useState } from "react";

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
    opacity: 1,
    height: "8rem",
    width: "8rem",
  },
  open: {
    left: "50%",
    x: "-50%",
    top: "0%",
    opacity: 1,
    height: "auto",
    width: "auto",
  },
  hidden: {
    left: styleXPosHidden + "px",
    top: styleYPos + "px",
    x: "0%",
    opacity: 1,
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
      const styleXPos =
        Math.floor(props.index % 2) * 150 +
        Math.floor(props.index % 2) * padding;
      const styleYPos =
        30 +
        Math.floor(props.index / 2) * 150 +
        Math.floor(props.index / 2) * padding;

      const xDirection = Math.floor(props.index % 2) === 0 ? -1 : 1;
      const styleXPosHidden =
        styleXPos + xDirection * 400 * (1 + Math.floor(props.index / 2));
      setButtonVariants(
        getButtonVariants(styleXPos, styleYPos, styleXPosHidden)
      );
    };
    setbuttonVariants();
  }, [props.canvasRef, hierarchy, props.index]);

  return { buttonVariants };
}
