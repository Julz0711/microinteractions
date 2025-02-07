import React, { useState } from "react";
import { TopNavigation } from "./components/TopNavigation";
import AppRouter from "./routes/Router";
import { NewButton } from "./components/NewButton";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center gap-4 p-8 bg-dark">
      <div className="relative overflow-hidden w-[400px] h-[850px] flex flex-col gap-8 pb-5 items-start justify-start border rounded-[2rem] bg-light">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute inset-0 z-30 bg-dark/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
        <TopNavigation />
        <div className="px-5 w-full">
          <AppRouter />
        </div>
        {children}
        <NewButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
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
