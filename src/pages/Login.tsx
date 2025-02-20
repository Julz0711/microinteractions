import Button from "../components/Button";
import GlowBoys from "../components/GlowBoyz";

const Login = () => {
  return (
    <div className="h-full flex flex-col justify-between gap-8">
      <div className="w-6/7 mx-auto mt-20">
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
          icon="Google"
          label={"Mit Google registrieren"}
          style={"btn-primary"}
          link={"/registrieren"}
        ></Button>
        <Button
          icon="Envelope"
          label={"Mit E-Mail registrieren"}
          style={"btn-secondary"}
          link={"/registrieren"}
        ></Button>
        <div className="mt-4">
          Du hast bereits einen Account?{" "}
          <span className="text-uwu font-bold cursor-pointer">Anmelden</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
