import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { TopContextBar } from "../components/TopContextBar";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "../components/DynamicIcon";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NewDevice = () => {
  const sonarWave =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto w-full h-full rounded-full border-2 border-red opacity-0 z-[-1] pointer-events-none";
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const devices = [
    { top: -50, left: -100, icon: "Laptop", name: "Workstation L" },
    { top: 40, left: 90, icon: "Lamp", name: "Smart Lamp" },
    { top: 120, left: -20, icon: "Pluh", name: "Homepod" },
  ];
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: hasMicrointeractions ? 0.5 + 0.95 * index : 1 + 0.95 * index,
        duration: hasMicrointeractions ? 0.2 : 0,
      },
    }),
  };

  const navigate = useNavigate();

  const [, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pb-5 px-5 flex flex-col justify-around gap-8 min-h-full h-full">
      <TopContextBar
        leftIcon={"ChevronLeft"}
        headline={"Gerätescan"}
        metaDescription={"3 neue Geräte gefunden"}
        rightIcon={"Camera"}
        rightIconBg={false}
      />

      <div className="flex grow items-center justify-center">
        <div className="z-0">
          <div className="relative m-8 w-16 h-16 rounded-full bg-dark">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto bg-radial from-red/60 via-light via-50% to-transparent rounded-full w-[500%] h-[500%] z-[-2]"></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <DynamicIcon
                iconName={"Bluetooth"}
                color="text-light"
                size={"24"}
              />
            </div>
            <div
              className={twMerge(
                sonarWave,
                hasMicrointeractions
                  ? "animate-[sonarWaveAnimation_6s_-6s_linear_infinite] opacity-0"
                  : "bg-red scale-[2] opacity-15"
              )}
            ></div>
            <div
              className={twMerge(
                sonarWave,
                hasMicrointeractions
                  ? "animate-[sonarWaveAnimation_6s_-4.5s_linear_infinite] opacity-0"
                  : "bg-red scale-[3] opacity-15"
              )}
            ></div>
            <div
              className={twMerge(
                sonarWave,
                hasMicrointeractions
                  ? "animate-[sonarWaveAnimation_6s_-3s_linear_infinite] opacity-0"
                  : "bg-red scale-[4] opacity-15"
              )}
            ></div>
            <div
              className={twMerge(
                sonarWave,
                hasMicrointeractions
                  ? "animate-[sonarWaveAnimation_6s_-1.5s_linear_infinite] opacity-0"
                  : "bg-red scale-[5] opacity-15"
              )}
            ></div>
            {devices.map((device, index) => (
              <motion.div
                onClick={() => {
                  navigate("/geraet-registrieren");
                }}
                key={index}
                className="cursor-pointer absolute flex justify-center items-center gap-1 flex-col"
                style={{ top: device.top, left: device.left }}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={iconVariants}
              >
                <div className=" w-12 h-12 flex items-center justify-center rounded-full bg-red">
                  <DynamicIcon
                    iconName={device.icon}
                    color="text-light"
                    size={"24"}
                  />
                </div>
                <span className="text-xs font-bold whitespace-nowrap">
                  {device.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-2 text-center text-dark font-bold z-60 mb-2">
        <p className="w-3/4">
          Tippe auf das Gerät, <br />
          das hinzugefügt werden soll
        </p>
        {/* <div className="relative w-1/3 flex justify-center">
          <div className="bg-light p-2 flex z-20">oder</div>
          <hr className="w-full absolute top-1/2 -translate-y-1/2 z-10"></hr>
        </div> */}
      </div>
      {/* <div className="grow-0 w-full bg-dark/80 p-4 rounded-md flex flex-col gap-4">
        <p className="text-center text-light text-sm">
          Das Gerät wir nicht angezeigt? Stelle sicher, dass es angeschaltet, in
          der Nähe Deines Routers und erreichbar ist.
        </p>
        <Button
          label={"Manuelles Gerätesetup"}
          style={"bg-dark"}
          isLarge={true}
          link={""}
        />
      </div> */}
    </div>
  );
};

export default NewDevice;
