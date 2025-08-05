"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Calendar,
  Star,
  ArrowUp,
  Gift,
  Clock,
  Users,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0.3, 1]);

  const footerLinks = {
    navigation: [
      { href: "/", label: "Home", icon: Home },
      { href: "/about", label: "About Phoebe", icon: User },
      { href: "/gallery", label: "Photo Gallery", icon: Camera },
      { href: "/eulogy", label: "Eulogy", icon: BookOpen },
      { href: "/service", label: "Service Details", icon: Church },
      { href: "/tributes", label: "Share Tributes", icon: Heart },
      { href: "/contributions", label: "Memorial Fund", icon: Gift },
      { href: "/contact", label: "Contact Us", icon: Phone },
    ],
    quickActions: [
      {
        href: "/tributes",
        label: "Share a Memory",
        icon: Heart,
        description: "Honor her with your stories",
        color: "text-red-400 hover:text-red-300",
      },
      {
        href: "/contributions",
        label: "Memorial Fund",
        icon: Gift,
        description: "Continue her legacy",
        color: "text-blue-400 hover:text-blue-300",
      },
      {
        href: "/gallery",
        label: "View Gallery",
        icon: Camera,
        description: "Cherished moments",
        color: "text-purple-400 hover:text-purple-300",
      },
      {
        href: "/service",
        label: "Service Info",
        icon: Church,
        description: "Join the celebration",
        color: "text-green-400 hover:text-green-300",
      },
    ],
  };

  const memorialInfo = {
    name: "Phoebe Wangeci Macharia",
    dates: "1957 - 2024",
    church: "PCEA Riruta Satellite Church",
    serviceDate: "December 15, 2024",
    serviceTime: "10:00 AM",
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative ">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/50 to-background"></div>
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 bg-accent-primary/10 rounded-full blur-3xl"
          style={{ opacity }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 bg-accent-secondary/10 rounded-full blur-3xl"
          style={{ opacity }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent)]"></div>
      </div>

      {/* Border decoration */}
      <div className="relative border-t border-gradient-to-r from-transparent via-border to-transparent">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Memorial Info - Takes more space */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Main memorial header */}
              <div className="glass-card p-8 mb-8 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5">
                <div className="flex items-start space-x-4 mb-6">
                  <motion.div
                    className="glass p-4 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Heart className="h-8 w-8 text-accent-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-headings font-semibold text-text-primary mb-2">
                      {memorialInfo.name}
                    </h3>
                    <p className="text-accent-primary font-headings font-medium text-lg mb-1">
                      {memorialInfo.dates}
                    </p>
                    <p className="text-text-secondary font-body text-sm">
                      A Beautiful Life • A Loving Heart • An Eternal Legacy
                    </p>
                  </div>
                </div>

                <blockquote className="text-text-secondary font-body leading-relaxed mb-6 italic text-lg">
                  "A life filled with love, faith, and unwavering service to
                  others. Forever in our hearts, forever inspiring our souls to
                  be better."
                </blockquote>

                {/* Service info with enhanced styling */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface/30">
                    <Church className="h-5 w-5 text-accent-primary" />
                    <div>
                      <p className="font-headings font-medium text-text-primary">
                        {memorialInfo.church}
                      </p>
                      <p className="text-sm text-text-secondary">
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface/30">
                    <Calendar className="h-5 w-5 text-accent-primary" />
                    <div>
                      <p className="font-headings font-medium text-text-primary">
                        Memorial Service
                      </p>
                      <p className="text-sm text-text-secondary">
                        {memorialInfo.serviceDate} at {memorialInfo.serviceTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-6">
                <h4 className="text-xl font-headings font-semibold text-text-primary mb-6 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                  <span>Site Navigation</span>
                </h4>
                <ul className="space-y-3">
                  {footerLinks.navigation.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Link
                          href={link.href}
                          className="group flex items-center space-x-3 text-text-secondary hover:text-accent-primary transition-all duration-300 font-body cursor-pointer p-2 rounded-lg hover:bg-surface/20"
                        >
                          <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          <span className="group-hover:translate-x-1 transition-transform">
                            {link.label}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions & Contact */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Quick Actions */}
              <div className="glass-card p-6">
                <h4 className="text-xl font-headings font-semibold text-text-primary mb-6 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-secondary rounded-full"></div>
                  <span>Quick Actions</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {footerLinks.quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Link
                          href={action.href}
                          className="group flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-surface/30 to-surface/10 hover:from-surface/50 hover:to-surface/30 transition-all duration-300 cursor-pointer border border-border/20 hover:border-accent-primary/30"
                        >
                          <div
                            className={`p-2 rounded-lg ${action.color} bg-current/10`}
                          >
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-headings font-medium text-text-primary group-hover:text-accent-primary transition-colors">
                              {action.label}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {action.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Info */}
              <div className="glass-card p-6 bg-gradient-to-br from-accent-primary/5 to-transparent">
                <h5 className="text-lg font-headings font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-accent-primary" />
                  <span>Get in Touch</span>
                </h5>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface/20">
                    <Phone className="h-4 w-4 text-accent-primary" />
                    <div>
                      <p className="font-body font-medium text-text-primary">
                        +254 700 000 000
                      </p>
                      <p className="text-xs text-text-secondary">
                        Available 24/7
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface/20">
                    <Mail className="h-4 w-4 text-accent-primary" />
                    <div>
                      <p className="font-body font-medium text-text-primary">
                        memorial@phoebe.com
                      </p>
                      <p className="text-xs text-text-secondary">
                        Share your memories
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-surface/20">
                    <MapPin className="h-4 w-4 text-accent-primary mt-0.5" />
                    <div>
                      <p className="font-body font-medium text-text-primary">
                        PCEA Riruta Satellite
                      </p>
                      <p className="text-xs text-text-secondary">
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          className="border-t border-gradient-to-r from-transparent via-border to-transparent pt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              {/* Left side - Copyright */}
              <div className="flex items-center space-x-4">
                <motion.div
                  className="glass p-3 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Star className="h-5 w-5 text-accent-primary" />
                </motion.div>
                <div>
                  <p className="text-text-primary font-headings font-medium">
                    © {currentYear} Phoebe Wangeci Memorial
                  </p>
                  <p className="text-text-secondary font-body text-sm">
                    Created with love, honor, and eternal remembrance
                  </p>
                </div>
              </div>

              {/* Center - Memorial message */}
              <div className="text-center">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center space-x-2 text-accent-primary font-headings font-semibold text-lg"
                >
                  <Heart className="h-5 w-5" />
                  <span>Forever in Our Hearts</span>
                  <Heart className="h-5 w-5" />
                </motion.div>
              </div>

              {/* Right side - Links and scroll to top */}
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-6 text-sm text-text-secondary font-body">
                  <Link
                    href="/privacy"
                    className="hover:text-accent-primary transition-colors cursor-pointer"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/terms"
                    className="hover:text-accent-primary transition-colors cursor-pointer"
                  >
                    Terms
                  </Link>
                </div>

                <motion.button
                  onClick={scrollToTop}
                  className="glass-button p-3 cursor-pointer hover:text-accent-primary transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final tribute message */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 text-text-secondary font-body text-sm">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-accent-primary/30"></div>
            <Users className="h-4 w-4 text-accent-primary" />
            <span>United in memory, bound by love</span>
            <Users className="h-4 w-4 text-accent-primary" />
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent-primary/30"></div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
