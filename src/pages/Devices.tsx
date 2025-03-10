import { useEffect, useState } from "react";
import DevicePreview from "../components/DevicePreview";
import DynamicIcon from "../components/DynamicIcon";
import InputField from "../components/InputField";
import { devices } from "../data/data";
import { getRoomName } from "../helpers/helpers";
import { Room } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/store";
import Hotspot from "../components/Hotspot/Hotspot";
import { twMerge } from "tailwind-merge";
import { setCategory, setHierarchy } from "../store/reducer";
import { HierarchyStep } from "../types/dashboard.types";

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
  const [showHotspot, setShowHotspot] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const hotspotSeen = localStorage.getItem("deviceHotspotSeen");
    dispatch(setHierarchy(HierarchyStep.SmartHomeGrid));
    dispatch(setCategory(null));
    if (!hotspotSeen) {
      setShowHotspot(true);
    }
  }, []);

  const handleHotspotNext = () => {
    localStorage.setItem("deviceHotspotSeen", "true");
    setShowHotspot(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredDevices = devices
    .filter((device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 15);

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
      {Object.entries(groupedDevices).map(([room, devices]) => (
        <div key={room}>
          <h2 className="font-bold">{getRoomName(room as Room)}</h2>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {devices.map((device: any, index: number) => (
              <div key={device.id} className="relative">
                <DevicePreview device={device} hasToggle={true} />
                {room === "livingRoom" && index === 0 && (
                  <div
                    className={twMerge(
                      showHotspot ? "" : "pointer-events-none",
                      "absolute top-0 left-0 w-[200%] h-[200%]"
                    )}
                  >
                    <div className="w-full h-full" id="device"></div>
                    {/*{hasMicrointeractions && showHotspot && (
                      <Hotspot
                        targetId="device"
                        header="Geräte"
                        message="Hier siehst du alle deine Geräte auf einen Blick. Mit dem Toggle kannst Du ein Gerät an- oder ausschalten. Mit Tap & Hold erhälst Du mehr Optionen zu dem Gerät."
                        step={1}
                        totalSteps={1}
                        onNext={handleHotspotNext}
                      />
                    )}*/}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Devices;
