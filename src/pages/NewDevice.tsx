import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { TopContextBar } from "../components/TopContextBar";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "../components/DynamicIcon";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Overlay } from "../components/Overlay";
import { useEffect, useState } from "react";

const NewDevice = () => {
  const sonarWave =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto w-full h-full rounded-full border-2 border-red opacity-0 z-[-1] pointer-events-none";
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const positions = [
    { top: -50, left: -70, icon: "Laptop" },
    { top: 40, left: 100, icon: "Lamp" },
    { top: 100, left: -20, icon: "Pluh" },
  ];
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.15 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * (0.85 * index),
        duration: 0.5,
      },
    }),
  };

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-around gap-8 h-full">
      <div className="grow-0">
        <TopContextBar
          leftIcon={"ChevronLeft"}
          headline={"Gerätescan"}
          metaDescription={"3 neue Geräte gefunden"}
          rightIcon={"Camera"}
          rightIconBg={false}
        />
      </div>

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
                  ? "animate-[sonarWaveAnimation_6s_linear_infinite]"
                  : "bg-red scale-[2] opacity-15"
              )}
            ></div>
            <div
              className={twMerge(
                sonarWave,
                hasMicrointeractions
                  ? "animate-[sonarWaveAnimation_6s_1.5s_linear_infinite]"
                  : "bg-red scale-[3] opacity-15"
              )}
            ></div>
            <div
              className={twMerge(
                sonarWave,
                hasMicrointeractions
                  ? "animate-[sonarWaveAnimation_6s_3s_linear_infinite]"
                  : "bg-red scale-[4] opacity-15"
              )}
            ></div>
            <div
              className={twMerge(
                sonarWave,
                hasMicrointeractions
                  ? "animate-[sonarWaveAnimation_6s_4.5s_linear_infinite]"
                  : "bg-red scale-[5] opacity-15"
              )}
            ></div>
            {positions.map((position, index) => (
              <motion.div
                onClick={() => {
                  navigate("/geraet-registrieren");
                }}
                key={index}
                className="cursor-pointer absolute w-12 h-12 flex items-center justify-center rounded-full bg-red"
                style={{ top: position.top, left: position.left }}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={iconVariants}
              >
                <DynamicIcon
                  iconName={position.icon}
                  color="text-light"
                  size={"24"}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-2 text-center text-uwu">
        <p className="w-3/4">
          Tippe auf das Gerät, das hinzugefügt werden soll
        </p>
        <div className="relative w-1/3 flex justify-center">
          <div className="bg-light p-2 flex z-20">oder</div>
          <hr className="w-full absolute top-1/2 -translate-y-1/2 z-10"></hr>
        </div>
      </div>
      <div className="grow-0 w-full bg-dark/80 p-4 rounded-md flex flex-col gap-4">
        <p className="text-center text-light">
          Das Gerät wir nicht angezeigt? Stelle sicher, dass es angeschaltet, in
          der Nähe Deines Routers und erreichbar ist.
        </p>
        <Button
          label={"Manuelles Gerätesetup"}
          style={"bg-dark"}
          link={"/"}
          isLarge={true}
        />
      </div>
    </div>
  );
};

export default NewDevice;
