"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../components/providers/ThemeProvider";
import {
  Heart,
  Star,
  Church,
  Users,
  BookOpen,
  Sparkles,
  Crown,
  Quote,
  Calendar,
  MapPin,
  GraduationCap,
  Home,
  Music,
  Flower2,
  Sun,
  ArrowRight,
  Gift,
  Camera,
} from "lucide-react";

const About = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lifeStages = [
    {
      period: "Early Life (1980-1999)",
      title: "Foundations of Faith & Learning",
      description:
        "Born in Embakasi Village, Phoebe's early years were marked by strong Christian values and dedication to education. From Embakasi Primary to Teju Girls Primary, then to Kagwe Girls Secondary School, she showed exceptional commitment to learning.",
      icon: Home,
      color: "from-rose-500/20 to-pink-500/20",
    },
    {
      period: "Young Teacher (2002-2006)",
      title: "Building Her Calling",
      description:
        "After completing her teaching training at Presbyterian Teachers College, Rubate, Phoebe began her teaching career in 1984. She met her beloved Joseph and began building the family that would become her greatest joy.",
      icon: BookOpen,
      color: "from-purple-500/20 to-indigo-500/20",
    },
    {
      period: "Wife & Ministry Leader (2006-2020)",
      title: "Serving God's Children",
      description:
        "Married to Joseph Munge Githuku in April 2006, Phoebe dedicated herself to Sunday school teaching, Vacation Bible School leadership, and nurturing young minds with biblical wisdom and contagious energy.",
      icon: Church,
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      period: "Mother & Mentor (2020-2025)",
      title: "Legacy of Love",
      description:
        "As a mother of six beautiful children and a serial entrepreneur, Phoebe continued to spread love and wisdom, becoming a pillar of strength and faith for her family and community.",
      icon: Crown,
      color: "from-emerald-500/20 to-teal-500/20",
    },
  ];

  const values = [
    {
      title: "Unwavering Faith",
      description:
        "Baptized at P.C.E.A. Embakasi Church in 1980 and confirmed in 1994, her relationship with God was the cornerstone of her life, providing strength, guidance, and purpose in all circumstances.",
      icon: Church,
      gradient: "from-purple-600 to-indigo-600",
      bgGradient: "from-purple-500/10 to-indigo-500/10",
    },
    {
      title: "Boundless Love",
      description:
        "Phoebe's capacity for love knew no limits. She loved her husband Joseph, her six children, her students, and her community with a pure, selfless heart that touched countless lives.",
      icon: Heart,
      gradient: "from-rose-600 to-pink-600",
      bgGradient: "from-rose-500/10 to-pink-500/10",
    },
    {
      title: "Dedication to Teaching",
      description:
        "As a Sunday school teacher and enterpreneur, she shaped young minds with biblical wisdom, patience, and genuine care for each child's spiritual and academic growth.",
      icon: BookOpen,
      gradient: "from-amber-600 to-yellow-600",
      bgGradient: "from-amber-500/10 to-yellow-500/10",
    },
    {
      title: "Community Spirit",
      description:
        "From P.C.E.A. Embakasi to P.C.E.A. Riruta Parish Satellite Church, she believed in the power of community and worked tirelessly to bring people together in fellowship and mutual support.",
      icon: Users,
      gradient: "from-emerald-600 to-teal-600",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
      title: "Joyful Living",
      description:
        "Her infectious laughter, refreshing humor, and radiant smile brought light to every room she entered, reminding others of life's blessings even in difficult times.",
      icon: Sparkles,
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Legacy of Excellence",
      description:
        "She approached every task with dedication and excellence, from her teaching career to her business ventures in office stationery and electronics, setting an example of integrity and commitment.",
      icon: Star,
      gradient: "from-violet-600 to-purple-600",
      bgGradient: "from-violet-500/10 to-purple-500/10",
    },
  ];

  const achievements = [
    { number: "40+", label: "Years of Ministry", icon: Church },
    { number: "6", label: "Beautiful Children", icon: Heart },
    { number: "2", label: "Churches Served", icon: Users },
    { number: "∞", label: "Hearts Touched", icon: Star },
  ];

  const floatingElements = [
    { icon: Heart, delay: 0, color: "text-rose-400" },
    { icon: Star, delay: 1.5, color: "text-amber-300" },
    { icon: Flower2, delay: 2.5, color: "text-pink-300" },
    { icon: Sparkles, delay: 3.5, color: "text-purple-300" },
    { icon: Sun, delay: 4.5, color: "text-yellow-300" },
    { icon: Music, delay: 5.5, color: "text-blue-300" },
  ];

  // Light theme only - consistent background system
  const getBgClasses = (variant = 1) => {
    // Always return light theme backgrounds for consistency
    return variant === 1
      ? "bg-gradient-to-br from-rose-50 via-purple-50/80 to-amber-50"
      : "bg-gradient-to-bl from-amber-50 via-rose-50/80 to-purple-50";
  };

  // Light theme only utility functions
  const getTextClasses = () => {
    return "text-gray-900";
  };

  const getSecondaryTextClasses = () => {
    return "text-gray-700";
  };

  const getGlassClasses = () => {
    return "bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl";
  };

  const getMutedTextClasses = () => {
    return "text-gray-600";
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50 animate-pulse pt-20">
        <div className="h-96 bg-white/20 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {/* Particle Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 dark:bg-purple-300/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section - full width for seamless header integration */}
      <section
        className={`pt-0 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(
          1
        )}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-rose-500/5"></div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingElements.slice(0, 3).map((element, index) => {
            const IconComponent = element.icon;
            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${15 + index * 25}%`,
                  top: `${20 + index * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: element.delay,
                }}
              >
                <IconComponent
                  className={`h-6 w-6 ${element.color} opacity-30`}
                />
              </motion.div>
            );
          })}
        </div>

        <div className="relative max-w-7xl mx-auto md:pt-12 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full`}
              >
                <Crown className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                <span
                  className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
                >
                  Her Beautiful Story
                </span>
              </div>

              <h1
                className={`text-5xl md:text-7xl font-serif font-semibold ${getTextClasses()} leading-tight`}
              >
                Phoebe
                <span className="block !bg-gradient-to-r !from-purple-600 !via-rose-600 !to-amber-600 dark:from-purple-300 dark:via-rose-300 dark:to-amber-300 !bg-clip-text !text-transparent">
                  Wangeci Munge
                </span>
              </h1>

              <p
                className={`text-lg font-serif font-normal ${getSecondaryTextClasses()} mb-6`}
              >
                17th June 1980 - 2nd August 2025
              </p>

              <p
                className={`text-xl ${getSecondaryTextClasses()} font-normal leading-relaxed mb-8`}
              >
                A devoted wife to Joseph, loving mother of six, dedicated Sunday
                school teacher, enterpreneur, and woman of extraordinary faith
                whose legacy continues to inspire and touch hearts across
                generations. Affectionately known as "Phibi."
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/gallery">
                  <motion.button
                    className={`${getGlassClasses()} px-8 py-4 rounded-full font-semibold ${getTextClasses()} hover:scale-105 transition-all duration-300 group cursor-pointer`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Camera className="h-5 w-5" />
                      <span>View Gallery</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                </Link>
                <Link href="/tributes">
                  <motion.button
                    className={`${getGlassClasses()} px-8 py-4 rounded-full font-semibold ${getTextClasses()} hover:scale-105 transition-all duration-300 group cursor-pointer border border-purple-500/20`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                      <span>Share Memory</span>
                    </div>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-rose-500/20 blur-3xl rounded-3xl"></div>
                <div
                  className={`relative ${getGlassClasses()} p-6 rounded-3xl overflow-hidden`}
                >
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/images/gallery/hero-image.jpg"
                      alt="Phoebe Wangeci Munge"
                      fill
                      className="object-cover rounded-2xl"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-purple-500/5"></div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-8`}
            >
              <Star className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Her Impact
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-serif font-semibold ${getTextClasses()} mb-4`}
            >
              A Life of Purpose
            </h2>
            <p
              className={`text-xl ${getSecondaryTextClasses()} font-normal max-w-3xl mx-auto`}
            >
              Numbers tell only part of her story, but they reflect the
              incredible reach of her love and ministry.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={achievement.label}
                  className={`${getGlassClasses()} p-8 text-center group hover:scale-105 transition-all duration-500 rounded-2xl`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 group-hover:from-purple-500/30 group-hover:to-rose-500/30 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-purple-600 dark:text-purple-300" />
                    </div>
                  </div>
                  <div
                    className={`text-4xl font-serif font-semibold ${getTextClasses()} mb-2`}
                  >
                    {achievement.number}
                  </div>
                  <div
                    className={`text-xs font-serif uppercase font-medium ${getSecondaryTextClasses()}`}
                  >
                    {achievement.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Life Journey Timeline */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(1)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-rose-500/5 via-transparent to-purple-500/5"></div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-8`}
            >
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Her Journey
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl font-serif font-semibold ${getTextClasses()} mb-6 leading-tight`}
            >
              A Life Well{" "}
              <span className=" !bg-gradient-to-r !from-purple-600 !via-rose-600 !to-amber-600 !dark:from-purple-300 !dark:via-rose-300 !dark:to-amber-300 !bg-clip-text !text-transparent">
                Lived
              </span>
            </h2>
            <p
              className={`text-xl ${getSecondaryTextClasses()} max-w-3xl mx-auto font-normal leading-relaxed`}
            >
              Follow the remarkable journey of a woman whose faith, love, and
              dedication touched countless lives.
            </p>
          </motion.div>

          <div className="space-y-12">
            {lifeStages.map((stage, index) => {
              const IconComponent = stage.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div
                      className={`${getGlassClasses()} p-8 rounded-3xl bg-gradient-to-br ${
                        stage.color
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/10">
                          <IconComponent className="h-8 w-8 text-purple-600 dark:text-purple-300" />
                        </div>
                        <div>
                          <p
                            className={`text-sm font-medium ${getMutedTextClasses()} mb-1`}
                          >
                            {stage.period}
                          </p>
                          <h3
                            className={`text-2xl font-serif font-semibold ${getTextClasses()}`}
                          >
                            {stage.title}
                          </h3>
                        </div>
                      </div>
                      <p
                        className={`text-lg ${getSecondaryTextClasses()} font-normal leading-relaxed`}
                      >
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Connector */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-rose-500 shadow-lg`}
                    ></div>
                    {index < lifeStages.length - 1 && (
                      <div className="w-px h-20 bg-gradient-to-b from-purple-500/50 to-rose-500/50 mt-4"></div>
                    )}
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 lg:block hidden"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values & Legacy Section */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-rose-500/10"></div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-8`}
            >
              <Heart className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Her Values
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl font-serif font-semibold ${getTextClasses()} mb-6 leading-tight`}
            >
              The Principles That{" "}
              <span className=" !bg-gradient-to-r !from-purple-600 !via-rose-600 !to-amber-600 !dark:from-purple-300 !dark:via-rose-300 !dark:to-amber-300 !bg-clip-text !text-transparent">
                Guided Her Life
              </span>
            </h2>
            <p
              className={`text-xl ${getSecondaryTextClasses()} max-w-3xl mx-auto font-normal leading-relaxed`}
            >
              These core values shaped every aspect of her life and continue to
              inspire all who knew her.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  className={`${getGlassClasses()} p-8 rounded-3xl hover:scale-105 transition-all duration-500 group bg-gradient-to-br ${
                    value.bgGradient
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${value.gradient.replace(
                        "600",
                        "500/20"
                      )} group-hover:${value.gradient.replace(
                        "600",
                        "500/30"
                      )} transition-all duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white drop-shadow-sm" />
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-serif font-semibold ${getTextClasses()} mb-4 `}
                  >
                    {value.title}
                  </h3>

                  <p
                    className={`${getSecondaryTextClasses()} font-normal leading-relaxed`}
                  >
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Memorial Quote Section */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(1)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-rose-500/10"></div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div
              className={`${getGlassClasses()} p-12 md:p-16 relative rounded-3xl`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-rose-500/10 rounded-3xl"></div>
              <div className="relative z-10">
                <motion.div
                  className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 mb-8"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Quote className="h-8 w-8 text-purple-600 " />
                </motion.div>

                <blockquote
                  className={`text-2xl md:text-4xl mb-10 leading-relaxed font-serif font-normal ${getTextClasses()}`}
                >
                  "Her kindness and strength were never separate - she showed us
                  that love can be firm without being harsh, and that
                  <span className="bg-gradient-to-r from-purple-600 to-rose-600 bg-clip-text text-transparent font-medium">
                    {" "}
                    forgiveness was her greatest superpower
                  </span>
                  ."
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-600 dark:via-purple-300 to-transparent"></div>
                  <cite
                    className={`font-serif font-medium ${getSecondaryTextClasses()} px-4`}
                  >
                    Her Children - Dennis & Eric
                  </cite>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-600 dark:via-purple-300 to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-rose-500/10"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-8`}
            >
              <Gift className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Continue Her Legacy
              </span>
            </div>

            <h2
              className={`text-3xl md:text-4xl font-serif font-semibold ${getTextClasses()} mb-6 leading-tight`}
            >
              Keep Her Memory{" "}
              <span className=" bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600  bg-clip-text text-transparent">
                Alive
              </span>
            </h2>

            <p
              className={`text-xl ${getSecondaryTextClasses()} max-w-3xl mx-auto font-normal leading-relaxed mb-12`}
            >
              Her story lives on through each of us. Share your memories,
              explore her gallery, or leave a tribute to celebrate the beautiful
              life she lived.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/tributes">
                <motion.button
                  className={`${getGlassClasses()} px-10 py-5 rounded-full font-semibold ${getTextClasses()} hover:scale-105 transition-all duration-300 group cursor-pointer bg-gradient-to-r from-purple-500/10 to-rose-500/10 border border-purple-500/20`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                    <span className="text-lg">Share a Memory</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-purple-600 dark:text-purple-300" />
                  </div>
                </motion.button>
              </Link>

              <Link href="/gallery">
                <motion.button
                  className={`${getGlassClasses()} px-10 py-5 rounded-full font-semibold ${getTextClasses()} hover:scale-105 transition-all duration-300 group cursor-pointer`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-3">
                    <Camera className="h-6 w-6" />
                    <span className="text-lg">View Photos</span>
                  </div>
                </motion.button>
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center items-center space-x-8 pt-8 opacity-60">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
              >
                <Heart className="h-6 w-6 text-rose-400" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <Star className="h-6 w-6 text-amber-400" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                <Flower2 className="h-6 w-6 text-pink-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating decorative elements for bottom */}
      <div className="fixed bottom-0 right-0 pointer-events-none overflow-hidden p-8">
        {floatingElements.slice(3, 6).map((element, index) => {
          const IconComponent = element.icon;
          return (
            <motion.div
              key={index + 3}
              className="absolute"
              style={{
                right: `${20 + index * 15}px`,
                bottom: `${20 + index * 25}px`,
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, -15, 15, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.delay,
              }}
            >
              <IconComponent className={`h-5 w-5 ${element.color}`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
