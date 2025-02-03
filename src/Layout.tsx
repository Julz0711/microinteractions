import React from "react";
import TopNavigation from "./components/topNavigation";
import AppRouter from "./routes/Router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center gap-4 p-8 bg-dark">
      <div className="relative overflow-hidden w-[400px] h-[850px] flex flex-col gap-8 px-800 pb-800 items-start justify-start border rounded-[2rem] bg-light">
        <TopNavigation />
        <div className="pt-32">
          <AppRouter />
        </div>
        {children}
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
