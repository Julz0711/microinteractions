import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { devices } from "../../data/data";
import { DeviceBox } from "./UI/DeviceBox";

export interface DeviceGridProps {
  activeAnimationFinished: boolean;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export const DeviceGrid = (props: DeviceGridProps) => {
  const { category } = useSelector((state: AppState) => state.app);
  const room = useSelector((state: AppState) => state.app.room);
  const filteredDevices = devices.filter(
    (device) => device.category === category && device.room === room
  );
  return (
    <div className="absolute w-[276px] h-80 left-1/2 bottom-24 -translate-x-1/2">
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
