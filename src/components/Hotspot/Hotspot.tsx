import { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Button from "../Button";
import DynamicIcon from "../DynamicIcon";

interface HotspotProps {
  targetId: string;
  message: string;
  buttonLabel?: string;
  step: number;
  totalSteps: number;
  onNext: () => void;
}

const Hotspot: React.FC<HotspotProps> = ({
  targetId,
  message,
  buttonLabel,
  step,
  totalSteps,
  onNext,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const isHolding = useRef(false);

  useLayoutEffect(() => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      return;
    }

    const top = targetElement.offsetTop + targetElement.offsetHeight / 5;
    const left = targetElement.offsetLeft + targetElement.offsetWidth / 5;

    setPosition({ top, left });

    gsap.to(".hotspot-dot", {
      opacity: 1,
      scale: 1.2,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "power1.inOut",
    });
  }, [targetId]);

  const handleClick = () => {
    if (!isHolding.current) {
      setIsOpen(!isOpen);
    }
  };

  const handleHoldStart = () => {
    isHolding.current = true;
    holdTimer.current = setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };

  const handleHoldEnd = () => {
    isHolding.current = false;
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
  };

  const handleNext = () => {
    setIsOpen(false);
    onNext();
  };
  return (
    <>
      <div
        className="absolute cursor-pointer z-10"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: "translate(-50%, -50%)",
        }}
        onClick={handleClick}
        onMouseDown={handleHoldStart}
        //onMouseEnter={handleHoldStart}
        onMouseUp={handleHoldEnd}
        //onMouseLeave={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
      >
        <motion.div
          className="absolute w-10 h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-info-blue"
          initial={{
            scale: 1,
            opacity: 0.8,
          }}
          animate={{
            scale: 1.2,
            opacity: 0,
          }}
          exit={{
            scale: 1,
            opacity: 0.8,
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.8,
          }}
        />

        <div className="hotspot-dot relative w-5 h-5 bg-info-blue rounded-full shadow-[0_0_16px_rgba(15,15,15,0.5)]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-light text-[10px]">
            ?
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed w-full h-full inset-0 bg-dark/30 backdrop-blur-[2px] z-[998]"
            onClick={handleNext}
          ></div>

          <motion.div
            className="absolute z-[999] p-3 bg-light shadow-xl rounded-md w-2/3"
            style={{
              top: `${position.top + 30}px`,
              left: `${position.left}px`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-dark text-sm flex flex-col gap-2">
              <strong>
                Schritt {step}/{totalSteps}
              </strong>
              <span className="text-xs text-dark/70 font-normal">
                {message}
              </span>
            </p>
            <Button
              onClick={handleNext}
              isSmall={true}
              label={
                buttonLabel
                  ? buttonLabel
                  : step === totalSteps
                  ? "Alles klar!"
                  : "Weiter"
              }
              style={"btn-sm mt-4"}
            ></Button>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Hotspot;
