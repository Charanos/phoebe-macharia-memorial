"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Hero from "../components/sections/Hero";
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
} from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
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
      gradient: "from-violet-500/10 via-purple-500/15 to-indigo-500/10",
      hoverGradient:
        "hover:from-violet-500/20 hover:via-purple-500/25 hover:to-indigo-500/20",
      iconBg: "bg-gradient-to-br from-violet-500/20 to-purple-500/20",
      featured: false,
    },
    {
      title: "Photo Gallery",
      description:
        "Browse through precious memories and beautiful moments captured throughout her extraordinary life.",
      icon: Camera,
      href: "/gallery",
      gradient: "from-pink-500/10 via-rose-500/15 to-red-500/10",
      hoverGradient:
        "hover:from-pink-500/20 hover:via-rose-500/25 hover:to-red-500/20",
      iconBg: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
      featured: true,
    },
    {
      title: "Eulogy",
      description:
        "Read heartfelt words celebrating her beautiful life and the lasting legacy she leaves behind.",
      icon: BookOpen,
      href: "/eulogy",
      gradient: "from-amber-500/10 via-yellow-500/15 to-orange-500/10",
      hoverGradient:
        "hover:from-amber-500/20 hover:via-yellow-500/25 hover:to-orange-500/20",
      iconBg: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
      featured: false,
    },
    {
      title: "Service Details",
      description:
        "Complete information about memorial services and how you can participate in celebrating her life.",
      icon: Church,
      href: "/service",
      gradient: "from-emerald-500/10 via-teal-500/15 to-cyan-500/10",
      hoverGradient:
        "hover:from-emerald-500/20 hover:via-teal-500/25 hover:to-cyan-500/20",
      iconBg: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
      featured: true,
    },
    {
      title: "Share Tributes",
      description:
        "Share your cherished memories, heartfelt stories, and loving tributes to honor her memory.",
      icon: Heart,
      href: "/tributes",
      gradient: "from-red-500/10 via-pink-500/15 to-rose-500/10",
      hoverGradient:
        "hover:from-red-500/20 hover:via-pink-500/25 hover:to-rose-500/20",
      iconBg: "bg-gradient-to-br from-red-500/20 to-pink-500/20",
      featured: false,
    },
    {
      title: "Memorial Fund",
      description:
        "Contribute to meaningful causes that were close to her heart and help continue her lasting legacy.",
      icon: Gift,
      href: "/contributions",
      gradient: "from-blue-500/10 via-indigo-500/15 to-purple-500/10",
      hoverGradient:
        "hover:from-blue-500/20 hover:via-indigo-500/25 hover:to-purple-500/20",
      iconBg: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20",
      featured: true,
    },
  ];

  const upcomingEvents = [
    {
      title: "Memorial Service",
      date: "December 15, 2024",
      time: "10:00 AM",
      location: "PCEA Riruta Satellite",
      description:
        "A celebration of Phoebe's life with family, friends, and community members.",
      icon: Church,
      type: "primary",
    },
    {
      title: "Celebration of Life",
      date: "December 16, 2024",
      time: "2:00 PM",
      location: "Family Home",
      description:
        "An intimate gathering to share memories and honor her legacy.",
      icon: Heart,
      type: "secondary",
    },
  ];

  const stats = [
    { number: "67", label: "Years of Beautiful Life", icon: Sparkles },
    { number: "∞", label: "Hearts Touched", icon: Heart },
    { number: "3", label: "Generations Inspired", icon: Users },
    { number: "1", label: "Unforgettable Legacy", icon: Star },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background animate-pulse">
        <div className="h-96 bg-surface/50 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/30 to-background"></div>
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent-primary/5 rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl"
          style={{ y: y2 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]"></div>
      </div>

      <Hero />

      {/* Stats Section */}
      <section className="w-full py-16 relative">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-3 rounded-full bg-accent-primary/10 group-hover:bg-accent-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-accent-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-headings font-semibold text-accent-primary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm font-body text-text-secondary">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section
        id="navigation-cards"
        className="py-24 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-accent-primary/10 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-accent-primary" />
              <span className="text-sm font-headings font-medium text-accent-primary">
                Explore Her Legacy
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headings font-semibold text-text-primary mb-6 leading-tight">
              Celebrating a Life
              <span className="block text-accent-primary">Well Lived</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto font-body leading-relaxed">
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
                      className={`glass-card p-8 cursor-pointer transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl bg-gradient-to-br ${
                        card.gradient
                      } ${card.hoverGradient} relative ${
                        card.featured ? "ring-2 ring-accent-primary/20" : ""
                      }`}
                    >
                      {/* Featured Badge */}
                      {card.featured && (
                        <div className="absolute top-4 right-4 bg-accent-primary/20 text-accent-primary px-3 py-1 rounded-full text-xs font-headings font-medium">
                          Featured
                        </div>
                      )}

                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,currentColor,transparent)]"></div>

                      <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-8">
                          <div
                            className={`p-4 rounded-2xl ${card.iconBg} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                          >
                            <IconComponent className="h-8 w-8 text-white drop-shadow-sm" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-headings font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                              {card.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-text-secondary font-body leading-relaxed mb-8 text-base">
                          {card.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-accent-primary font-headings font-medium group-hover:text-accent-secondary transition-colors">
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
                          <div className="w-12 h-1 bg-gradient-to-r from-accent-primary/30 to-accent-secondary/30 rounded-full group-hover:from-accent-primary group-hover:to-accent-secondary transition-all duration-300"></div>
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative ">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-accent-secondary/10 to-accent-primary/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent)]"></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="glass-card p-12 md:p-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5"></div>
              <div className="relative z-10">
                <motion.div
                  className="inline-flex p-4 rounded-full bg-accent-primary/10 mb-8"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Quote className="h-8 w-8 text-accent-primary" />
                </motion.div>

                <blockquote className="memorial-quote text-2xl md:text-4xl mb-10 leading-relaxed font-headings font-light text-text-primary">
                  "A beautiful soul never dies, it simply transforms into
                  <span className="text-accent-primary font-medium">
                    {" "}
                    cherished memories{" "}
                  </span>
                  that live forever in our hearts."
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent"></div>
                  <cite className="font-headings font-medium text-text-secondary px-4">
                    Family & Friends
                  </cite>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-accent-primary/10 px-4 py-2 rounded-full mb-6">
              <Calendar className="h-4 w-4 text-accent-primary" />
              <span className="text-sm font-headings font-medium text-accent-primary">
                Upcoming Services
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headings font-semibold text-text-primary mb-6">
              Memorial Services
            </h2>
            <p className="text-xl text-text-secondary font-body max-w-2xl mx-auto">
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
                  className={`glass-card p-8 md:p-10 hover:scale-102 transition-all duration-500 group relative ${
                    event.type === "primary"
                      ? "ring-2 ring-accent-primary/20"
                      : ""
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {event.type === "primary" && (
                    <div className="absolute top-6 right-6 bg-accent-primary/20 text-accent-primary px-3 py-1 rounded-full text-xs font-headings font-medium">
                      Main Service
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                    <div className="flex-shrink-0">
                      <div className="glass p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10">
                        <IconComponent className="h-10 w-10 text-accent-primary" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-2xl font-headings font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-text-secondary font-body text-lg">
                          {event.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-text-secondary font-body">
                        <div className="flex items-center space-x-3 bg-surface/30 p-3 rounded-lg">
                          <Calendar className="h-5 w-5 text-accent-primary" />
                          <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-surface/30 p-3 rounded-lg">
                          <Clock className="h-5 w-5 text-accent-primary" />
                          <span className="font-medium">{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-surface/30 p-3 rounded-lg">
                          <MapPin className="h-5 w-5 text-accent-primary" />
                          <span className="font-medium">{event.location}</span>
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

      {/* Call to Action Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-accent-secondary/5 to-accent-primary/10"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-accent-primary/10 px-4 py-2 rounded-full mb-8">
              <Heart className="h-4 w-4 text-accent-primary" />
              <span className="text-sm font-headings font-medium text-accent-primary">
                Keep Her Memory Alive
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-headings font-semibold text-text-primary mb-8 leading-tight">
              Honor Her Legacy
            </h2>
            <p className="text-xl text-text-secondary mb-12 font-body max-w-3xl mx-auto leading-relaxed">
              Your precious memories, heartfelt stories, and loving tributes
              help us celebrate Phoebe's extraordinary life and ensure her
              beautiful legacy continues to inspire and touch others.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/tributes"
                  className="glass-button px-10 py-5 text-lg font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-3 group"
                >
                  <Heart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span>Share Your Memory</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contributions"
                  className="glass-button px-10 py-5 text-lg font-headings font-medium cursor-pointer hover:text-accent-secondary transition-all duration-300 flex items-center space-x-3 group border border-accent-secondary/20"
                >
                  <Gift className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span>Memorial Fund</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border/30 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-surface/20 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="h-8 w-8 text-accent-primary" />
              </motion.div>
              <span className="font-headings font-semibold text-2xl text-text-primary">
                Phoebe Wangeci Macharia
              </span>
            </div>
            <p className="text-text-primary font-headings text-lg mb-2">
              1957 - 2024
            </p>
            <p className="text-accent-primary font-body text-base mb-6">
              Forever in our hearts • Always in our memories
            </p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto mb-6"></div>
            <p className="text-sm text-text-secondary font-body">
              Created with love by family and friends • PCEA Riruta Satellite
              Church
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
