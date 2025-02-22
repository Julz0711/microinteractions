import React, { useEffect, useState } from "react";
import AppRouter from "./routes/Router";
import { NewButton } from "./components/NewButton";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Overlay } from "./components/Overlay";
import { TopNavigation } from "./components/topNavigation";

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          "relative z-10 layout overflow-hidden translate-x-0 no-scrollbar sm:w-[400px] sm:h-[850px] max-h-screen w-screen flex flex-col items-start justify-start sm:rounded-[3rem] sm:border-8 sm:border-dark sm:ring-2 sm:ring-[#666] bg-light"
        )}
      >
        {showNewButton && <TopNavigation isScrolled={isScrolled} />}
        <AppRouter onScroll={handleScroll} showNewButton={showNewButton} />
        {showNewButton && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-90">
            <NewButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        )}
        <Overlay isMenuOpen={isMenuOpen} />
      </div>
    </div>
  );
};

export default Layout;
