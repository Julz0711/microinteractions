import React, { createContext, useContext, useState, ReactNode } from "react";

interface MicrointeractionContextProps {
  hasMicrointeractions: boolean;
  setHasMicrointeractions: React.Dispatch<React.SetStateAction<boolean>>;
}

const MicrointeractionContext = createContext<
  MicrointeractionContextProps | undefined
>(undefined);

export const MicrointeractionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hasMicrointeractions, setHasMicrointeractions] = useState(true);

  return (
    <MicrointeractionContext.Provider
      value={{ hasMicrointeractions, setHasMicrointeractions }}
    >
      {children}
    </MicrointeractionContext.Provider>
  );
};

export const useMicrointeractionContext = () => {
  const context = useContext(MicrointeractionContext);
  if (!context) {
    throw new Error(
      "useMicrointeractionContext must be used within a MicrointeractionProvider"
    );
  }
  return context;
};
