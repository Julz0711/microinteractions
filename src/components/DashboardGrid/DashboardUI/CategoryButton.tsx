import { twMerge } from "tailwind-merge";
import { Category } from "../../../types/dashboard.types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap"; // Import GSAP
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";

export interface ICategoryButtonProps {
  thisCategory: Category;
  onClick: (category: Category) => void;
  index: number;
}

export function CategoryButton(props: ICategoryButtonProps) {
  const [buttonColorClass, setbuttonColorClass] = useState("");
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { category } = useSelector((state: AppState) => state.app);
  const padding = 10;
  const [basePosition, setbasePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    switch (props.thisCategory as unknown as string) {
      case "Heat":
        setbuttonColorClass("bg-red");
        break;
      case "Entertainment":
        setbuttonColorClass("bg-purple");
        break;
      case "Air":
        setbuttonColorClass("bg-green");
        break;
      case "Lights":
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

  return (
    <button
      onClick={handleClick}
      ref={buttonRef}
      className={twMerge(
        "h-40 w-40 flex text-light font-bold items-center justify-center absolute rounded-md",
        buttonColorClass
      )}
    >
      {active ? "X" : <>{props.thisCategory}</>}
    </button>
  );
}
