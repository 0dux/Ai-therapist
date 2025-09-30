"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => {
        console.log("Theme changed!!!" + theme);

        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Theme toggle</span>
    </Button>
  );
};

export default ThemeToggle;
