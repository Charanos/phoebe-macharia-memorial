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
import Image from "next/image";

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

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  // Prevent hydration mismatch with a proper loading state
  if (!mounted) {
    return (
      <nav className="fixed w-full top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/95 to-white/90 dark:from-gray-300/95 dark:to-gray-300/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="h-9 w-9 text-rose-500 animate-pulse" />
                <div className="absolute inset-0 h-9 w-9 bg-rose-500/20 rounded-full blur-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  Phoebe Wangeci
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
                  Memorial Website
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/5 dark:bg-gray-300/5 backdrop-blur-3xl shadow-lg border-b border-gray-200/60 dark:border-gray-700/60"
            : "bg-white/10 dark:bg-gray-300/10 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Layer 1: Logo, Theme Toggle, Admin Login */}
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <Image
                  alt="Logo"
                  width={50}
                  height={50}
                  className="h-9 w-9 rounded-full"
                  src="/images/icons/logo.png"
                />
                <div className="absolute inset-0 h-9 w-9 bg-rose-500/20 rounded-full blur-sm group-hover:bg-rose-500/30 transition-all duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold uppercase font-montserrat text-white text-md group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                  Phoebe Wangeci
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 -mt-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                  Memorial Website
                </span>
              </div>
            </Link>

            {/* Right side controls */}
            <div className="flex items-center space-x-2">
              {/* Admin Login Button - Hidden on mobile */}
              <Link
                href="/admin/login"
                className="hidden md:flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200 border border-purple-200 dark:border-purple-800"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group border border-gray-200 dark:border-gray-700"
                aria-label="Toggle theme"
              >
                <div className="relative z-10">
                  {resolvedTheme === "light" ? (
                    <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-3 rounded-xl transition-all duration-300 border ${
                  isMenuOpen
                    ? "bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                }`}
                aria-label="Toggle menu"
              >
                <div className="relative">
                  <Menu
                    className={`h-5 w-5 transition-all duration-300 ${
                      isMenuOpen ? "scale-0 rotate-180" : "scale-100 rotate-0"
                    }`}
                  />
                  <X
                    className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${
                      isMenuOpen ? "scale-100 rotate-0" : "scale-0 -rotate-180"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Layer 2: Navigation Links (Desktop only) */}
          <div className="hidden w-full lg:block border-t border-gray-200/50 dark:border-gray-700/50 py-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-1 bg-gray-50/20 dark:bg-gray-800/20 rounded-2xl p-2 border border-gray-200 dark:border-gray-700">
                {/* Primary Navigation */}
                {primaryNavItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-col items-center gap-1 px-8 py-1 rounded-xl text-sm font-medium transition-all duration-200 min-w-[80px] ${
                        isActive(item.href)
                          ? "text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-700 shadow-sm border border-indigo-200 dark:border-indigo-800"
                          : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs text-white font-medium font-montserrat uppercase">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}

                {/* Separator */}
                <div className="w-px h-12 bg-gray-300 dark:bg-gray-600 mx-2" />

                {/* Secondary Navigation */}
                {secondaryNavItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-col items-center gap-1 px-8 py-1 rounded-xl text-sm font-medium transition-all duration-200 min-w-[80px] ${
                        isActive(item.href)
                          ? "text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-700 shadow-sm border border-indigo-200 dark:border-indigo-800"
                          : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium text-white  font-montserrat uppercase">
                        {item.label}
                      </span>
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
        className={`fixed inset-0 top-0 z-40 transition-all duration-500 ease-out lg:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-l border-gray-200 dark:border-gray-700 transition-transform duration-500 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-24">
            {/* Mobile Menu Header */}
            <div className="mb-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Navigation
              </h3>
              <div className="w-12 h-px bg-rose-500 mx-auto" />
            </div>

            <div className="space-y-1">
              {/* Primary Navigation */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4">
                  Main
                </h4>
                {primaryNavItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500"
                          : "text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Secondary Navigation */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4">
                  More
                </h4>
                {secondaryNavItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500"
                          : "text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                      style={{
                        animationDelay: `${
                          (index + primaryNavItems.length) * 50
                        }ms`,
                      }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Admin Login */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/admin/login"
                  className="flex items-center space-x-4 px-4 py-3 rounded-xl font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                >
                  <Shield className="w-5 h-5 flex-shrink-0" />
                  <span>Admin Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
