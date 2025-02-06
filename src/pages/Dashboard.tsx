import ScrollableNavBar from "../components/scrollableNavBar";
import GlowBoyz from "../assets/img/glow_boys.png";
import Button from "../components/button";
import HeadlineWithLink from "../components/headlineWithLink";
import DeviceBox from "../components/deviceBox";

interface DashboardProps {
  hasDevices?: boolean;
}

const favoriteDevices = [
  {
    id: 1,
    icon: "FaLightbulb",
    name: "Leselampe",
    active: true,
    color: "bg-yellow",
  },
  {
    id: 2,
    icon: "FaLightbulb",
    name: "Deckenleuchte",
    active: false,
    color: "bg-yellow",
  },
];

const Dashboard: React.FC<DashboardProps> = ({ hasDevices = false }) => {
  const activeDeviceAmount = 9;
  return (
    <div>
      <div className="scrollable-nav-bar overflow-x-auto w-full">
        <ScrollableNavBar />
      </div>
      {hasDevices ? (
        <div className="w-full py-4 flex flex-col gap-900 justify-start items-start">
          {/*<DeviceGrid />*/}
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
              {favoriteDevices.map((device) => (
                <div key={device.id}>
                  <DeviceBox
                    deviceName={device.name}
                    icon={device.icon}
                    activeColor={device.color}
                    hasAdditionalInfo={true}
                    hasToggle={true}
                    isActive={device.active}
                  />
                </div>
              ))}
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
