
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme as "light" | "dark");
    applyTheme(initialTheme as "light" | "dark");
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = window.document.documentElement;
    const isDark = newTheme === "dark";
    
    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = (value: string) => {
    if (value) {
      const newTheme = value as "light" | "dark";
      setTheme(newTheme);
      applyTheme(newTheme);
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={toggleTheme}
      variant="outline"
      className="border rounded-full"
    >
      <ToggleGroupItem value="light" aria-label="Toggle light mode" className="rounded-l-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Toggle dark mode" className="rounded-r-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ThemeToggle;
