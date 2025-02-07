import { useDispatch, useSelector } from "react-redux";
import { hierarchyStep } from "../../types/dashboard.types";
import { setHierarchy } from "../../store/reducer";
import { twMerge } from "tailwind-merge";
import { AppState } from "../../store/store";
import { useEffect, useState } from "react";

export const SmartHomeGrid = () => {
  const dispatch = useDispatch();
  const { hierarchy } = useSelector((state: AppState) => state.app);
  const [transformvalue, setTransformvalue] = useState("");
  const cssClass = twMerge(
    "transition-all duration-300 absolute flex gap-4 flex-wrap w-full ",
    hierarchy === hierarchyStep.SmartHomeGrid && " left-[0%]",
    hierarchy === hierarchyStep.CategoryGrid && transformvalue,
    hierarchy === hierarchyStep.Device && transformvalue
  );

  const handleSetHierarchy = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cursorX = event.clientX;
    const windowWidth = window.innerWidth;

    if (cursorX < windowWidth / 2) {
      setTransformvalue("left-[90%]");
    } else {
      setTransformvalue("left-[-90%]");
    }

    if (hierarchy !== hierarchyStep.SmartHomeGrid) {
      dispatch(setHierarchy(hierarchyStep.SmartHomeGrid));
      return;
    }

    dispatch(setHierarchy(hierarchyStep.CategoryGrid));
  };

  return (
    <div className={cssClass}>
      <button
        onClick={handleSetHierarchy}
        className="h-24 bg-orange w-1/2 flex-1"
      >
        Log Hierarchy
      </button>
      <button onClick={handleSetHierarchy} className="h-24 bg-red flex-1">
        Log Hierarchy
      </button>
      <button
        onClick={handleSetHierarchy}
        className="h-24 bg-purple w-1/2 flex-1"
      >
        Log Hierarchy
      </button>
      <button onClick={handleSetHierarchy} className="h-24 bg-green w-1/2">
        Log Hierarchy
      </button>
    </div>
  );
};
