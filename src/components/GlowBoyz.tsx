import Lottie from "react-lottie";
import glowBoyzAnimation from "../assets/lottie/glow_boyz_animation.json";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import DynamicIcon from "./DynamicIcon";

type GlowBoyzProps = {
  isGray?: boolean;
};

const GlowBoyz: React.FC<GlowBoyzProps> = ({ isGray }) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  return (
    <div
      className={twMerge(
        isGray && "grayscale-100",
        !hasMicrointeractions && "pointer-events-none",
        "relative"
      )}
    >
      <span className="absolute left-1/2 top-1/2 transform -translate-x-[45%] -translate-y-[45%] z-10">
        <DynamicIcon iconName="Home" size="24" />
      </span>
      <Lottie
        options={{
          loop: hasMicrointeractions ? true : false,
          autoplay: hasMicrointeractions ? true : false,
          animationData: glowBoyzAnimation,
        }}
      />
    </div>
  );
};

export default GlowBoyz;
