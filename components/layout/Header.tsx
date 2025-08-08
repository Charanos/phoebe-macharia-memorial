"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
    { href: "/tributes", label: "Tributes", icon: Heart },
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

  return (
    <>
      {/* Morphing Navigation Container */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`transition-all duration-500 ease-in-out ${
            isScrolled ? "px-6 pt-6" : "md:px-18 px-3 pt-0"
          }`}
        >
          <nav
            className={`transition-all duration-500 ease-in-out ${
              isScrolled
                ? "mx-auto max-w-[96%] bg-white/70 backdrop-blur-md rounded-full px-8 py-3 shadow-2xl shadow-gray-900/10 border border-gray-200/50"
                : "w-full bg-transparent px-4 sm:px-6 lg:px-8 py-4"
            }`}
          >
            {/* Navigation Content */}
            <div
              className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
                isScrolled ? "gap-8" : "gap-8"
              }`}
            >
              {/* Logo Section */}
              <Link
                href="/"
                className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
              >
                <div className="relative">
                  <div
                    className={`rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/25 transition-all duration-500 ease-in-out ${
                      isScrolled ? "w-10 h-10" : "w-10 h-10"
                    }`}
                  >
                    <Heart
                      className={`text-white transition-all duration-500 ease-in-out ${
                        isScrolled ? "w-4 h-4" : "w-5 h-5"
                      }`}
                    />
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-rose-400/20 to-pink-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isScrolled ? "hidden sm:block" : "hidden sm:block"
                  }`}
                >
                  <div
                    className={`font-semibold font-serif uppercase text-gray-900 group-hover:text-rose-600 transition-all duration-500 ease-in-out ${
                      isScrolled ? "text-sm" : "text-base"
                    }`}
                  >
                    Phoebe Wangeci
                  </div>
                  <div
                    className={`text-gray-500 -mt-0.5 transition-all duration-500 ease-in-out ${
                      isScrolled ? "text-xs" : "text-sm"
                    }`}
                  >
                    Memorial
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div
                className={`hidden lg:flex items-center transition-all duration-700 ${
                  isScrolled ? "gap-1" : "gap-2"
                }`}
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative transition-all duration-700 cursor-pointer ${
                        isScrolled
                          ? "px-3 py-2 rounded-full"
                          : "px-4 py-3 rounded-xl"
                      } ${
                        isActive(item.href)
                          ? isScrolled
                            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25"
                            : "bg-white/20 backdrop-blur-sm text-gray-900 border border-white/30 shadow-lg"
                          : isScrolled
                          ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
                          : "text-gray-700 hover:text-gray-900 hover:bg-white/10 backdrop-blur-sm"
                      }`}
                    >
                      <div
                        className={`flex items-center transition-all duration-500 ${
                          isScrolled ? "gap-1.5" : "gap-2"
                        }`}
                      >
                        <Icon
                          className={`transition-all duration-500 ${
                            isScrolled ? "w-3.5 h-3.5" : "w-4 h-4"
                          }`}
                        />
                        <span
                          className={`font-medium font-serif  whitespace-nowrap transition-all duration-500 ${
                            isScrolled ? "text-xs" : "text-sm"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {!isActive(item.href) && !isScrolled && (
                        <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20"></div>
                      )}
                      {!isActive(item.href) && isScrolled && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden relative transition-all duration-700 cursor-pointer ${
                  isScrolled ? "w-8 h-8 rounded-full" : "w-10 h-10 rounded-xl"
                } ${
                  isMenuOpen
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25"
                    : isScrolled
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-white/20 backdrop-blur-sm text-gray-700 hover:bg-white/30 border border-white/30"
                }`}
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Menu
                    className={`transition-all duration-300 ${
                      isScrolled ? "w-4 h-4" : "w-5 h-5"
                    } ${
                      isMenuOpen ? "scale-0 rotate-180" : "scale-100 rotate-0"
                    }`}
                  />
                  <X
                    className={`absolute transition-all duration-300 ${
                      isScrolled ? "w-4 h-4" : "w-5 h-5"
                    } ${
                      isMenuOpen ? "scale-100 rotate-0" : "scale-0 -rotate-180"
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Floating Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Floating Mobile Menu */}
        <div
          className={`absolute left-4 right-4 flex justify-center ${
            isScrolled ? "top-20" : "top-24"
          }`}
        >
          <div
            className={`bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl shadow-gray-900/20 border border-gray-200/50 max-w-sm w-full transition-all duration-500 ${
              isMenuOpen
                ? "transform translate-y-0 scale-100 opacity-100"
                : "transform -translate-y-8 scale-95 opacity-0"
            }`}
          >
            {/* Mobile Menu Header */}
            <div className="text-center mb-6">
              <div className="text-lg font-semibold text-gray-900 mb-1">
                Navigation
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mx-auto"></div>
            </div>

            {/* Mobile Navigation Grid */}
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isActive(item.href)
                        ? "bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25"
                        : "bg-gray-50/80 text-gray-700 hover:bg-gray-100/80 hover:text-gray-900"
                    }`}
                    style={{
                      animationDelay: `${index * 75}ms`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium text-center leading-tight">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
