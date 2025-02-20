import React, { useEffect, useState } from "react";
import { TopNavigation } from "./components/TopNavigation";
import AppRouter from "./routes/Router";
import { NewButton } from "./components/NewButton";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState("100%");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const restrictedPaths = [
    "/start",
    "/neuer-raum",
    "/neues-geraet",
    "/neue-szene",
    "/registrieren",
    "/geraet-registrieren",
    "/login",
  ];

  const showNewButton = !restrictedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

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

  const handleScroll = (scrollY: number) => {
    setIsScrolled(scrollY > 0);
  };

  useEffect(() => {
    console.log(showNewButton);
  }, [showNewButton]);

  return (
    <div className="sm:h-screen sm:w-screen flex items-center justify-center sm:p-8">
      <div
        className={twMerge(
          "z-10 layout overflow-hidden relative no-scrollbar sm:w-[400px] sm:h-[850px] max-h-screen w-screen flex flex-col items-start justify-start sm:rounded-[3rem] sm:border-8 sm:border-dark sm:ring-2 sm:ring-yellow bg-light"
        )}
      >
        {showNewButton && <TopNavigation isScrolled={isScrolled} />}
        <AppRouter onScroll={handleScroll} showNewButton={showNewButton} />
        {showNewButton && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-90">
            <NewButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        )}
        {showNewButton && (
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute inset-0 z-80 bg-dark/30 backdrop-blur-[2px] h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ height: overlayHeight, width: "100%" }}
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Layout;
