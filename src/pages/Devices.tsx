import DeviceBox from "../components/DeviceBox";
import { devices } from "../data/data";

const Devices = () => {
  const groupedDevices = devices.reduce(
    (acc: { [key: string]: any[] }, device: any) => {
      if (!acc[device.room]) {
        acc[device.room] = [];
      }
      acc[device.room].push(device);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(groupedDevices).map(([room, devices]) => (
        <div key={room}>
          <h2 className="font-alte-haas-bold">{room}</h2>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {devices.map((device: any) => (
              <div>
                <DeviceBox
                  deviceName={device.name}
                  icon={device.icon}
                  activeColor={device.color}
                  hasAdditionalInfo={true}
                  hasToggle={true}
                  isActive={device.active}
                  additionalInfo={device.additional}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Devices;
