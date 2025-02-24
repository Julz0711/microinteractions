import * as React from "react";
import { devices } from "../data/data";
import { Category } from "../types/dashboard.types";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { useEffect } from "react";

export interface IuseActiveDevicesProps {
  thisCategory: Category;
}

export function useActiveDevices(props: IuseActiveDevicesProps) {
  const [activeDevices, setActiveDevices] = React.useState(0);
  const room = useSelector((state: AppState) => state.app.room);
  React.useEffect(() => {
    const filteredDevices = devices.filter(
      (device) => device.category === props.thisCategory && device.room === room
    );
    setActiveDevices(
      filteredDevices.filter((device) => device.isActive).length
    );
  }, [room]);

  return activeDevices;
}
