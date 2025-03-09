import Button from "../components/Button";
import GlowBoys from "../components/GlowBoyz";
import AppleLogo from "../assets/icons/apple.png";
import DynamicIcon from "../components/DynamicIcon";

const Login = () => {
  return (
    <div className="fixed inset-0 pb-5 px-5 h-full  flex flex-col justify-between gap-8">
      <div className="w-6/7 mx-auto mt-8">
        <GlowBoys />
      </div>
      <div className="w-3/4 mx-auto grow flex flex-col justify-center">
        <div className="text-[1.75rem] text-center font-bold">Willkommen</div>
        <div className="text-md text-center font-normal">
          Entdecke Dein Zuhause neu!
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 items-center pb-4">
        <Button
          icon="Envelope"
          label={"Registrieren"}
          style={"btn-primary"}
          link={"/registrieren"}
          islarge
        ></Button>
        <div className="flex gap-3 items-center">
          <span className="bg-uwu/50 flex-1 w-20 h-[2px]"></span>
          <span className="font-bold text-uwu/50">oder</span>
          <span className="bg-uwu/50 flex-1 w-20 h-[2px]"></span>
        </div>
        <div className="flex gap-4 w-full">
          <button
            className={
              "bg-light !text-black border-uwu/50 border-[1px] gap-2 items-center p-2 rounded-sm flex-auto w-1/2 flex justify-center"
            }
          >
            <img src={AppleLogo} height={30} width={30} /> Apple
          </button>

          <button
            className={
              "bg-light !text-black border-uwu/50 border-[1px] flex gap-2 items-center p-2 rounded-sm flex-auto w-1/2 justify-center"
            }
          >
            <DynamicIcon iconName="google_color" /> Google
          </button>
        </div>
        <div className="mt-4 text-uwu">
          Du hast bereits einen Account?{" "}
          <span className="text-red font-bold cursor-pointer">Anmelden</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
