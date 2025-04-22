import { useState, useEffect } from "react";
import type { Tema } from "../types";

export default function UseTheme() {
  const [theme, setTheme] = useState<Tema>("dark");

  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { handleTheme, theme };
}
