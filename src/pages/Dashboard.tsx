import ScrollableNavBar from "../components/scrollableNavBar";
import GlowBoyz from "../assets/img/glow_boys.png";
import { Link } from "react-router-dom";
import Button from "../components/button";

const Dashboard = () => {
  const hasDevices = false;
  return (
    <div>
      <div className="scrollable-nav-bar overflow-x-auto w-full">
        <ScrollableNavBar />
      </div>
      {hasDevices ? (
        <div>jo</div>
      ) : (
        <div className="w-full flex flex-col gap-1 py-8 justify-center items-center">
          <img src={GlowBoyz} className="w-64" />
          <h1 className="text-lg mt-8">Noch keine Geräte registriert</h1>
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
