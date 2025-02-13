import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { devices } from "../../data/data";
import { motion } from "framer-motion";
import { DeviceBox } from "./DeviceBox";

export interface DeviceGridProps {
  activeAnimationFinished: boolean;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export const DeviceGrid = (props: DeviceGridProps) => {
  const { category } = useSelector((state: AppState) => state.app);
  const filteredDevices = devices.filter(
    (device) => device.category === category
  );

  return (
    <div className="absolute w-[276px] h-80 left-1/2 bottom-24 -translate-x-1/2 -z-10">
      {filteredDevices.map((device, index) => (
        <DeviceBox
          key={index}
          device={device}
          canvasRef={props.canvasRef}
          index={index}
        />
      ))}
    </div>
  );
};
