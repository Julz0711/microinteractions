import DynamicIcon from '../components/DynamicIcon';
import { AppState } from '../store/store';
import { useSelector } from 'react-redux';

const settings1 = [
  {
    icon: 'User',
    title: 'Account'
  },
  {
    icon: 'Lock',
    title: 'Privatsphäre'
  },
  {
    icon: 'Settings',
    title: 'Erweiterte Einstellungen'
  }
];

const settings2 = [
  {
    icon: 'Home',
    title: 'Homes'
  },
  {
    icon: 'Connect',
    title: 'Hubs & Bridges'
  }
];

const Profile = () => {
  return (
    <div className="pt-32 flex flex-col gap-4 items-center w-full justify-center">
      <div className="flex flex-col gap-6 items-center w-full justify-center">
        <div className="avatar">
          <div className="ring-red ring-4 ring-offset-base-800 w-40 rounded-full ring ring-offset-4">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="font-bold text-xl text-dark">Alex Smart</div>
      </div>
      <div className="bg-inactive p-5 mt-4 w-full rounded-md flex flex-col gap-6">
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
                iconName={'ChevronRight'}
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
                iconName={'ChevronRight'}
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
