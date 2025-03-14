import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Button from "../Button";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "../DynamicIcon";

interface HotspotProps {
  targetId: string;
  header: string;
  message: string;
  buttonLabel?: string;
  step: number;
  totalSteps: number;
  onNext: () => void;
}

const Hotspot: React.FC<HotspotProps> = ({
  targetId,
  header,
  message,
  buttonLabel,
  step,
  totalSteps,
  onNext,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const isHolding = useRef(false);
  const messageRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isOpen && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isOpen]);

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
        className={twMerge(isOpen ? "z-[1000]" : "z-40", "absolute")}
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
          className="absolute w-10 h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-light"
          initial={{
            scale: 0.8,
            opacity: 0.8,
          }}
          animate={{
            scale: 1.4,
            opacity: 0,
          }}
          exit={{
            scale: 0.8,
            opacity: 0.8,
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.8,
          }}
        />

        <div className="hotspot-dot cursor-pointer relative flex p-[5px] duration-150 bg-light hover:bg-dark rounded-full shadow-[0_0_16px_rgba(25,25,25,0.8)]">
          <DynamicIcon iconName={"info"} size={"18"} />
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed w-full h-full inset-0 bg-dark/30 backdrop-blur-[0px] z-[999]"
            onClick={handleNext}
          ></div>

          <motion.div
            ref={messageRef}
            className="absolute z-[999] p-3 bg-light shadow-xl rounded-md w-2/3 flex flex-col gap-2"
            style={{
              top: `${position.top + 30}px`,
              left: `${position.left}px`,
            }}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
          >
            <div className="text-dark font-bold text-sm flex flex-row justify-between gap-2">
              <span>{header}</span>
              <span className="text-uwu text-xs">
                {step}/{totalSteps}
              </span>
            </div>
            <p className="text-xs text-dark/70 font-normal">{message}</p>

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
              style={"btn-sm mt-1"}
            ></Button>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Hotspot;
