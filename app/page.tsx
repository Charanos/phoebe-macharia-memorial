"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Hero from "../components/sections/Hero";
import Image from "next/image";
import { useTheme } from "../components/providers/ThemeProvider";
import {
  Heart,
  User,
  Camera,
  BookOpen,
  Church,
  DollarSign,
  Phone,
  Star,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Quote,
  Users,
  Gift,
  Flower2,
  Sun,
  Music,
  Crown,
} from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigationCards = [
    {
      title: "About Phoebe",
      description:
        "Discover her life story, values, and the remarkable impact she made on everyone around her.",
      icon: User,
      href: "/about",
      gradient: "from-violet-500/20 via-purple-500/25 to-indigo-500/20",
      hoverGradient:
        "hover:from-violet-500/30 hover:via-purple-500/35 hover:to-indigo-500/30",
      iconBg: "bg-gradient-to-br from-violet-500/30 to-purple-500/30",
      featured: false,
    },
    {
      title: "Photo Gallery",
      description:
        "Browse through precious memories and beautiful moments captured throughout her extraordinary life.",
      icon: Camera,
      href: "/gallery",
      gradient: "from-pink-500/20 via-rose-500/25 to-red-500/20",
      hoverGradient:
        "hover:from-pink-500/30 hover:via-rose-500/35 hover:to-red-500/30",
      iconBg: "bg-gradient-to-br from-pink-500/30 to-rose-500/30",
      featured: true,
    },
    {
      title: "Eulogy",
      description:
        "Read heartfelt words celebrating her beautiful life and the lasting legacy she leaves behind.",
      icon: BookOpen,
      href: "/eulogy",
      gradient: "from-amber-500/20 via-yellow-500/25 to-orange-500/20",
      hoverGradient:
        "hover:from-amber-500/30 hover:via-yellow-500/35 hover:to-orange-500/30",
      iconBg: "bg-gradient-to-br from-amber-500/30 to-orange-500/30",
      featured: false,
    },
    {
      title: "Service Details",
      description:
        "Complete information about memorial services and how you can participate in celebrating her life.",
      icon: Church,
      href: "/service",
      gradient: "from-emerald-500/20 via-teal-500/25 to-cyan-500/20",
      hoverGradient:
        "hover:from-emerald-500/30 hover:via-teal-500/35 hover:to-cyan-500/30",
      iconBg: "bg-gradient-to-br from-emerald-500/30 to-teal-500/30",
      featured: true,
    },
    {
      title: "Share Tributes",
      description:
        "Share your cherished memories, heartfelt stories, and loving tributes to honor her memory.",
      icon: Heart,
      href: "/tributes",
      gradient: "from-red-500/20 via-pink-500/25 to-rose-500/20",
      hoverGradient:
        "hover:from-red-500/30 hover:via-pink-500/35 hover:to-rose-500/30",
      iconBg: "bg-gradient-to-br from-red-500/30 to-pink-500/30",
      featured: false,
    },
    {
      title: "Send Off Funds",
      description:
        "Contribute to meaningful causes that were close to her heart and help continue her lasting legacy.",
      icon: Gift,
      href: "/contributions",
      gradient: "from-blue-500/20 via-indigo-500/25 to-purple-500/20",
      hoverGradient:
        "hover:from-blue-500/30 hover:via-indigo-500/35 hover:to-purple-500/30",
      iconBg: "bg-gradient-to-br from-blue-500/30 to-indigo-500/30",
      featured: true,
    },
  ];

  const upcomingEvents = [
    {
      title: "Memorial Service",
      date: "December 15, 2024",
      time: "4:00 PM - 5:00 PM",
      location: "PCEA Riruta Satellite",
      description:
        "A celebration of Phoebe's life with family, friends, and community members.",
      icon: Church,
      type: "secondary",
    },
    {
      title: "Celebration of Life",
      date: "December 16, 2024",
      time: "9:00 PM - 2:00 PM",
      location: "Family Home",
      description:
        "An intimate gathering to share memories and honor her legacy.",
      icon: Heart,
      type: "primary",
    },
  ];

  const memories = [
    {
      src: "/images/gallery/tribute-1.jpg",
      alt: "With Brother - Philip",
      span: "col-span-2",
    },
    {
      src: "/images/gallery/featured-church-moment.jpg",
      alt: "Sunday school",
    },
    {
      src: "/images/gallery/featured-graduation-photo.jpg",
      alt: "Wearing Graduation Gown",
    },
    {
      src: "/images/gallery/featured-image-with-dad.jpg",
      alt: "With Husband - Joseph",
      span: "col-span-2",
    },
    { src: "/images/gallery/in-church.jpg", alt: "Church service" },
    {
      src: "/images/gallery/featured-family-moment.jpg",
      alt: "Family portrait",
    },
    {
      src: "/images/gallery/selfie2.jpg",
      alt: "Womens Guild",
      span: "col-span-2",
    },
    { src: "/images/gallery/featured-at-work.jpg", alt: "Phoebe at Work" },
    {
      src: "/images/gallery/featured-family-vacay.jpg",
      alt: "Family Vacation",
    },
  ];

  const floatingElements = [
    { icon: Heart, delay: 0, color: "text-rose-400" },
    { icon: Star, delay: 1.5, color: "text-amber-300" },
    { icon: Flower2, delay: 2.5, color: "text-pink-300" },
    { icon: Sparkles, delay: 3.5, color: "text-purple-500" },
    { icon: Sun, delay: 4.5, color: "text-yellow-300" },
    { icon: Music, delay: 5.5, color: "text-blue-300" },
  ];

  // Light theme only - consistent background system
  const getBgClasses = (variant = 1) => {
    return variant === 1
      ? "bg-gradient-to-br from-rose-50 via-purple-50/80 to-amber-50"
      : "bg-gradient-to-bl from-amber-50 via-rose-50/80 to-purple-50";
  };

  const getTextClasses = () => {
    return "text-gray-900";
  };

  const getSecondaryTextClasses = () => {
    return "text-gray-800";
  };

  const getGlassClasses = (variant = 1) => {
    return "bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl";
  };

  const getMutedTextClasses = () => {
    return "text-gray-600";
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50 animate-pulse">
        <div className="h-96 bg-white/20 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {/* Hero section - full width for seamless header integration */}
      <Hero />

      {/* Particle Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 dark:bg-purple-500/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Memory Gallery Section */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
      >
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-12`}
            >
              <Camera className="h-5 w-5 text-purple-600 dark:text-purple-500" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Precious Memories
              </span>
            </div>
            <h2
              className={`text-4xl md:text-5xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
            >
              A Life in
              <span className="block font-serif bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 dark:from-purple-500 dark:via-rose-500 dark:to-amber-500 bg-clip-text text-transparent">
                Beautiful Moments
              </span>
            </h2>
            <p
              className={`text-lg ${getSecondaryTextClasses()} max-w-3xl mx-auto font-medium leading-relaxed`}
            >
              Each photograph tells a story, captures a smile, and preserves the
              love that Phoebe brought to every moment of her remarkable life.
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {memories.map((memory, index) => (
              <motion.div
                key={index}
                className={`${
                  memory.span || ""
                } group relative overflow-hidden rounded-2xl`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-square md:aspect-auto h-48 md:h-84 relative">
                  <div
                    className={`${getGlassClasses()} absolute inset-0 rounded-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-500`}
                  >
                    <Image
                      src={memory.src}
                      alt={memory.alt}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium text-sm">{memory.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/gallery">
              <motion.button
                className={`${getGlassClasses()} cursor-pointer px-8 py-4 rounded-full font-medium ${getTextClasses()} hover:scale-[1.01] transition-all duration-300 group`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <span>View Complete Gallery</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(1)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-rose-500/5 via-transparent to-purple-500/5"></div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-12`}
            >
              <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-500" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Explore Her Legacy
              </span>
            </div>
            <h2
              className={`text-4xl md:text-5xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
            >
              Celebrating a Life
              <span className="block font-medium font-serif bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 dark:from-purple-500 dark:via-rose-500 dark:to-amber-500 bg-clip-text text-transparent">
                Well Lived
              </span>
            </h2>
            <p
              className={`text-lg ${getSecondaryTextClasses()} max-w-3xl mx-auto font-normal leading-relaxed`}
            >
              Discover the many beautiful ways Phoebe touched our lives and
              continue celebrating her extraordinary memory through these
              meaningful sections.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {navigationCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.href}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={card.href}>
                    <div
                      className={`${getGlassClasses()} p-8 min-h-[20rem] cursor-pointer transition-all duration-500 group-hover:scale-[1.01] rounded-3xl bg-gradient-to-br ${
                        card.gradient
                      } ${card.hoverGradient} relative ${
                        card.featured
                          ? "ring-2 ring-purple-500/30 dark:ring-purple-500/30"
                          : ""
                      }`}
                    >
                      {card.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}

                      <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-6">
                          <div
                            className={`p-4 rounded-2xl ${card.iconBg} group-hover:scale-[1.02] transition-all duration-300 shadow-lg`}
                          >
                            <IconComponent className="h-8 w-8 text-white drop-shadow-sm" />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`text-xl font-serif font-medium ${getTextClasses()} group-hover:text-purple-500 transition-colors duration-300`}
                            >
                              {card.title}
                            </h3>
                          </div>
                        </div>

                        <p
                          className={`${getSecondaryTextClasses()} font-normal leading-relaxed mb-6 text-base`}
                        >
                          {card.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div
                            className={`flex items-center text-gray-500 font-medium group-hover:text-rose-500 transition-colors`}
                          >
                            <span>Explore</span>
                            <motion.div
                              className="ml-2"
                              animate={{ x: [0, 6, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </div>
                          <div className="w-12 h-1 bg-gradient-to-r from-purple-500/30 to-rose-500/30 rounded-full group-hover:from-purple-500 group-hover:to-rose-500 transition-all duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Memorial Quote Section */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
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
                  <Quote className="h-8 w-8 text-purple-600 dark:text-purple-500" />
                </motion.div>

                <blockquote
                  className={`text-2xl md:text-4xl mb-10 leading-relaxed font-serif font-normal ${getTextClasses()}`}
                >
                  "A beautiful soul never dies, it simply transforms into
                  <span className="bg-gradient-to-r from-purple-600 to-rose-600 dark:from-purple-500 dark:to-rose-300 bg-clip-text text-transparent font-medium">
                    {" "}
                    cherished memories{" "}
                  </span>
                  that live forever in our hearts."
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-600 dark:via-purple-500 to-transparent"></div>
                  <cite
                    className={`font-serif font-medium ${getSecondaryTextClasses()} px-4`}
                  >
                    Family & Friends
                  </cite>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-600 dark:via-purple-500 to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${getBgClasses(1)}`}>
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
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-500" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Upcoming Services
              </span>
            </div>
            <h2
              className={`text-4xl md:text-5xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
            >
              Send Off
            </h2>
            <p
              className={`text-lg ${getSecondaryTextClasses()} max-w-3xl mx-auto font-normal leading-relaxed`}
            >
              Join us as we come together to celebrate Phoebe's beautiful life
              and honor her lasting memory.
            </p>
          </motion.div>

          <div className="space-y-8">
            {upcomingEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <motion.div
                  key={index}
                  className={`${getGlassClasses()} p-8 md:p-10 hover:scale-102 transition-all duration-500 group relative rounded-3xl ${
                    event.type === "primary"
                      ? "ring-2 ring-purple-500/30 dark:ring-purple-500/30"
                      : ""
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {event.type === "primary" && (
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Main Service
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                    <div className="flex-shrink-0">
                      <div
                        className={`${getGlassClasses()} p-6 rounded-2xl group-hover:scale-[1.02] transition-transform duration-300 bg-gradient-to-br from-purple-500/20 to-rose-500/20`}
                      >
                        <IconComponent className="h-10 w-10 text-purple-600 dark:text-purple-500" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h3
                          className={`text-2xl font-serif font-medium ${getTextClasses()} mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-500 transition-colors`}
                        >
                          {event.title}
                        </h3>
                        <p
                          className={`${getSecondaryTextClasses()} font-normal text-lg`}
                        >
                          {event.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div
                          className={`flex items-center space-x-3 ${getGlassClasses()} p-3 rounded-lg`}
                        >
                          <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                          <span
                            className={`font-medium ${getSecondaryTextClasses()}`}
                          >
                            {event.date}
                          </span>
                        </div>
                        <div
                          className={`flex items-center space-x-3 ${getGlassClasses()} p-3 rounded-lg`}
                        >
                          <Clock className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                          <span
                            className={`font-medium ${getSecondaryTextClasses()}`}
                          >
                            {event.time}
                          </span>
                        </div>
                        <div
                          className={`flex items-center space-x-3 ${getGlassClasses()} p-3 rounded-lg`}
                        >
                          <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                          <span
                            className={`font-medium ${getSecondaryTextClasses()}`}
                          >
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Her Life Section with Image */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${getBgClasses(2)}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-purple-500/5"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full`}
              >
                <Crown className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                <span
                  className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
                >
                  Her Beautiful Life
                </span>
              </div>

              <h2
                className={`text-4xl md:text-5xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
              >
                A Woman of
                <span className="block font-serif bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 dark:from-purple-500 dark:via-rose-500 dark:to-amber-500 bg-clip-text text-transparent">
                  Faith & Grace
                </span>
              </h2>

              <div className="space-y-6">
                <p
                  className={`text-lg ${getSecondaryTextClasses()} font-normal leading-relaxed`}
                >
                  Phoebe Wangeci Munge lived a life filled with purpose, love,
                  and unwavering faith. As a devoted wife, loving mother, and
                  dedicated Sunday school teacher at PCEA Riruta Satellite, she
                  touched countless lives with her gentle spirit and boundless
                  compassion.
                </p>

                <p
                  className={`text-lg ${getSecondaryTextClasses()} font-normal leading-relaxed`}
                >
                  Her legacy lives on through the three generations she
                  inspired, the children she taught, and the countless hearts
                  she touched with her kindness. She believed in the power of
                  education, the strength of community, and the importance of
                  nurturing young minds with love and wisdom.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/about">
                  <motion.button
                    className={`${getGlassClasses()} cursor-pointer px-8 py-2 rounded-full font-medium ${getTextClasses()} hover:scale-[1.01] transition-all duration-300 group`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Read Her Story</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                </Link>
                <Link href="/eulogy">
                  <motion.button
                    className={`${getGlassClasses()} cursor-pointer px-8 py-2 rounded-full font-medium ${getTextClasses()} hover:scale-[1.01] transition-all duration-300 group border border-purple-500/20`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Read Eulogy</span>
                    </div>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-rose-500/20 blur-3xl rounded-3xl"></div>
                <div
                  className={`relative ${getGlassClasses()} p-4 rounded-3xl overflow-hidden`}
                >
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/images/gallery/womens-guild.jpg"
                      alt="Phoebe teaching Sunday school"
                      fill
                      className="object-cover rounded-2xl"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(1)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-rose-500/10"></div>

        {/* Enhanced floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingElements.slice(3).map((element, index) => {
            const IconComponent = element.icon;
            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  right: `${15 + index * 20}%`,
                  top: `${30 + index * 15}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 15, -15, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: element.delay,
                }}
              >
                <IconComponent
                  className={`h-8 w-8 ${element.color} opacity-40`}
                />
              </motion.div>
            );
          })}
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-8`}
            >
              <Heart className="h-5 w-5 text-purple-600 dark:text-purple-500" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Keep Her Memory Alive
              </span>
            </div>

            <h2
              className={`text-4xl md:text-5xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
            >
              Honor Her Legacy
            </h2>
            <p
              className={`text-lg ${getSecondaryTextClasses()} mb-12 font-normal max-w-3xl mx-auto leading-relaxed`}
            >
              Your precious memories, heartfelt stories, and loving tributes
              help us celebrate Phoebe's extraordinary life and ensure her
              beautiful legacy continues to inspire and touch others.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/tributes">
                  <div
                    className={`${getGlassClasses()} px-10 py-3 text-lg font-medium cursor-pointer transition-all duration-300 flex items-center space-x-3 group rounded-full bg-gradient-to-r from-purple-500/20 to-rose-500/20 hover:from-purple-500/30 hover:to-rose-500/30`}
                  >
                    <Heart className="h-6 w-6 group-hover:scale-[1.02] transition-transform text-purple-600 dark:text-purple-500" />
                    <span className={getTextClasses()}>Share Your Memory</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-purple-600 dark:text-purple-500" />
                  </div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contributions">
                  <div
                    className={`${getGlassClasses()} px-10 py-3 text-lg font-medium cursor-pointer transition-all duration-300 flex items-center space-x-3 group rounded-full border border-purple-500/30 dark:border-purple-500/30`}
                  >
                    <Gift className="h-6 w-6 group-hover:scale-[1.02] transition-transform text-purple-600 dark:text-purple-500" />
                    <span className={getTextClasses()}>Send Off Fund</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-purple-600 dark:text-purple-500" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Tribute Section with Image Grid */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${getBgClasses(2)}`}>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className={`text-4xl md:text-5xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
              >
                Forever in
                <span className="block font-serif bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 dark:from-purple-500 dark:via-rose-500 dark:to-amber-500 bg-clip-text text-transparent">
                  Our Hearts
                </span>
              </h2>

              <p
                className={`text-lg ${getSecondaryTextClasses()} font-normal leading-relaxed`}
              >
                Though we say goodbye to Phoebe's physical presence, her spirit
                continues to live on in every life she touched, every lesson she
                taught, and every act of kindness she inspired. Her memory
                becomes our greatest treasure, and her love remains our guiding
                light.
              </p>

              <div className={`${getGlassClasses()} p-6 rounded-2xl`}>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20">
                    <Quote className="h-6 w-6 text-purple-600 dark:text-purple-500" />
                  </div>
                  <div>
                    <p
                      className={`${getTextClasses()} font-medium mb-2 font-serif italic`}
                    >
                      "Her teachings will echo through generations, her love
                      will never fade, and her memory will forever be a blessing
                      to all who knew her."
                    </p>
                    <p className={`${getSecondaryTextClasses()} text-sm`}>
                      - PCEA Riruta Satellite Community
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  src: "/images/gallery/tribute-1.jpg",
                  alt: "Teaching children",
                },
                { src: "/images/gallery/tribute-2.jpg", alt: "Family moment" },
                { src: "/images/gallery/tribute-3.jpg", alt: "Church service" },
                {
                  src: "/images/gallery/tribute-4.jpg",
                  alt: "With loved ones",
                },
              ].map((image, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`${getGlassClasses()} p-2 rounded-2xl overflow-hidden`}
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
