import * as React from "react";
import { devices } from "../data/data";
import { Category } from "../types/dashboard.types";

export interface IuseAllDevicesProps {
  thisCategory: Category;
  thisRoom: string;
}

export function useAllDevices(props: IuseAllDevicesProps) {
  const [allDevicesCount, setAllDevicesCount] = React.useState(0);

  React.useEffect(() => {
    const filteredDevices = devices.filter(
      (device) =>
        device.category === props.thisCategory && device.room === props.thisRoom
    );
    setAllDevicesCount(filteredDevices.length);
  }, [props.thisCategory, props.thisRoom]);

  return allDevicesCount;
}
