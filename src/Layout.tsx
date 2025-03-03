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
  const [showNewButton, setShowNewButton] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const location = useLocation();
  const scrollableRef = useRef<HTMLDivElement>(null);
  const observer = useRef<MutationObserver | null>(null);

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
    const attachScrollListener = () => {
      if (!scrollableRef.current) {
        console.warn("❌ Scroll container not found! Retrying...");
        return;
      }

      console.log("✅ Scroll container found:", scrollableRef.current);
      setIsReady(true);

      const handleScroll = () => {
        console.log(
          "🔄 Scrolling detected! scrollTop:",
          scrollableRef.current!.scrollTop
        );
        setIsScrolled(scrollableRef.current!.scrollTop > 0);
      };

      scrollableRef.current.addEventListener("scroll", handleScroll);
      handleScroll(); // Check on mount

      return () => {
        scrollableRef.current?.removeEventListener("scroll", handleScroll);
      };
    };

    attachScrollListener();

    // ✅ Detect changes in the scroll container using MutationObserver
    if (observer.current) observer.current.disconnect();

    observer.current = new MutationObserver(() => {
      console.log("🔄 DOM changed, re-attaching scroll listener...");
      attachScrollListener();
    });

    if (scrollableRef.current) {
      observer.current.observe(scrollableRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [location.pathname]); // Re-run when the route changes

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
