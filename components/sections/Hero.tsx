"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";
import {
  Heart,
  Star,
  Calendar,
  ArrowDown,
  Sparkles,
  MapPin,
  Flower2,
  Sun,
  Users,
  Crown,
} from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, mounted: themeLoaded } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingElements = [
    { icon: Heart, delay: 0, x: "8%", y: "15%", color: "text-rose-400" },
    { icon: Star, delay: 1.5, x: "88%", y: "20%", color: "text-amber-300" },
    { icon: Flower2, delay: 2.5, x: "12%", y: "75%", color: "text-pink-300" },
    {
      icon: Sparkles,
      delay: 3.5,
      x: "85%",
      y: "70%",
      color: "text-purple-500",
    },
    { icon: Sun, delay: 4.5, x: "5%", y: "50%", color: "text-yellow-300" },
    { icon: Heart, delay: 5.5, x: "90%", y: "45%", color: "text-rose-300" },
  ];

  const stats = [
    { number: "67", label: "Years of Beautiful Life", icon: Sparkles },
    { number: "∞", label: "Hearts Touched", icon: Heart },
    { number: "3", label: "Generations Inspired", icon: Users },
    { number: "1", label: "Unforgettable Legacy", icon: Star },
  ];

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

  if (!mounted || !themeLoaded) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="w-80 h-80 mx-auto mb-8 rounded-full bg-gradient-to-br from-rose-200 to-purple-200 flex items-center justify-center shadow-2xl">
            <Heart className="h-20 w-20 text-rose-600 opacity-50" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold text-gray-800 dark:text-white mb-4">
            Phoebe Wangeci Munge
          </h1>
        </div>
      </section>
    );
  }

  // Dynamic background classes based on theme
  const backgroundClasses =
    resolvedTheme === "light"
      ? "bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50"
      : "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900";

  const overlayClasses =
    resolvedTheme === "light"
      ? "bg-gradient-to-tr from-rose-100/40 via-transparent to-purple-100/40"
      : "bg-gradient-to-tr from-rose-900/20 via-transparent to-amber-900/20";

  const radialClasses =
    resolvedTheme === "light"
      ? "from-purple-200/20 via-transparent to-transparent"
      : "from-purple-900/30 via-transparent to-transparent";

  return (
    <section
      className={`relative min-h-screen overflow-hidden ${backgroundClasses}`}
    >
      {/* Enhanced background overlays */}
      <div className={`absolute inset-0 ${overlayClasses}`}></div>
      <div
        className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${radialClasses}`}
      ></div>

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon;
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: element.x, top: element.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.4, 0.3, 0.5, 0.3],
                scale: [0, 1, 1.1, 1, 1.05],
                y: [0, -10, 0, -15, 0],
              }}
              transition={{
                duration: 6,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IconComponent
                className={`h-6 w-6 md:h-8 md:w-8 ${element.color} opacity-60 drop-shadow-lg`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Twinkling stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-600 dark:bg-gray-200 rounded-full opacity-40 dark:opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-50 md:pt-10 md:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Column - Enhanced Portrait */}
          <motion.div
            className="flex justify-center lg:justify-start order-1 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative group"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Portrait container with enhanced styling */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem]">
                {/* Multiple shadow layers for depth */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400 to-purple-600 blur-xl opacity-30 scale-[1.02]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 to-rose-500 blur-2xl opacity-20 scale-125"></div>

                {/* Main portrait */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-rose-100 via-purple-100 to-amber-100 flex items-center justify-center shadow-2xl border-4 border-white/80 dark:border-white/20 backdrop-blur-sm">
                  <Image
                    src="/images/gallery/hero-image.jpg"
                    alt="Hero Portrait"
                    className="w-full h-full object-cover rounded-full"
                    width={300}
                    height={300}
                  />

                  {/* Decorative rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-rose-300/50 dark:border-rose-300/30 scale-[1.02]"></div>
                  <div className="absolute inset-0 rounded-full border border-purple-500/40 dark:border-purple-500/20 scale-125"></div>
                </div>

                {/* Enhanced floating decorations */}
                <motion.div
                  className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-xl"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="h-6 w-6 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-6 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl"
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, -3, 3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Star className="h-5 w-5 text-white" />
                </motion.div>

                <motion.div
                  className="absolute top-1/4 -left-8 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <Sparkles className="h-4 w-4 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Content */}

          {/* Life details with enhanced styling */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-2 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center space-x-3 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-500/80 dark:border-white/20 shadow-lg">
                <Calendar className="h-5 w-5 text-rose-700 dark:text-rose-300" />
                <span className="font-medium text-gray-900 dark:text-gray-500 text-lg">
                  1985 - 2025
                </span>
              </div>
            </motion.div>
            {/* Name with enhanced typography and mobile optimization */}
            <motion.div
              className="space-y-4 mt-8 lg:mt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold leading-tight max-w-full mx-auto lg:mx-0">
                <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 dark:from-rose-500 dark:via-purple-500 dark:to-amber-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Phoebe Wangeci Munge
                </span>
              </h1>
            </motion.div>

            {/* Enhanced memorial quote */}
            <motion.div
              className="space-y-6 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <blockquote className="text-sm md:text-xl leading-relaxed text-gray-800 dark:text-gray-500 font-light italic border-l-4 border-rose-600 dark:border-rose-400 pl-6 bg-white/60  dark:bg-gray-900/60 backdrop-blur-sm rounded-r-lg py-8 pr-4">
                "A loving daughter sister, wife, devoted mother, and dedicated
                Sunday school teacher at PCEA Riruta Satellite."
              </blockquote>
            </motion.div>

            {/* Enhanced call to action buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.button
                className="group relative px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-500 text-white font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 group-hover:animate-pulse" />
                  <span>Share a Memory</span>
                </div>
              </motion.button>

              <motion.button
                className="group relative px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-500 text-white font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 group-hover:animate-spin" />
                  <span>View Gallery</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Enhanced scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex justify-center">
              <div className="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-500 cursor-pointer group animate-bounce hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                <span className="font-light text-sm tracking-wide">
                  Explore Her Story
                </span>
                <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center group-hover:border-rose-700 dark:group-hover:border-rose-300 transition-colors duration-300">
                  <ArrowDown className="h-4 w-4 group-hover:text-rose-700 dark:group-hover:text-rose-300" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced particle effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-rose-500 to-purple-500 dark:from-rose-300 dark:to-purple-500 rounded-full opacity-30 dark:opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `drift ${15 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(5deg);
          }
          50% {
            transform: translateY(-15px) rotate(0deg);
          }
          75% {
            transform: translateY(-5px) rotate(-5deg);
          }
        }

        @keyframes drift {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-10vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
