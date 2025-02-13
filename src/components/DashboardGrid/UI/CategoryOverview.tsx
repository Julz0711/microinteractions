import * as React from "react";
import { Category } from "../../../types/dashboard.types";
import DynamicIcon from "../../DynamicIcon";
import { getName } from "../../../helpers/helpers";
import { devices } from "../../../data/data";
import { useEffect, useState } from "react";
import { useActiveDevices } from "../../../Hooks/useActiveDevices";

export interface ICategoryOverviewProps {
  thisCategory: Category;
}

export function CategoryOverview(props: ICategoryOverviewProps) {
  const activeDevices = useActiveDevices({ thisCategory: props.thisCategory });

  return (
    <div className="flex flex-col justify-between p-4 w-full h-full items-center">
      <div className="text-sm text-light font-bold w-full">
        {getName(props.thisCategory)}
      </div>
      <DynamicIcon iconName={"Bluetooth"} color="text-light" />
      <div className="h-6 flex gap-2 font-bold opacity-40 w-full justify-end">
        <div className=" text-light text-2xl">{activeDevices}</div>
        <div className="text-sm text-light text-[10px]">
          Aktive <br /> Geräte
        </div>
      </div>
    </div>
  );
}
