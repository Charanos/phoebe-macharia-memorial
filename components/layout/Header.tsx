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
  Shield,
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

  // Organize navigation into logical groups
  const primaryNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/gallery", label: "Gallery", icon: Camera },
    { href: "/tributes", label: "Tributes", icon: Heart },
  ];

  const secondaryNavItems = [
    { href: "/eulogy", label: "Eulogy", icon: BookOpen },
    { href: "/service", label: "Service", icon: Church },
    { href: "/contributions", label: "Contributions", icon: DollarSign },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  const adminNavItems = [
    { href: "/admin/login", label: "Admin", icon: Shield },
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
                Phoebe Wangeci
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
          <div className="mx-auto px-6 sm:px-10 my-6">
            {/* Layer 1: Logo, Theme Toggle, Admin Login */}
            <div className="flex items-center justify-between h-16">
              {/* Enhanced Logo */}
              <Link
                href="/"
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <Heart className="h-8 w-8 text-accent-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  <div className="absolute inset-0 h-8 w-8 bg-accent-primary/20 rounded-full blur-sm group-hover:bg-accent-primary/30 transition-all duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-headings font-bold text-sm text-text-secondary uppercase group-hover:text-accent-primary transition-all duration-300">
                    Phoebe Wangeci
                  </span>
                  <span className="font-body text-xs text-text-secondary -mt-1 group-hover:text-text-primary transition-colors duration-300">
                    Memorial
                  </span>
                </div>
              </Link>

              {/* Right side controls */}
              <div className="flex items-center space-x-3">
                {/* Admin Login Button */}
                <Link
                  href="/admin/login"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs text-text-secondary font-medium rounded-lg bg-purple-500 dark:bg-purple-900/20 uppercase hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-all duration-200"
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="relative glass-button p-2.5 cursor-pointer hover:text-accent-primary transition-all duration-300 group rounded-xl"
                  aria-label="Toggle theme"
                >
                  <div className="relative z-10">
                    {resolvedTheme === "light" ? (
                      <Moon className="h-5 w-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Sun className="h-5 w-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`sm:hidden block glass-button p-2.5 cursor-pointer transition-all duration-300 rounded-xl group ${
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

            {/* Layer 2: Navigation Links (Desktop only) */}
            <div className="hidden lg:block border-t border-border/20 pt-3 pb-2">
              <div className="flex items-center justify-center space-x-8">
                {/* Primary Navigation */}
                {primaryNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? "text-accent-primary bg-accent-primary/10"
                          : "text-text-secondary hover:text-accent-primary hover:bg-surface/30"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs">{item.label}</span>
                    </Link>
                  );
                })}

                {/* Secondary Navigation */}
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? "text-accent-primary bg-accent-primary/10"
                          : "text-text-secondary hover:text-accent-primary hover:bg-surface/30"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 z-40 transition-all duration-500 ease-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-gray-300/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20">
            <div className="space-y-2">
              {/* Primary Navigation */}
              {primaryNavItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? "text-accent-primary bg-accent-primary/10"
                        : "text-text-primary hover:text-accent-primary hover:bg-surface/30"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isMenuOpen
                        ? "slideInFromRight 0.5s ease-out forwards"
                        : "none",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Secondary Navigation */}
              {secondaryNavItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? "text-accent-primary bg-accent-primary/10"
                        : "text-text-primary hover:text-accent-primary hover:bg-surface/30"
                    }`}
                    style={{
                      animationDelay: `${
                        (index + primaryNavItems.length) * 100
                      }ms`,
                      animation: isMenuOpen
                        ? "slideInFromRight 0.5s ease-out forwards"
                        : "none",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Admin Login */}
              <Link
                href="/admin/login"
                className="flex items-center space-x-4 px-4 py-3 rounded-xl font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-300"
                style={{
                  animationDelay: `${
                    (primaryNavItems.length + secondaryNavItems.length) * 100
                  }ms`,
                  animation: isMenuOpen
                    ? "slideInFromRight 0.5s ease-out forwards"
                    : "none",
                }}
              >
                <Shield className="w-5 h-5" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

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
      `}</style>
    </>
  );
};

export default Header;
