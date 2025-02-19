import React, { useEffect, useState } from 'react';
import { TopNavigation } from './components/TopNavigation';
import AppRouter from './routes/Router';
import { NewButton } from './components/NewButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState('100%');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const restrictedPaths = [
    '/neuer-raum',
    '/neues-geraet',
    '/neue-szene',
    '/registrieren',
    '/geraet-registrieren',
    '/login'
  ];

  const showNewButton = !restrictedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const layoutElement = document.querySelector('.layout');
    if (layoutElement) {
      setOverlayHeight(`${layoutElement.scrollHeight}px`);
    }
    if (isMenuOpen) {
      layoutElement?.classList.add('overflow-y-hidden');
      layoutElement?.classList.remove('overflow-y-scroll');
    } else {
      layoutElement?.classList.remove('overflow-y-hidden');
      layoutElement?.classList.add('overflow-y-scroll');
    }
  }, [isMenuOpen]);

  const handleScroll = (scrollY: number) => {
    setIsScrolled(scrollY > 0);
  };

  useEffect(() => {
    console.log(showNewButton);
  }, [showNewButton]);

  return (
    <div className="h-screen w-screen flex items-center justify-center p-8 bg-dark">
      <div
        className={twMerge(
          'layout overflow-hidden relative no-scrollbar w-[400px] h-[850px] flex flex-col items-start justify-start border rounded-[2rem] bg-light'
        )}
      >
        {showNewButton && <TopNavigation isScrolled={isScrolled} />}
        <AppRouter onScroll={handleScroll} showNewButton={showNewButton} />
        {showNewButton && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <NewButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        )}
        {showNewButton && (
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute inset-0 z-30 bg-dark/30 backdrop-blur-[2px] h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ height: overlayHeight, width: '100%' }}
              />
            )}
          </AnimatePresence>
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
