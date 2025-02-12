import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { Category } from "../types/dashboard.types";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export interface IuseCategoryProps {
  thisCategory: Category;
  index: number;
  onClick: (category: Category) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export function useCategoryButton(props: IuseCategoryProps) {
  const [buttonColorClass, setbuttonColorClass] = useState("");
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { category } = useSelector((state: AppState) => state.app);
  const padding = 10;
  const [basePosition, setbasePosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [flexClasses, setflexClasses] = useState("");
  const [activeAnimationFinished, setactiveAnimationFinished] = useState(false);

  useEffect(() => {
    switch (props.thisCategory) {
      case Category.Lights:
        setbuttonColorClass("bg-orange");
        setSize({ width: 145, height: 145 });
        setflexClasses("flex justify-end items-end");
        break;
      case Category.Entertainment:
        setbuttonColorClass("bg-purple");
        setSize({ width: 135, height: 160 });
        break;
      case Category.Heat:
        setbuttonColorClass("bg-red");
        setSize({ width: 160, height: 160 });
        break;
      case Category.Air:
        setbuttonColorClass("bg-green");
        setSize({ width: 160, height: 110 });
        break;
    }
  }, [props.thisCategory]);

  useEffect(() => {
    const windowWidth = props.canvasRef.current!.clientWidth;
    const windowHeight = props.canvasRef.current!.clientHeight;

    const xDirection = basePosition.x - windowWidth / 2;
    const yDirection = basePosition.y - windowHeight / 2;
    const length = Math.sqrt(xDirection ** 2 + yDirection ** 2);
    const xNormalized = xDirection / length;
    const yNormalized = yDirection / length;
    const styleXPos =
      Math.floor(props.index % 2) * 160 + Math.floor(props.index % 2) * padding;
    const styleYPos =
      Math.floor(props.index / 2) * 160 +
      Math.floor(props.index / 2) * padding -
      (props.index % 2) * 30;
    const styleXPosHidden = styleXPos + xNormalized * 400;
    if (category === props.thisCategory) {
      setActive(true);
      gsap.to(buttonRef.current, {
        // Active State
        ease: "power2.out",
        left: "50%",
        top: "70%",
        height: "5rem",
        width: "5rem",
        xPercent: -50,
        yPercent: 20,
        duration: 0.4,
        onComplete: () => {
          setactiveAnimationFinished(true);
        },
      });
    } else if (category !== null) {
      // Hidden State
      setActive(false);
      gsap.to(buttonRef.current, {
        ease: "power2.out",
        left: styleXPosHidden + "px",
        top: styleYPos + "px",
        height: "10rem",
        width: "10rem",
        xPercent: -50,
        yPercent: -50,
        duration: 0.4,
      });
    } else {
      setActive(false);
      gsap.to(buttonRef.current, {
        // Default State
        ease: "power2.out",
        left: styleXPos + "px",
        top: styleYPos + "px",
        height: "10rem",
        width: "10rem",
        duration: 0.4,
        xPercent: -50,
        yPercent: -50,
        onComplete: () => {
          setbasePosition({ x: styleXPos, y: styleYPos });
          setactiveAnimationFinished(false);
        },
      });
    }
  }, [category]);

  const handleClick = () => {
    props.onClick(props.thisCategory);
  };

  return {
    buttonColorClass,
    handleClick,
    buttonRef,
    active,
    size,
    flexClasses,
    activeAnimationFinished,
  };
}
