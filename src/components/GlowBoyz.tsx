import Lottie from "react-lottie";
import glowBoyzAnimation from "../assets/lottie/glow_boyz_animation.json";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";

type GlowBoyzProps = {
  isGray?: boolean;
};

const GlowBoyz: React.FC<GlowBoyzProps> = ({ isGray }) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  return (
    <div className={twMerge(isGray && "grayscale-100")}>
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
