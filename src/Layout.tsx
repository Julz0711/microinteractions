import React, { useEffect, useRef, useState } from "react";
import AppRouter from "./routes/Router";
import { NewButton } from "./components/NewButton";
import { twMerge } from "tailwind-merge";
import { Overlay } from "./components/Overlay";
import { TopNavigation } from "./components/TopNavigation";
import { useLocation } from "react-router-dom";

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [showNewButton, setShowNewButton] = useState(true);

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

  useEffect(() => {
    const shouldShowNewButton = !restrictedPaths.some((path) =>
      location.pathname.startsWith(path)
    );
    setShowNewButton(shouldShowNewButton);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const scrollContainer = scrollableRef.current;

    if (!scrollContainer) {
      console.log("scrollableRef is not attached");
      return;
    }

    const handleScroll = () => {
      console.log("Scrolling detected! scrollTop:", scrollContainer.scrollTop);
      setIsScrolled(scrollContainer.scrollTop > 0);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sm:h-screen sm:w-screen flex items-center justify-center sm:p-8">
      <div
        className={twMerge(
          "relative z-10 layout overflow-auto translate-x-0 no-scrollbar sm:w-[400px] sm:h-[850px] max-h-screen h-screen w-screen flex flex-col items-start justify-start sm:rounded-[2.5rem] sm:border-8 sm:border-dark sm:ring-2 sm:ring-[#666] bg-light"
        )}
      >
        {showNewButton && <TopNavigation isScrolled={isScrolled} />}
        <AppRouter
          showNewButton={showNewButton}
          scrollableRef={scrollableRef}
        />
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
