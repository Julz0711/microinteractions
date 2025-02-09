import { twMerge } from "tailwind-merge";
import { Category } from "../../../types/dashboard.types";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap"; // Import GSAP

export interface ICategoryButtonProps {
  category: Category;
  onClick: (category: Category) => void;
  activeCategory?: Category | null;
  index: number;
}

export function CategoryButton(props: ICategoryButtonProps) {
  const [buttonColorClass, setbuttonColorClass] = useState("");
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    switch (props.category as unknown as string) {
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

    console.log("props.activeCategory", props.activeCategory);
    const styleXPos =
      props.activeCategory !== null
        ? "90%"
        : Math.floor(props.index % 2) * 50 + "%";
    const styleYPos = Math.floor(props.index / 2) * 50 + "%";
    gsap.set(buttonRef.current, { left: styleXPos, top: styleYPos });
  }, [props.activeCategory]);

  useEffect(() => {
    const styleXPos = Math.floor(props.index % 2) * 50 + "%";
    const styleYPos = Math.floor(props.index / 2) * 50 + "%";
    if (props.activeCategory === props.category) {
      setActive(true);
      gsap.to(buttonRef.current, {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        duration: 0.2,
      });
    } else if (props.activeCategory !== null) {
      setActive(false);
      gsap.to(buttonRef.current, {
        left: "90%",
        top: styleYPos,
        xPercent: -50,
        yPercent: -50,
        duration: 0.2,
      });
    } else {
      setActive(false);
      gsap.to(buttonRef.current, {
        left: styleXPos,
        top: styleYPos,
        xPercent: 0,
        yPercent: 0,
        duration: 0.2,
      });
    }
  }, [props.activeCategory, props.category, props.index]);

  return (
    <button
      onClick={() => props.onClick(props.category)}
      ref={buttonRef}
      className={twMerge(
        "h-24 w-24 flex items-center justify-center transition-all absolute ",
        buttonColorClass
      )}
    >
      {props.category}
    </button>
  );
}
