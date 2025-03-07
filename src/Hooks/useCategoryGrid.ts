import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/store";
import { Category, HierarchyStep } from "../types/dashboard.types";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { setHierarchy, setCategory } from "../store/reducer";

export interface IuseCategoryGridProps {
  thisCategory: Category;
  index: number;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export function useCategoryGrid(props: IuseCategoryGridProps) {
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const padding = 15;
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [flexClasses, setflexClasses] = useState("");
  const [activeAnimationFinished, setactiveAnimationFinished] = useState(false);
  const dispatch = useDispatch();
  const { hierarchy, category } = useSelector((state: AppState) => state.app);
  const hasMicrointeractions = useSelector(
    (app: AppState) => app.app.hasMicrointeractions
  );
  const room = useSelector((state: AppState) => state.app.room);

  const handleSetHierarchy = () => {
    if (
      hierarchy === HierarchyStep.CategoryGrid &&
      category === props.thisCategory
    ) {
      dispatch(setHierarchy(HierarchyStep.SmartHomeGrid));
      dispatch(setCategory(null));
    } else {
      dispatch(setHierarchy(HierarchyStep.CategoryGrid));
      dispatch(setCategory(props.thisCategory));
    }
  };

  useEffect(() => {
    switch (props.thisCategory) {
      case Category.Lights:
        setSize({ width: 145, height: 145 });
        setflexClasses("flex justify-end items-end");
        break;
      case Category.Entertainment:
        setSize({ width: 135, height: 160 });
        setflexClasses("flex justify-start items-end");
        break;
      case Category.Heat:
        setSize({ width: 160, height: 160 });

        setflexClasses("flex justify-end items-start");
        break;
      case Category.Air:
        setSize({ width: 160, height: 120 });

        break;
      case Category.Household:
        setSize({ width: 110, height: 110 });
        setflexClasses("flex justify-start");
        break;
    }
  }, [hasMicrointeractions]);

  useEffect(() => {
    const xDirection = Math.floor(props.index % 2) === 0 ? -1 : 1;
    const styleXPos =
      160 -
      Math.floor(props.index % 2) * 160 +
      Math.floor((props.index + 1) % 2) * padding;
    const offset = (props.index % 2) * 20;
    const styleYPos =
      Math.floor(props.index / 2) * 160 +
      Math.floor(props.index / 2) * padding +
      offset +
      60;
    const styleXPosHidden =
      styleXPos - xDirection * 200 * (1 + Math.floor(props.index / 2));
    if (category === props.thisCategory) {
      setActive(true);
      gsap.to(buttonRef.current, {
        // Active State
        ease: "power2.out",
        left: "50%",
        xPercent: -50,
        top: "70%",
        height: "5rem",
        width: "5rem",
        duration: hasMicrointeractions ? 0.3 : 0,
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
        xPercent: 0,
        top: styleYPos + "px",
        height: "10rem",
        width: "10rem",
        duration: hasMicrointeractions ? 0.3 : 0,
      });
    } else {
      setActive(false);
      gsap.to(buttonRef.current, {
        // Default State
        ease: "power2.out",
        left: styleXPos + "px",
        xPercent: 0,
        top: styleYPos + "px",
        height: "10rem",
        width: "10rem",
        duration: hasMicrointeractions ? 0.3 : 0,
        onComplete: () => {
          setactiveAnimationFinished(false);
        },
      });
    }
  }, [category, hasMicrointeractions]);

  useEffect(() => {
    const xDirection = Math.floor(props.index % 2) === 0 ? -1 : 1;
    const styleXPos =
      160 -
      Math.floor(props.index % 2) * 160 +
      Math.floor((props.index + 1) % 2) * padding;
    const offset = hasMicrointeractions ? (props.index % 2) * 20 : 0;
    const styleYPos =
      Math.floor(props.index / 2) * 160 +
      Math.floor(props.index / 2) * padding +
      offset +
      30;
    const styleXPosHidden =
      styleXPos - xDirection * 200 * (1 + Math.floor(props.index / 2));
    // Hidden State
    setActive(false);
    if (hasMicrointeractions) {
      console.log("hasMicrointeractions");
      gsap.to(buttonRef.current, {
        ease: "power2.out",
        left: styleXPosHidden + "px",
        xPercent: 0,
        top: styleYPos + "px",
        height: "10rem",
        width: "10rem",
        duration: 0,
      });

      gsap.to(buttonRef.current, {
        // Default State
        ease: "power2.out",
        left: styleXPos + "px",
        xPercent: 0,
        top: styleYPos + "px",
        height: "10rem",
        width: "10rem",
        duration: hasMicrointeractions ? 0.3 : 0,
        onComplete: () => {
          setactiveAnimationFinished(false);
        },
      });
    }
  }, [room]);

  return {
    handleSetHierarchy,
    buttonRef,
    active,
    size,
    flexClasses,
    activeAnimationFinished,
  };
}
