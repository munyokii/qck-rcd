"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="swap swap-rotate">
      <input 
        type="checkbox" 
        onChange={() => setTheme(theme === "bumblebee" ? "halloween" : "bumblebee")}
        checked={theme === "halloween"} 
      />

      <Sun className="swap-on h-6 w-6" />

      <Moon className="swap-off h-6 w-6" />
    </label>
  );
}