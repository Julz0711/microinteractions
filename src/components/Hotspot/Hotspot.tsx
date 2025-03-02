import { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Button from "../Button";

interface HotspotProps {
  targetId: string;
  message: string;
}

const Hotspot: React.FC<HotspotProps> = ({ targetId, message }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const isHolding = useRef(false);

  useLayoutEffect(() => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      return;
    }

    const top = targetElement.offsetTop + targetElement.offsetHeight / 2;
    const left = targetElement.offsetLeft + targetElement.offsetWidth / 2;

    setPosition({ top, left });

    gsap.to(".hotspot-dot", {
      opacity: 1,
      scale: 1.4,
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

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div
        className="absolute cursor-pointer z-50"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: "translate(-50%, -50%)",
        }}
        onClick={handleClick}
        onMouseDown={handleHoldStart}
        onMouseEnter={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onMouseLeave={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
      >
        <motion.div
          className="absolute w-8 h-8 left-1/2 top-1/2 0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/80"
          animate={{
            scale: [1, 1.6],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.8,
          }}
        />

        <div className="hotspot-dot w-4 h-4 bg-red rounded-full shadow-[0_0_15px_4px_rgba(255,0,0,0.6)]"></div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-dark/50 backdrop-blur-[2px] z-80"
            onClick={handleClose}
          ></div>

          <motion.div
            className="absolute z-90 p-3 bg-light shadow-lg rounded-md w-60"
            style={{
              top: `${position.top + 30}px`,
              left: `${position.left}px`,
              transform: "translateX(-50%)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-gray-700">{message}</p>
            <Button
              onClick={handleClose}
              isSmall={true}
              label="Alles klar!"
              style={"btn-sm"}
            ></Button>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Hotspot;
