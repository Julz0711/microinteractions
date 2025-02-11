import React, { useEffect, useState } from "react";
import { TopNavigation } from "./components/TopNavigation";
import AppRouter from "./routes/Router";
import { NewButton } from "./components/NewButton";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState("100%");
  const location = useLocation();

  const showNewButton = ![
    "/neuer-raum",
    "/neues-geraet",
    "/neue-szene",
    "/registrieren",
    "/geraet-registrieren",
    "/login",
  ].includes(location.pathname);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const layoutElement = document.querySelector(".layout");
    if (layoutElement) {
      setOverlayHeight(`${layoutElement.scrollHeight}px`);
    }
    if (isMenuOpen) {
      layoutElement?.classList.add("overflow-y-hidden");
      layoutElement?.classList.remove("overflow-y-scroll");
    } else {
      layoutElement?.classList.remove("overflow-y-hidden");
      layoutElement?.classList.add("overflow-y-scroll");
    }
  }, [isMenuOpen]);

  return (
    <div className="h-screen w-screen flex items-center justify-center gap-4 p-8 bg-dark">
      <div className="layout overflow-hidden relative no-scrollbar w-[400px] h-[850px] flex flex-col gap-8 items-start justify-start border rounded-[2rem] bg-light">
        {showNewButton && <TopNavigation />}
        <div className="px-5 w-full h-full">
          <AppRouter />
        </div>

        {showNewButton && (
          <>
            <NewButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="absolute inset-0 z-30 bg-dark/30 backdrop-blur-[2px] h-full w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ height: overlayHeight, width: "100%" }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Introduction Section 
      <div className="p-8 border-light border-2 rounded-[2rem] shadow-md">
        <h1 className="text-2xl text-light font-bold mb-4">
          Microinteractions A/B-TEst
        </h1>
        
        <p className="text-light mb-4">
          This is a simulation of a mobile phone for testing purposes. On the
          left, you can interact with the "phone" interface.
        </p>
        <p className="text-light">
          The content inside the phone is scrollable. However, the rest of the
          screen remains static, allowing you to focus on the simulation
          experience.
        </p>
      </div>*/}
    </div>
  );
};

export default Layout;
