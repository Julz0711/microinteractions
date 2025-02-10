import { twMerge } from "tailwind-merge";
import { Category } from "../../../types/dashboard.types";
import { useEffect, useRef, useState } from "react";
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
    const styleXPos =
      Math.floor(props.index % 2) * 160 +
      Math.floor(props.index % 2) * padding +
      "px";
    const styleYPos =
      Math.floor(props.index / 2) * 160 +
      Math.floor(props.index / 2) * padding +
      "px";
    const styleXPosHidden = Math.floor(props.index % 2) * 30 + 50 + "vw";
    if (category === props.thisCategory) {
      setActive(true);
      gsap.to(buttonRef.current, {
        ease: "power2.out",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        duration: 0.4,
      });
    } else if (category !== null) {
      setActive(false);
      gsap.to(buttonRef.current, {
        ease: "power2.out",
        left: styleXPosHidden,
        top: styleYPos,
        xPercent: -50,
        yPercent: -50,
        duration: 0.4,
      });
    } else {
      setActive(false);
      gsap.to(buttonRef.current, {
        ease: "power2.out",
        left: styleXPos,
        top: styleYPos,
        duration: 0.4,
        xPercent: -50,
        yPercent: -50,
      });
    }
  }, [category]);

  const handleClick = () => {
    props.onClick(props.thisCategory);
  };

  return (
    <button
      onClick={handleClick}
      ref={buttonRef}
      className={twMerge(
        "h-40 w-40 flex items-center justify-center absolute rounded-md ",
        buttonColorClass
      )}
    >
      {props.thisCategory}
    </button>
  );
}
