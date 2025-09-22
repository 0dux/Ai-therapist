"use client";
import { AudioWaveform, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SignIn from "./auth/SignIn";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";

const Header = () => {
  let counter = 0;
  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About Meditio" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="w-full fixed top-0z-50 bg-background/95 backdrop-blur">
        <div className="absolute inset-0 border-b border-primary/10" />
        <header className="flex items-center justify-between h-16 relative max-w-7xl mx-auto px-4 py-2">
          <div className="hover:opacity-80 transition-opacity duration-500">
            <Link href={"/"} className="flex items-center space-x-2 ">
              <AudioWaveform className="w-7 h-7 text-primary animate-pulse duration-100" />
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 transition-opacity hover:opacity-80 text-transparent bg-clip-text">
                  Meditio
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <SignIn />
              <Button
                variant={"ghost"}
                size={"icon"}
                className="md:hidden hover:cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </header>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col absolute top-20 left-10">
          {navItems.map((item) => (
            <div className="flex flex-col md:hidden">
              <Link
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                href={item.href}
                key={counter++}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
