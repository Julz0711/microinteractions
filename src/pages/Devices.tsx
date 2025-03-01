import { useState } from "react";
import DevicePreview from "../components/DevicePreview";
import DynamicIcon from "../components/DynamicIcon";
import InputField from "../components/InputField";
import { devices } from "../data/data";
import { getRoomName } from "../helpers/helpers";
import { Room } from "../types/types";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import Hotspot from "../components/Hotspot/Hotspot";

const filters = [
  { name: "Status", selected: "Alle" },
  { name: "Raum", selected: "Alle" },
  { name: "Kategorie", selected: "Alle" },
  { name: "Sortieren", selected: "Raum" },
];

const Devices = () => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedDevices = filteredDevices.reduce(
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
    <div className="flex flex-col gap-8 pt-26">
      {hasMicrointeractions && (
        <div className="flex flex-col gap-4">
          <InputField
            type={"text"}
            icon={"Lupe"}
            name={"search"}
            placeholder={"Suchen"}
            value={searchQuery}
            change={handleSearchChange}
            blur={() => {}}
            isSearch={true}
          />
          <div className="flex gap-2 items-center justify-end">
            {filters.map((filter) => (
              <div key={filter.name} className="flex gap-1 items-end">
                <span className="text-[8px] text-uwu font-bold">
                  {filter.name}
                </span>
                <span className="text-xs flex font-bold flex-row items-center gap-[1px]">
                  {filter.selected}
                  <DynamicIcon iconName={"ChevronDown"} size={"12"} />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="relative">
        <button
          id="feature-button"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Click Me
        </button>

        <Hotspot
          targetId="feature-button"
          message="This is an important button!"
          buttonLabel="Alles klar!"
          step={1}
          totalSteps={3}
          onNext={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      {Object.entries(groupedDevices).map(([room, devices]) => (
        <div key={room}>
          <h2 className="font-bold">{getRoomName(room as Room)}</h2>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {devices.map((device: any) => (
              <div key={device.id}>
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
