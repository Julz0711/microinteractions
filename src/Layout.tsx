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
  const [, setRetryCount] = useState(0);

  const location = useLocation();
  const scrollableRef = useRef<HTMLDivElement>(null);
  const observer = useRef<MutationObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    let retries = 0;

    const attachScrollListener = () => {
      if (!scrollableRef.current) {
        if (retries < 10) {
          retries++;
          setRetryCount(retries);
          timeoutRef.current = setTimeout(() => {
            requestAnimationFrame(attachScrollListener);
          }, 100);
        }
        return;
      }

      const scrollContainer = scrollableRef.current;
      const handleScroll = () => {
        setIsScrolled(scrollContainer.scrollTop > 0);
      };

      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    };

    attachScrollListener();

    if (observer.current) observer.current.disconnect();

    observer.current = new MutationObserver(() => {
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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location.pathname]);

  return (
    <div className="sm:h-screen sm:w-screen flex items-center justify-center sm:p-8  h-[100dvh]">
      <div
        className={twMerge(
          "relative z-10 layout overflow-hidden translate-x-0 no-scrollbar sm:w-[400px] sm:h-[850px] max-h-screen h-[100dvh] w-screen justify-start sm:rounded-[2.5rem] sm:border-8 sm:border-dark sm:ring-2 sm:ring-[#666] bg-light"
        )}
      >
        {showNewButton && <TopNavigation isScrolled={isScrolled} />}
        <AppRouter
          showNewButton={showNewButton}
          scrollableRef={scrollableRef}
        />
        {showNewButton && (
          <div className="sticky bottom-12 left-1/2 transform -translate-x-1/2 z-90 inline-block">
            <NewButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        )}
        <Overlay isMenuOpen={isMenuOpen} />
      </div>
    </div>
  );
};

export default Layout;
