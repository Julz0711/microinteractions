import ScrollableNavBar from "../components/ScrollableNavBar";
import GlowBoyz from "../assets/img/glow_boys.png";
import Button from "../components/Button.tsx";
import HeadlineWithLink from "../components/HeadlineWithLink.tsx";
import DevicePreview from "../components/DevicePreview";
import { devices } from "../data/data";
import { RoomGrid } from "../components/DashboardGrid/RoomGrid.tsx";
import EmblaCarousel from "../components/EmblaCarousel/js/EmblaCarousel.tsx";
import { EmblaOptionsType } from "embla-carousel";

interface DashboardProps {
  hasDevices?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ hasDevices = false }) => {
  const activeDevices = devices.filter((device) => device.isActive);
  const favoriteDevices = devices.filter((device) => device.isFavorite);
  const activeDeviceAmount = activeDevices.length;
  const OPTIONS: EmblaOptionsType = { dragFree: true };
  const ACTIVE_DEVICES_SLIDES = activeDevices.map((device, index) => (
    <div key={index} className="pointer-events-none">
      <DevicePreview device={device} hasToggle={false} hasRoomName={true} />
    </div>
  ));
  const FAVORITES_DEVICES_SLIDES = favoriteDevices.map((device, index) => (
    <div key={index} className="">
      <DevicePreview device={device} hasToggle={true} hasRoomName={true} />
    </div>
  ));
  return (
    <div>
      <ScrollableNavBar />
      {hasDevices ? (
        <div className="w-full py-4 flex flex-col gap-8 justify-start items-start">
          <RoomGrid />
          <div className="w-full">
            <p className="text-meta mb-2">{activeDeviceAmount} Aktive Geräte</p>
            <EmblaCarousel
              width="flex-[0_0_auto]"
              slides={ACTIVE_DEVICES_SLIDES}
              options={OPTIONS}
            />
          </div>
          <div className="flex flex-col gap-2">
            <HeadlineWithLink headline="Szenen" link="/dashboard" />
          </div>
          <div className="w-full">
            <div className="mb-2">
              <HeadlineWithLink headline="Favoriten" link="/dashboard" />
            </div>
            <EmblaCarousel
              slides={FAVORITES_DEVICES_SLIDES}
              options={OPTIONS}
            />
          </div>
          <div className="flex flex-col gap-2">
            <HeadlineWithLink headline="Zeitpläne" link="/dashboard" />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-1 py-16 justify-center items-center">
          <img src={GlowBoyz} className="w-64" />
          <h1 className="text-lg mt-16">Noch keine Geräte registriert</h1>
          <p className="text-center">
            Bitte füge dein erstes Gerät zu diesem Raum hinzu
          </p>
          <div className="mt-4 flex flex-row gap-2">
            <Button color="bg-dark" label="Raum" link="/"></Button>
            <Button color="bg-red" label="Gerät" link="/"></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
