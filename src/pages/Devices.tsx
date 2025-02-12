import DevicePreview from "../components/DevicePreview";
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
          <h2 className="font-bold">{room}</h2>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {devices.map((device: any) => (
              <div>
                <DevicePreview device={device} hasToggle={true} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Devices;
