// src/context/useNavigationContext.ts
import { useContext } from "react";
import NavigationContext from "./NavegationContext";

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationContext debe usarse dentro de NavigationProvider"
    );
  }
  return context;
}
