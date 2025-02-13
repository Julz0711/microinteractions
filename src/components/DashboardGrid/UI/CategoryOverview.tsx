import * as React from "react";
import { Category } from "../../../types/dashboard.types";
import DynamicIcon from "../../DynamicIcon";
import { getName } from "../../../helpers/helpers";
import { devices } from "../../../data/data";
import { useEffect, useState } from "react";
import { useActiveDevices } from "../../../Hooks/useActiveDevices";
import { twMerge } from "tailwind-merge";

export interface ICategoryOverviewProps {
  thisCategory: Category;
}

export function CategoryOverview(props: ICategoryOverviewProps) {
  const activeDevices = useActiveDevices({ thisCategory: props.thisCategory });

  return (
    <div
      className={twMerge(
        "flex flex-col justify-between p-4 w-full h-full items-center"
      )}
    >
      <div
        className={twMerge(
          "text-[11px]  font-bold w-full",
          activeDevices > 0 ? "text-light" : "text-dark"
        )}
      >
        {getName(props.thisCategory)}
      </div>
      <span className="p-4 bg-light rounded-full">
        <DynamicIcon iconName={"Lamp"} color="text-yellow" />
      </span>
      <div className="h-6 flex gap-2 font-bold opacity-40 w-full justify-end">
        <div className=" text-light text-2xl">{activeDevices}</div>
        <div className="text-sm text-light text-[10px]">
          Aktive <br /> Geräte
        </div>
      </div>
    </div>
  );
}
