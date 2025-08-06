"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";
import {
  Heart,
  Home,
  User,
  Camera,
  BookOpen,
  Church,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Star,
  Flower2,
  Sun,
  Music,
  Sparkles,
  Gift,
  Crown,
  ArrowUp,
  Facebook,
  Instagram,
  Twitter,
  Share2,
} from "lucide-react";

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigation sections
  const mainNavigation = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About Phoebe", icon: User },
    { href: "/gallery", label: "Photo Gallery", icon: Camera },
    { href: "/tributes", label: "Share Tributes", icon: Heart },
  ];

  const servicesNavigation = [
    { href: "/eulogy", label: "Eulogy", icon: BookOpen },
    { href: "/service", label: "Memorial Service", icon: Church },
    { href: "/contributions", label: "Send Off Funds", icon: Gift },
    { href: "/contact", label: "Contact Us", icon: Phone },
  ];

  const memorialInfo = {
    mainService: {
      title: "Memorial Service",
      date: "December 15, 2024",
      time: "10:00 AM",
      location: "PCEA Riruta Satellite",
    },
    celebration: {
      title: "Celebration of Life",
      date: "December 16, 2024",
      time: "2:00 PM",
      location: "Family Home",
    },
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Share2, href: "#", label: "Share" },
  ];

  const floatingElements = [
    { icon: Heart, delay: 0, color: "text-rose-400" },
    { icon: Star, delay: 1.5, color: "text-amber-300" },
    { icon: Flower2, delay: 2.5, color: "text-pink-300" },
    { icon: Sparkles, delay: 3.5, color: "text-purple-500" },
    { icon: Sun, delay: 4.5, color: "text-yellow-300" },
    { icon: Music, delay: 5.5, color: "text-blue-300" },
  ];

  // Theme-based classes
  const getBgClasses = () => {
    return resolvedTheme === "dark"
      ? "bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900"
      : "bg-gradient-to-br from-rose-50 via-purple-50/80 to-amber-50";
  };

  const getTextClasses = () => {
    return resolvedTheme === "dark" ? "text-white" : "text-gray-900";
  };

  const getSecondaryTextClasses = () => {
    return resolvedTheme === "dark" ? "text-gray-500" : "text-gray-700";
  };

  const getGlassClasses = () => {
    return resolvedTheme === "dark"
      ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
      : "bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl";
  };

  const getMutedTextClasses = () => {
    return resolvedTheme === "dark" ? "text-gray-400" : "text-gray-600";
  };

  if (!mounted) {
    return (
      <footer className="bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 animate-pulse">
        <div className="h-96 bg-white/20 rounded-lg"></div>
      </footer>
    );
  }

  return (
    <footer className={`relative ${getBgClasses()} overflow-hidden`}>
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon;
          return (
            <motion.div
              key={index}
              className="absolute opacity-20"
              style={{
                left: `${10 + index * 15}%`,
                top: `${10 + (index % 3) * 30}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 15, -15, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.delay,
              }}
            >
              <IconComponent className={`h-8 w-8 ${element.color}`} />
            </motion.div>
          );
        })}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-transparent to-purple-500/5"></div>

      {/* Main Footer Content */}
      <div className="relative pt-20 pb-8 mb-0 px-4 sm:mb-0 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Memorial Quote */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={`${getGlassClasses()} p-12 rounded-3xl relative`}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-rose-500/10 rounded-3xl"></div>
              <div className="relative z-10">
                <motion.div
                  className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 mb-6"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Crown className="h-8 w-8 text-purple-600 dark:text-purple-500" />
                </motion.div>

                <h2
                  className={`text-2xl md:text-3xl font-serif font-light ${getTextClasses()} mb-4`}
                >
                  "Her legacy lives on in every heart she touched"
                </h2>
                <p className={`${getSecondaryTextClasses()} font-light`}>
                  Phoebe Wangeci Munge • 1957 - 2024 • Forever in our hearts
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            {/* About Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`${getGlassClasses()} p-8 rounded-2xl h-full`}>
                <Link
                  href="/"
                  className="flex items-center space-x-3 mb-6 group"
                >
                  <div className="relative">
                    <Image
                      alt="Memorial Logo"
                      width={50}
                      height={50}
                      className="h-12 w-12 rounded-full"
                      src="/images/icons/logo.png"
                    />
                    <div className="absolute inset-0 h-12 w-12 bg-rose-500/20 rounded-full blur-sm group-hover:bg-rose-500/30 transition-all duration-300"></div>
                  </div>
                  <div>
                    <h3
                      className={`font-medium font-montserrat ${getTextClasses()} text-lg`}
                    >
                      Phoebe Wangeci
                    </h3>
                    <p className={`text-sm ${getMutedTextClasses()}`}>
                      Memorial Website
                    </p>
                  </div>
                </Link>

                <p
                  className={`${getSecondaryTextClasses()} font-light leading-relaxed mb-6`}
                >
                  Celebrating the beautiful life of a devoted wife, loving
                  mother, and dedicated Sunday school teacher who touched
                  countless hearts with her faith and kindness.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                    <span className={`text-sm ${getMutedTextClasses()}`}>
                      PCEA Riruta Satellite
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                    <span className={`text-sm ${getMutedTextClasses()}`}>
                      memorial@phoebewangeci.com
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`${getGlassClasses()} p-8 rounded-2xl h-full`}>
                <h3
                  className={`text-xl font-serif font-medium ${getTextClasses()} mb-8 flex items-center`}
                >
                  <Heart className="h-5 w-5 text-rose-500 mr-2" />
                  Explore Her Legacy
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4
                      className={`font-medium ${getTextClasses()} mb-4 text-sm uppercase tracking-wider`}
                    >
                      Main Sections
                    </h4>
                    <ul className="space-y-3">
                      {mainNavigation.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={`font-serif font-medium  flex items-center space-x-3 ${getMutedTextClasses()} hover:text-purple-600 dark:hover:text-purple-500 transition-colors duration-200 group cursor-pointer`}
                            >
                              <IconComponent className="h-4 w-4 group-hover:scale-[1.02] transition-transform" />
                              <span>{item.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <h4
                      className={`font-medium ${getTextClasses()} mb-4 text-sm uppercase tracking-wider`}
                    >
                      Services & More
                    </h4>
                    <ul className="space-y-3">
                      {servicesNavigation.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={`font-serif font-medium  flex items-center space-x-3 ${getMutedTextClasses()} hover:text-purple-600 dark:hover:text-purple-500 transition-colors duration-200 group cursor-pointer`}
                            >
                              <IconComponent className="h-4 w-4 group-hover:scale-[1.02] transition-transform" />
                              <span>{item.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Memorial Services Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className={`${getGlassClasses()} p-8 rounded-2xl h-full`}>
                <h3
                  className={`text-xl font-serif font-medium ${getTextClasses()} mb-6 flex items-center`}
                >
                  <Church className="h-5 w-5 text-purple-600 dark:text-purple-500 mr-2" />
                  Memorial Services
                </h3>

                <div className="space-y-6">
                  <div
                    className={`${getGlassClasses()} p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-rose-500/10`}
                  >
                    <h4 className={`font-medium ${getTextClasses()} mb-2`}>
                      {memorialInfo.mainService.title}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                        <span className={`text-sm ${getMutedTextClasses()}`}>
                          {memorialInfo.mainService.date}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                        <span className={`text-sm ${getMutedTextClasses()}`}>
                          {memorialInfo.mainService.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                        <span className={`text-sm ${getMutedTextClasses()}`}>
                          {memorialInfo.mainService.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`${getGlassClasses()} p-4 rounded-xl`}>
                    <h4 className={`font-medium ${getTextClasses()} mb-2`}>
                      {memorialInfo.celebration.title}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                        <span className={`text-sm ${getMutedTextClasses()}`}>
                          {memorialInfo.celebration.date}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                        <span className={`text-sm ${getMutedTextClasses()}`}>
                          {memorialInfo.celebration.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                        <span className={`text-sm ${getMutedTextClasses()}`}>
                          {memorialInfo.celebration.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className={`${getGlassClasses()} p-8 rounded-2xl`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <p
                  className={`text-sm ${getMutedTextClasses()} text-center md:text-left`}
                >
                  © 2024 Phoebe Wangeci Memorial. Created with love by family
                  and friends.
                </p>

                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <Link
                        key={social.label}
                        href={social.href}
                        className={`p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 hover:from-purple-500/30 hover:to-rose-500/30 transition-all duration-300 group cursor-pointer`}
                        aria-label={social.label}
                      >
                        <IconComponent className="h-4 w-4 text-purple-600 dark:text-purple-500 group-hover:scale-[1.02] transition-transform" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="text-center">
                <p className={`text-xs ${getMutedTextClasses()} mb-2`}>
                  "Those we love don't go away, they walk beside us every day"
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <Heart className="h-3 w-3 text-rose-500 animate-pulse" />
                  <span className={`text-xs ${getMutedTextClasses()}`}>
                    Forever remembered, forever loved
                  </span>
                  <Heart className="h-3 w-3 text-rose-500 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        className={`fixed bottom-8 right-8 z-50 ${getGlassClasses()} p-4 rounded-full shadow-lg cursor-pointer`}
        style={{ display: showScrollTop ? "block" : "none" }}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp className="h-6 w-6 text-purple-600 dark:text-purple-500" />
      </motion.button>
    </footer>
  );
};

export default Footer;
