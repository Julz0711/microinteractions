import { useDispatch, useSelector } from "react-redux";
import { Category, HierarchyStep } from "../../types/dashboard.types";
import { setCategory, setHierarchy } from "../../store/reducer";
import { AppState } from "../../store/store";
import { CategoryButton } from "./DashboardUI/CategoryButton";

export const SmartHomeGrid = () => {
  const dispatch = useDispatch();
  const { hierarchy, category } = useSelector((state: AppState) => state.app);

  const handleSetHierarchy = (selectedCategory: Category) => {
    if (
      hierarchy === HierarchyStep.CategoryGrid &&
      category === selectedCategory
    ) {
      // If the clicked category is already active, deactivate it and go back to SmartHomeGrid
      dispatch(setHierarchy(HierarchyStep.SmartHomeGrid));
      dispatch(setCategory(null));
    } else {
      // Otherwise, set the hierarchy to CategoryGrid and activate the selected category
      dispatch(setHierarchy(HierarchyStep.CategoryGrid));
      dispatch(setCategory(selectedCategory));
    }
  };
  return (
    <div className={"w-40 h-80 transition-all relative"}>
      {Object.values(Category)
        .filter((key) => isNaN(Number(key)))
        .map((cat, index) => (
          <CategoryButton
            key={index}
            index={index}
            onClick={handleSetHierarchy}
            thisCategory={cat as Category}
          />
        ))}
    </div>
  );
};
