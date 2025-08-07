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
  GraduationCap,
  School,
  Baby,
  Home as HomeIcon, // <-- Add this missing import
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
        "Discover her remarkable journey from Embakasi Village to becoming a beloved teacher, devoted mother, and faithful servant of God.",
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
        "Browse through precious memories of Phibi's beautiful life - from family moments to her ministry work at P.C.E.A. churches.",
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
        "Read heartfelt words celebrating 44 years of a life marked by grace, compassion, and unwavering dedication to family and faith.",
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
        "Join us at P.C.E.A. Riruta Parish for memorial services celebrating the life of our beloved Phoebe Wangeci Munge.",
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
        "Share your memories of Phibi - her teaching, mentoring, laughter, and the countless ways she touched your life with love.",
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
        "Support the family during this time and contribute to honoring the memory of a woman who gave so much to her community.",
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
      title: "Memorial & Burial Service",
      date: "Friday, August 8th, 2025",
      time: "10:45 AM - 12:30 PM",
      location: "Family Home - Mutukanio Village, Njoro Sub-county",
      description:
        "A celebration of Phoebe's 44 years of beautiful life, followed by burial at the family home.",
      icon: Church,
      type: "primary",
    },
    {
      title: "Assembly at Family Home",
      date: "Friday, August 8th, 2025",
      time: "7:00 AM - 9:30 AM",
      location: "Family Home - Mutukanio Village, Njoro Sub-county",
      description:
        "Family and friends gather for final preparations before departure to Egerton University Funeral Home.",
      icon: Users, // Changed from Home to Users (already imported)
      type: "secondary",
    },
  ];

  const memories = [
    {
      src: "/images/gallery/tribute-1.jpg",
      alt: "Phoebe with her children - a loving mother of six",
      span: "col-span-2",
    },
    {
      src: "/images/gallery/featured-church-moment.jpg",
      alt: "Teaching Sunday school at P.C.E.A. Riruta Parish",
    },
    {
      src: "/images/gallery/featured-graduation-photo.jpg",
      alt: "Presbyterian Teachers College graduation 2002",
    },
    {
      src: "/images/gallery/featured-image-with-dad.jpg",
      alt: "With beloved husband Joseph Munge Githuku",
      span: "col-span-2",
    },
    { src: "/images/gallery/in-church.jpg", alt: "Women's Guild ministry" },
    {
      src: "/images/gallery/featured-family-moment.jpg",
      alt: "Family portrait with Eric, Dennis, Mercy, Samuel, Keren & Jesse",
    },
    {
      src: "/images/gallery/selfie2.jpg",
      alt: "P.C.E.A. Women's Guild commissioning November 2007",
      span: "col-span-2",
    },
    {
      src: "/images/gallery/featured-at-work.jpg",
      alt: "At her electronics shop in Nairobi CBD",
    },
    {
      src: "/images/gallery/featured-family-vacay.jpg",
      alt: "Family vacation memories",
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
                Cherished Memories of Phibi
              </span>
            </div>

            <h2
              className={`text-4xl md:text-5xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
            >
              44 Years of
              <span className="block font-serif bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 dark:from-purple-500 dark:via-rose-500 dark:to-amber-500 bg-clip-text text-transparent">
                Beautiful Moments
              </span>
            </h2>
            <p
              className={`text-lg ${getSecondaryTextClasses()} max-w-3xl mx-auto font-medium leading-relaxed`}
            >
              From June 17, 1980 to August 2, 2025 - each photograph captures
              the love, joy, and grace that Phoebe Wangeci Munge brought to
              every moment of her extraordinary life.
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
                  and unwavering faith. Born on June 17, 1980, in Embakasi
                  Village, she became a devoted wife to Joseph Munge Githuku,
                  loving mother of six children, and successful entrepreneur who
                  ran an electronics shop in Nairobi CBD.
                </p>

                <p
                  className={`text-lg ${getSecondaryTextClasses()} font-normal leading-relaxed`}
                >
                  Her legacy lives on through her six children - Eric, Dennis,
                  Mercy, Samuel, Keren, and Jesse - as well as through her
                  business ventures and her dedicated Sunday school ministry at
                  P.C.E.A. churches. Though she was formerly a Deputy Head
                  Teacher at El Shama Primary School, she later pursued
                  entrepreneurship while maintaining her commitment to faith,
                  education, and nurturing young minds with love and wisdom.
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
                      alt="Phoebe teaching Sunday school at P.C.E.A. Riruta Parish"
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
                Honoring Her Legacy
              </span>
            </div>
            <h2
              className={`text-4xl md:text-5xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
            >
              Celebrating Phoebe
              <span className="block font-medium font-serif bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 dark:from-purple-500 dark:via-rose-500 dark:to-amber-500 bg-clip-text text-transparent">
                Wangeci Munge
              </span>
            </h2>
            <p
              className={`text-lg ${getSecondaryTextClasses()} max-w-3xl mx-auto font-normal leading-relaxed`}
            >
              Teacher, Mother, Wife, Entrepreneur, and Faithful Servant -
              explore the many ways "Phibi" touched lives and left a lasting
              impact on her family, students, and community.
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

      {/* Loving Husband Tribute Section */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${getBgClasses(1)}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full`}
              >
                <Heart className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                <span
                  className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
                >
                  Beloved Partnership
                </span>
              </div>

              <h2
                className={`text-4xl md:text-5xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
              >
                Joseph Munge
                <span className="block font-serif bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-500 dark:via-purple-500 dark:to-indigo-500 bg-clip-text text-transparent">
                  Githuku
                </span>
              </h2>

              <div className="space-y-6">
                <p
                  className={`text-lg ${getSecondaryTextClasses()} font-normal leading-relaxed`}
                >
                  Behind every extraordinary woman stands a loving partner who
                  believes in her dreams. Joseph Munge Githuku was not just
                  Phoebe's husband, but her anchor, her biggest supporter, and
                  the foundation upon which their beautiful family of eight was
                  built.
                </p>

                <p
                  className={`text-lg ${getSecondaryTextClasses()} font-normal leading-relaxed`}
                >
                  Together, they created a home filled with love, laughter, and
                  faith. Joseph supported Phoebe's career transitions - from her
                  teaching days at El Shama Primary to her entrepreneurial
                  journey with the electronics shop in Nairobi CBD, and her
                  unwavering commitment to Sunday school ministry at P.C.E.A.
                  churches.
                </p>
              </div>

              <div className={`${getGlassClasses()} p-6 rounded-2xl`}>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <h3
                      className={`${getTextClasses()} font-medium text-lg font-serif`}
                    >
                      A Partnership Built on Faith
                    </h3>
                    <p
                      className={`${getSecondaryTextClasses()} text-sm leading-relaxed`}
                    >
                      Joseph and Phoebe's marriage was a testament to God's
                      design for partnership. Together they raised six wonderful
                      children: Eric, Dennis, Mercy, Samuel, Keren, and Jesse -
                      each a living testimony to their parents' love and
                      dedication.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div
                    className={`text-2xl font-semibold ${getTextClasses()} font-serif`}
                  >
                    6
                  </div>
                  <div
                    className={`text-sm ${getMutedTextClasses()} uppercase tracking-wide`}
                  >
                    Children
                  </div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
                <div className="text-center">
                  <div
                    className={`text-2xl font-semibold ${getTextClasses()} font-serif`}
                  >
                    Years
                  </div>
                  <div
                    className={`text-sm ${getMutedTextClasses()} uppercase tracking-wide`}
                  >
                    of Marriage
                  </div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
                <div className="text-center">
                  <div
                    className={`text-2xl font-semibold ${getTextClasses()} font-serif`}
                  >
                    1
                  </div>
                  <div
                    className={`text-sm ${getMutedTextClasses()} uppercase tracking-wide`}
                  >
                    United Heart
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Main couple photo */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl rounded-3xl"></div>
                <div
                  className={`relative ${getGlassClasses()} p-4 rounded-3xl overflow-hidden group-hover:shadow-3xl transition-all duration-500`}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/images/gallery/featured-image-with-dad.jpg"
                      alt="Joseph and Phoebe Munge - a loving partnership"
                      fill
                      className="object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              {/* Family photos grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    src: "/images/gallery/featured-family-moment.jpg",
                    alt: "Joseph with the family - proud father of six",
                  },
                  {
                    src: "/images/gallery/featured-family-vacay.jpg",
                    alt: "Family vacation - creating precious memories together",
                  },
                ].map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`${getGlassClasses()} p-2 rounded-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-300`}
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
              </div>

              {/* Tribute quote */}
              <div
                className={`${getGlassClasses()} p-6 rounded-2xl border border-blue-500/20`}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <Quote className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <p
                      className={`${getTextClasses()} font-medium mb-2 font-serif italic text-sm`}
                    >
                      "In times of joy and sorrow, in seasons of abundance and
                      challenge, Joseph stood steadfast beside Phoebe. Their
                      love story continues through their children and the legacy
                      they built together."
                    </p>
                    <p className={`${getMutedTextClasses()} text-xs`}>
                      - Family & Friends
                    </p>
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
              beautiful legacy continues to inspire and touch others for
              generations to come.
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
                  "Precious in the sight of the Lord is the death of
                  <span className="bg-gradient-to-r from-purple-600 to-rose-600 dark:from-purple-500 dark:to-rose-300 bg-clip-text text-transparent font-medium">
                    {" "}
                    His faithful servants.
                  </span>
                  "
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-600 dark:via-purple-500 to-transparent"></div>
                  <cite
                    className={`font-serif font-medium ${getSecondaryTextClasses()} px-4`}
                  >
                    Psalm 116:15
                  </cite>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-600 dark:via-purple-500 to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {/* Memorial Services Section */}
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
                Memorial Services
              </span>
            </div>
            <h2
              className={`text-4xl md:text-5xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
            >
              Celebrating Her Life
            </h2>
            <p
              className={`text-lg ${getSecondaryTextClasses()} max-w-3xl mx-auto font-normal leading-relaxed`}
            >
              Join us in honoring the memory of Phoebe Wangeci Munge as we
              gather to celebrate a life marked by grace, compassion, and
              unwavering faith in God.
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
                taught, and every act of kindness she inspired. Her memory of 44
                years and 52 days on earth becomes our greatest treasure, and
                her love remains our guiding light.
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
                      "Her teachings will echo through generations, her love for
                      Sunday school children will never fade, and her memory
                      will forever be a blessing to all who knew her faithful
                      service."
                    </p>
                    <p className={`${getSecondaryTextClasses()} text-sm`}>
                      - P.C.E.A. Riruta Parish - Satellite Church Community
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
                  alt: "Teaching children with love and patience",
                },
                {
                  src: "/images/gallery/tribute-2.jpg",
                  alt: "Beautiful family moment with her six children",
                },
                {
                  src: "/images/gallery/tribute-3.jpg",
                  alt: "P.C.E.A. church service and ministry",
                },
                {
                  src: "/images/gallery/tribute-4.jpg",
                  alt: "With beloved husband Joseph and extended family",
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
