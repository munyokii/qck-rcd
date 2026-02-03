// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="swap swap-rotate">
      {/* Hidden checkbox controls the state */}
      <input 
        type="checkbox" 
        onChange={() => setTheme(theme === "bumblebee" ? "halloween" : "bumblebee")}
        checked={theme === "halloween"} 
      />

      {/* Sun Icon (Visible when theme is bumblebee/light) */}
      <Sun className="swap-off h-6 w-6 fill-current" />

      {/* Moon Icon (Visible when theme is halloween/dark) */}
      <Moon className="swap-on h-6 w-6 fill-current" />
    </label>
  );
}