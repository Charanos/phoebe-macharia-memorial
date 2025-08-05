"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Star, Calendar, ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingElements = [
    { icon: Heart, delay: 0, x: "10%", y: "20%" },
    { icon: Star, delay: 1, x: "85%", y: "15%" },
    { icon: Sparkles, delay: 2, x: "15%", y: "70%" },
    { icon: Heart, delay: 3, x: "80%", y: "75%" },
    { icon: Star, delay: 4, x: "5%", y: "45%" },
  ];

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center ">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-accent-primary/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="hero-portrait mx-auto mb-8 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center">
            <Heart className="h-20 w-20 text-accent-primary opacity-50" />
          </div>
          <h1 className="text-4xl md:text-6xl font-headings font-semibold text-text-primary mb-4">
            Phoebe Wangeci Macharia
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center ">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-accent-primary/10"></div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon;
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: element.x, top: element.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.3, 0.2, 0.4, 0.2],
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
              <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-accent-primary" />
            </motion.div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl py-40 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Portrait */}
          <div className="mb-8 flex justify-center">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="hero-portrait bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center relative">
                {/* Placeholder for actual photo */}
                <Heart className="h-20 w-20 md:h-24 md:w-24 text-accent-primary opacity-50" />

                {/* Floating hearts around portrait */}
                <motion.div
                  className="absolute -top-4 -right-4 glass p-3 rounded-full"
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
                  <Heart className="h-4 w-4 text-accent-primary" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-4 glass p-2 rounded-full"
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
                  <Star className="h-3 w-3 text-accent-secondary" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Name and title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headings font-semibold text-text-primary mb-4">
              Phoebe Wangeci
              <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-accent-primary mt-2">
                Macharia
              </span>
            </h1>
          </motion.div>

          {/* Life dates */}
          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="glass-card px-6 py-3 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-accent-primary" />
              <span className="font-headings font-medium text-text-primary">
                1985 - 2024
              </span>
            </div>
          </motion.div>

          {/* Memorial quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <blockquote className="memorial-quote max-w-3xl mx-auto mb-4">
              A life filled with love, faith, and service to others.
              <br />
              <span className="text-accent-primary font-medium">
                Forever in our hearts, forever inspiring our souls.
              </span>
            </blockquote>
            <cite className="font-headings font-medium text-text-secondary">
              - In Loving Memory
            </cite>
          </motion.div>

          {/* Call to action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.a
              href="/tributes"
              className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="h-5 w-5" />
              <span>Share a Memory</span>
            </motion.a>

            <motion.a
              href="/gallery"
              className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-secondary transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="h-5 w-5" />
              <span>View Gallery</span>
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              className="flex flex-col items-center space-y-2 text-text-secondary cursor-pointer"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => {
                const nextSection = document.getElementById("navigation-cards");
                nextSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="font-body text-sm">Explore</span>
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle particle effect */}
      <div className="particles">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{
              y: ["100vh", "-10vh"],
              opacity: [0, 0.3, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
