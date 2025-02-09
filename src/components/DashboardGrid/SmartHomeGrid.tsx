import { useDispatch, useSelector } from "react-redux";
import { Category, HierarchyStep } from "../../types/dashboard.types";
import { setCategory, setHierarchy } from "../../store/reducer";
import { AppState } from "../../store/store";
import { CategoryButton } from "./DashboardUI/CategoryButton";

export const SmartHomeGrid = () => {
  const dispatch = useDispatch();
  const { hierarchy, category } = useSelector((state: AppState) => state.app);

  const handleSetHierarchy = (category: Category) => {
    // if (hierarchy !== HierarchyStep.SmartHomeGrid) {
    //   dispatch(setHierarchy(HierarchyStep.SmartHomeGrid));
    //   return;
    // }

    dispatch(setHierarchy(HierarchyStep.CategoryGrid));
    dispatch(setCategory(category));
  };

  return (
    <div className={"transition-all relative w-full h-full"}>
      {Object.values(Category)
        .filter((key) => isNaN(Number(key)))
        .map((cat, index) => (
          <CategoryButton
            key={index}
            index={index}
            onClick={handleSetHierarchy}
            category={cat as Category}
            activeCategory={category}
          />
        ))}
    </div>
  );
};
