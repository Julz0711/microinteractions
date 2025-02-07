import ScrollableNavBar from "../components/ScrollableNavBar";
import GlowBoyz from "../assets/img/glow_boys.png";
import Button from "../components/Button";
import HeadlineWithLink from "../components/HeadlineWithLink";
import DeviceBox from "../components/DeviceBox";
import { DashboardGrid } from "../components/DashboardGrid/DashboardGrid";
import { hierarchyStep } from "../types/dashboard.types";
import { devices } from "../data/data";

interface DashboardProps {
  hasDevices?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ hasDevices = false }) => {
  const activeDeviceAmount = 9;
  return (
    <div>
      <div className="scrollable-nav-bar overflow-x-auto w-full">
        <ScrollableNavBar />
      </div>
      {hasDevices ? (
        <div className="w-full py-4 flex flex-col gap-4 justify-start items-start">
          <DashboardGrid hierarchy={hierarchyStep.Device} />
          <div>
            <p className="text-meta">{activeDeviceAmount} Aktive Geräte</p>
            <div>hier alle aktiven</div>
          </div>
          <div className="flex flex-col gap-400">
            <HeadlineWithLink headline="Szenen" link="/szenen" />
          </div>
          <div className="flex flex-col gap-400">
            <HeadlineWithLink headline="Favoriten" link="/szenen" />
            <div className="flex flex-row gap-600">
              {devices
                .filter(
                  (device: {
                    name: string;
                    icon: string;
                    color: string;
                    active: boolean;
                    isFavorite: boolean;
                    additional: string;
                  }) => device.isFavorite
                )
                .map(
                  (
                    device: {
                      name: string;
                      icon: string;
                      color: string;
                      active: boolean;
                      isFavorite: boolean;
                      additional: string;
                    },
                    index
                  ) => (
                    <div key={index}>
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
                  )
                )}
            </div>
          </div>
          <div className="flex flex-col gap-400">
            <HeadlineWithLink headline="Zeitpläne" link="/szenen" />
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
