import DynamicIcon from "../components/DynamicIcon";
import { AppState } from "../store/store";
import { useSelector } from "react-redux";

const settings1 = [
  {
    icon: "User",
    title: "Account",
  },
  {
    icon: "Lock",
    title: "Privatsphäre",
  },
  {
    icon: "Settings",
    title: "Erweiterte Einstellungen",
  },
];

const settings2 = [
  {
    icon: "Home",
    title: "Homes",
  },
  {
    icon: "Connect",
    title: "Hubs & Bridges",
  },
];

const Profile = () => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  return (
    <div className="pt-32 flex flex-col gap-4 items-center w-full justify-center">
      <div className="flex flex-col gap-6 mb-4 items-center w-full justify-center">
        <div className="avatar">
          <div className="ring-red ring-4 ring-offset-base-800 w-40 rounded-full  ring-offset-4">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="font-bold text-xl text-dark">Alex Smart</div>
      </div>
      <div className="p-4 rounded-md border-2 border-red w-full flex flex-col gap-2 items-start justify-start">
        <h2 className="font-bold">Hier geht es zum Usability-Test:</h2>
        <a
          className="btn-sm"
          target="_blank"
          href={
            hasMicrointeractions
              ? "https://docs.google.com/forms/d/e/1FAIpQLSehxLLLh23hDtWpfjFUr3wb91Ag9vWfbxqTaJZScyHoY2aVzg/viewform?usp=header"
              : "https://docs.google.com/forms/d/e/1FAIpQLSfBxdORxT6FbVjnZaPStTDOFkIPU6MEK17tDthR65jTN8SepA/viewform?usp=header"
          }
        >
          Zum Test
        </a>
      </div>
      <div className="bg-inactive p-5 w-full rounded-md flex flex-col gap-6">
        {settings1.map((setting, index) => (
          <div key={index} className="">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-3">
                <div className="flex items-center justify-center">
                  <DynamicIcon
                    iconName={setting.icon}
                    size="18"
                    color="text-dark"
                  />
                </div>

                <div className="text-dark font-normal">{setting.title}</div>
              </div>
              <DynamicIcon
                iconName={"ChevronRight"}
                size="18"
                color="text-uwu"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-inactive p-5 w-full rounded-md flex flex-col gap-6">
        {settings2.map((setting, index) => (
          <div key={index} className="">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2">
                <div className="flex items-center justify-center">
                  <DynamicIcon iconName={setting.icon} size="20" />
                </div>

                <div className="text-dark font-normal">{setting.title}</div>
              </div>
              <DynamicIcon
                iconName={"ChevronRight"}
                size="18"
                color="text-uwu"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
