"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../providers/ThemeProvider";
import {
  Sun,
  Moon,
  Menu,
  X,
  Heart,
  Home,
  User,
  Camera,
  BookOpen,
  Church,
  DollarSign,
  Phone,
} from "lucide-react";

const Header = () => {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/gallery", label: "Gallery", icon: Camera },
    { href: "/eulogy", label: "Eulogy", icon: BookOpen },
    { href: "/service", label: "Service", icon: Church },
    { href: "/tributes", label: "Tributes", icon: Heart },
    { href: "/contributions", label: "Contributions", icon: DollarSign },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  // Prevent hydration mismatch with a proper loading state
  if (!mounted) {
    return (
      <nav className="fixed w-full top-0 left-0 right-0 z-50 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="h-9 w-9 text-accent-primary animate-pulse" />
              <div className="absolute inset-0 h-9 w-9 bg-accent-primary/20 rounded-full blur-sm"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-headings font-semibold text-sm text-text-primary ">
                Phoebe Wangec
              </span>
              <span className="font-body text-xs text-text-secondary -mt-1">
                Memorial Website
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface/50 animate-pulse"></div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "glass backdrop-blur-xl shadow-lg border-b border-border/30"
            : "bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm border-b border-border/20"
        }`}
      >
        <div className="w-full">
          <div className="mx-auto px-6 sm:px-10">
            <div className="flex items-center justify-between h-20">
              {/* Enhanced Logo */}
              <Link
                href="/"
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <Heart className="h-9 w-9 text-accent-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  <div className="absolute inset-0 h-9 w-9 bg-accent-primary/20 rounded-full blur-sm group-hover:bg-accent-primary/30 transition-all duration-300"></div>
                  <div className="absolute inset-0 h-9 w-9 bg-gradient-to-br from-accent-primary/40 to-transparent rounded-full scale-0 group-hover:scale-150 transition-all duration-500"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-headings font-bold text-sm text-text-secondary uppercase group-hover:text-accent-primary transition-all duration-300">
                    Phoebe Wangeci
                  </span>
                  <span className="font-body text-xs text-text-secondary -mt-1 group-hover:text-text-primary transition-colors duration-300">
                    Memorial Website
                  </span>
                </div>
              </Link>

              {/* Enhanced Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative px-4 py-2.5 text-sm font-headings font-medium cursor-pointer transition-all duration-300 flex items-center space-x-2 group rounded-xl  ${
                        active
                          ? "text-accent-primary bg-accent-primary/10 shadow-inner border border-accent-primary/20"
                          : "text-text-secondary hover:text-accent-primary glass-button hover:bg-surface/50"
                      }`}
                    >
                      <div className="relative z-10 flex items-center space-x-2">
                        <IconComponent
                          className={`h-4 w-4 transition-all duration-300 ${
                            active
                              ? "scale-110"
                              : "group-hover:scale-110 group-hover:rotate-3"
                          }`}
                        />
                        <span className="relative uppercase text-xs text-text-secondary">
                          {item.label}
                          {active && (
                            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-primary rounded-full"></div>
                          )}
                        </span>
                      </div>
                      {!active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </Link>
                  );
                })}

                {/* Enhanced Theme Toggle */}
                <div className="ml-4 pl-4 border-l border-border/30">
                  <button
                    onClick={toggleTheme}
                    className="relative glass-button p-3 cursor-pointer hover:text-accent-primary transition-all duration-300 group rounded-xl "
                    aria-label="Toggle theme"
                  >
                    <div className="relative z-10">
                      {resolvedTheme === "light" ? (
                        <Moon className="h-5 w-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <Sun className="h-5 w-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-accent-primary/20 rounded-full scale-0 group-hover:scale-150 transition-all duration-500 blur-sm"></div>
                  </button>
                </div>
              </div>

              {/* Enhanced Mobile Controls */}
              <div className="lg:hidden flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="glass-button p-2.5 cursor-pointer hover:text-accent-primary transition-all duration-300 rounded-xl group"
                  aria-label="Toggle theme"
                >
                  {resolvedTheme === "light" ? (
                    <Moon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  ) : (
                    <Sun className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  )}
                </button>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`glass-button p-2.5 cursor-pointer transition-all duration-300 rounded-xl group ${
                    isMenuOpen
                      ? "text-accent-primary bg-accent-primary/10"
                      : "hover:text-accent-primary"
                  }`}
                  aria-label="Toggle menu"
                >
                  <div className="relative">
                    <Menu
                      className={`h-6 w-6 transition-all duration-300 ${
                        isMenuOpen ? "scale-0 rotate-180" : "scale-100 rotate-0"
                      }`}
                    />
                    <X
                      className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
                        isMenuOpen
                          ? "scale-100 rotate-0"
                          : "scale-0 -rotate-180"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Enhanced Mobile Menu */}
            <div
              className={`lg:hidden transition-all duration-500 ease-out  ${
                isMenuOpen
                  ? "max-h-screen opacity-100 bg-gray-300/50"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="glass-card mt-4 mb-4 py-6 rounded-2xl border border-border/30 shadow-xl">
                <div className="space-y-1">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-4 px-6 py-4 font-headings font-medium cursor-pointer group relative  rounded-xl mx-3 transition-all duration-300 ${
                          active
                            ? "text-accent-primary bg-accent-primary/10 border border-accent-primary/20 shadow-inner"
                            : "text-text-primary hover:text-accent-primary hover:bg-surface/30"
                        }`}
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: isMenuOpen
                            ? "slideInFromRight 0.4s ease-out forwards"
                            : "none",
                        }}
                      >
                        <div className="relative z-10 flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-lg transition-all duration-300 ${
                              active
                                ? "bg-accent-primary/20 text-accent-primary"
                                : "bg-surface/50 group-hover:bg-accent-primary/10 group-hover:text-accent-primary"
                            }`}
                          >
                            <IconComponent
                              className={`h-5 w-5 transition-all duration-300 ${
                                active ? "scale-110" : "group-hover:scale-110"
                              }`}
                            />
                          </div>
                          <span className="text-base uppercase text-text-secondary font-bold">
                            {item.label}
                          </span>
                        </div>
                        {!active && (
                          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm -z-10 transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        />
      )}

      {/* Add custom keyframes for animations */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
