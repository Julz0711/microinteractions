import { Category } from "../../../types/dashboard.types";
import { getCategoryName } from "../../../helpers/helpers";
import { useActiveDevices } from "../../../Hooks/useActiveDevices";
import { twMerge } from "tailwind-merge";
import { CategoryStats } from "./CategoryStats";
import { useAllDevices } from "../../../Hooks/useAllDevices";
import { AppState } from "../../../store/store";
import { useSelector } from "react-redux";

export interface ICategoryOverviewProps {
  thisCategory: Category;
}

export function CategoryOverview(props: ICategoryOverviewProps) {
  const room = useSelector((state: AppState) => state.app.room);
  const activeDevices = useActiveDevices({ thisCategory: props.thisCategory });
  const allDevices = useAllDevices({
    thisCategory: props.thisCategory,
    thisRoom: room || "",
  });

  return (
    <div
      className={twMerge(
        "flex flex-col justify-between p-2 px-3 w-full h-full items-center"
      )}
    >
      <div
        className={twMerge(
          "text-[11px]  font-bold w-full",
          activeDevices > 0 ? "text-light" : "text-dark"
        )}
      >
        {getCategoryName(props.thisCategory)}
      </div>
      <CategoryStats category={props.thisCategory} />
      <div
        className={twMerge(
          "flex gap-1 font-bold w-full justify-end items-center",
          activeDevices > 0 ? "opacity-60" : "opacity-100"
        )}
      >
        <div
          className={twMerge(
            "text-light text-lg",
            activeDevices > 0 ? "text-light" : "text-uwu"
          )}
        >
          {activeDevices}/{allDevices}
        </div>
        <div
          className={twMerge(
            "text-sm font-bold",
            activeDevices > 0 ? "text-light" : "text-uwu "
          )}
        >
          Aktiv
        </div>
      </div>
    </div>
  );
}
