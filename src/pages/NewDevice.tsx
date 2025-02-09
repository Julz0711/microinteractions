import { motion } from "framer-motion";
import { TopContextBar } from "../components/TopContextBar";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "../components/DynamicIcon";

const NewDevice = () => {
  const sonarWave =
    "absolute top-0 left-0 w-full h-full rounded-full bg-red opacity-0 z-[-1] pointer-events-none";
  return (
    <div>
      <TopContextBar
        icon={undefined}
        headline={"Gerätescan"}
        metaDescription={"3 neue Geräte gefunden"}
        rightIcon={false}
      />
      <div className="relative flex items-center justify-center h-96">
        <div className="relative z-0">
          <div className="relative m-8 w-16 h-16 rounded-full bg-red">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <DynamicIcon iconName={"Bluetooth"} />
            </div>
            <div
              className={twMerge(
                sonarWave,
                "animate-[sonarWaveAnimation_2s_linear_infinite]"
              )}
            ></div>
            <div
              className={twMerge(
                sonarWave,
                "animate-[sonarWaveAnimation_2s_0.5s_linear_infinite]"
              )}
            ></div>
            <div
              className={twMerge(
                sonarWave,
                "animate-[sonarWaveAnimation_2s_1s_linear_infinite]"
              )}
            ></div>
            <div
              className={twMerge(
                sonarWave,
                "animate-[sonarWaveAnimation_2s_1.5s_linear_infinite]"
              )}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDevice;
