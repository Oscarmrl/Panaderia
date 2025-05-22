// src/context/NavigationContext.tsx
import { createContext, useState } from "react";

export type NavigationContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
