import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { Category } from "../types/dashboard.types";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export interface IuseCategoryProps {
  thisCategory: Category;
  index: number;
  onClick: (category: Category) => void;
}

export function useCategoryButton(props: IuseCategoryProps) {
  const [buttonColorClass, setbuttonColorClass] = useState("");
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { category } = useSelector((state: AppState) => state.app);
  const padding = 10;
  const [basePosition, setbasePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    switch (props.thisCategory) {
      case Category.Heat:
        setbuttonColorClass("bg-red");
        break;
      case Category.Entertainment:
        setbuttonColorClass("bg-purple");
        break;
      case Category.Air:
        setbuttonColorClass("bg-green");
        break;
      case Category.Lights:
        setbuttonColorClass("bg-orange");
        break;
    }
  }, [props.thisCategory]);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const xDirection = basePosition.x - windowWidth / 2;
    const yDirection = basePosition.y - windowHeight / 2;
    const length = Math.sqrt(xDirection ** 2 + yDirection ** 2);
    const xNormalized = xDirection / length;
    const yNormalized = yDirection / length;
    const styleXPos =
      Math.floor(props.index % 2) * 160 + Math.floor(props.index % 2) * padding;
    const styleYPos =
      Math.floor(props.index / 2) * 160 + Math.floor(props.index / 2) * padding;
    const styleXPosHidden = styleXPos + xNormalized * 250;
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
        yPercent: -50,
        duration: 0.4,
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
          setbasePosition(getCenter());
        },
      });
    }
  }, [category]);

  const handleClick = () => {
    props.onClick(props.thisCategory);
  };

  const getCenter = () => {
    const rect = buttonRef.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return { x: centerX, y: centerY };
  };

  return { buttonColorClass, handleClick, buttonRef, active };
}
