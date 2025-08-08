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
  Briefcase,
  Users,
  GraduationCap,
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

  const eulogyContent = {
    title: "A Life Well Lived",
    subtitle: "Celebrating the Beautiful Journey of Phoebe Wangeci Munge",
    dates: "17th June 1980 - 2nd August 2025",
    introduction:
      "Today, we gather not just to mourn the loss of Phoebe Wangeci Munge, but to celebrate a life that touched so many hearts, a soul that radiated love, and a spirit that will forever inspire us. Born on 17th June 1980 in Embakasi Village to the late James Macharia Thiong'o and Rid. Fid. Zeliphah Wamahiga Macharia, she lived 45 years of purpose, love, and unwavering faith.",

    familyInfo: {
      parents:
        "James Macharia Thiong'o and Rid. Fid. Zeliphah Wamahiga Macharia",
      siblings:
        "Harun Ruben Thiong'o Macharia, Mary Nyambura Macharia, and Philip E. Kimutiri Macharia",
      husband: "Joseph Munge Githuku",
      children: [
        "Eric Githuku Munge",
        "Dennis Kihuha Munge",
        "Mercy Njoki Munge",
        "Samuel Kamau Munge",
        "Keren Wamahiga Munge",
        "Jesse Macharia Munge",
      ],
    },

    sections: [
      {
        title: "A Devoted Wife and Mother",
        icon: Heart,
        content:
          "Phoebe's greatest joy came from her beloved family. She was the cherished wife of Joseph Munge Githuku and devoted mother to six wonderful children: Eric, Dennis, Mercy, Samuel, Keren, and Jesse. As the third child in a close-knit family of four children, she shared her life's journey alongside her siblings: Harun Ruben Thiong'o Macharia, Mary Nyambura Macharia, and Philip E. Kimutiri Macharia. Her love knew no boundaries - it extended to embrace friends, neighbors, students, and even strangers who became family through her abundant kindness.",
        gradient: "from-rose-500/20 to-pink-500/20",
      },
      {
        title: "Faith as Her Foundation",
        icon: Church,
        content:
          "Baptized at P.C.E.A. Embakasi Church in 1980 and confirmed on 18th December 1994, Phoebe's relationship with God was the cornerstone of her life. She remained an active member until 2007, when she joined P.C.E.A. Riruta Parish Satellite Church, where she continued to serve the Lord faithfully. Her service as a Sunday school teacher, Holiday Vocational Bible Study leader, and Women's Guild member demonstrated Christ's love through her actions, words, and unwavering compassion for others.",
        gradient: "from-purple-500/20 to-indigo-500/20",
      },
      {
        title: "Educational Excellence",
        icon: GraduationCap,
        content:
          "Phoebe began her education in 1984 at Embakasi Primary School. In class six, she transferred to Jetu Girls Primary School, where she sat for her Kenya Certificate of Primary Education (K.C.P.E.) in 1994. Her academic journey continued at Kagwe Girls Secondary School for her secondary studies. After four dedicated years, she successfully completed her Kenya Certificate of Secondary Education (K.C.S.E.) in 1999 with commendable results.",
        gradient: "from-blue-500/20 to-cyan-500/20",
      },
      {
        title: "A Servant's Heart in Teaching",
        icon: Users,
        content:
          "Inspired by a deep desire to become a teacher, Phoebe enrolled at the Presbyterian Teachers College, Rubate, in 2002 to pursue her higher education in the teaching profession. Upon completion of her training, she embarked on her teaching career with enthusiasm and excellence. Her dedication and strong work ethic earned her the position of Deputy Head Teacher at El Shama Primary School in Embakasi, where she also resided, shaping young minds with patience, care, and unwavering dedication.",
        gradient: "from-amber-500/20 to-orange-500/20",
      },
      {
        title: "Entrepreneurial Spirit",
        icon: Briefcase,
        content:
          "After a fruitful career in education, Phoebe transitioned into the world of business, carrying with her the same drive and determination. She established a successful venture in Nairobi, specializing in the sale of office stationery and electronics. Through her diverse journey in both education and entrepreneurship, Phoebe Wangeci left a legacy of hard work, resilience, and passion for service that inspired all who knew her.",
        gradient: "from-green-500/20 to-teal-500/20",
      },
      {
        title: "Ministry and Service",
        icon: Sparkles,
        content:
          "Phoebe was deeply involved in ministry, especially in Children's Ministry, a calling she embraced wholeheartedly from 2002. Her love for children and passion for nurturing them in Christian values was evident to all who served alongside her. She was officially commissioned in 2005, marking a significant milestone in her ministry journey. Following her move to Riruta Parish, Phoebe became a cornerstone of the Holiday Vocational Bible Study (VBS) programs, where she led from the front with dedication and spiritual insight.",
        gradient: "from-violet-500/20 to-purple-500/20",
      },
      {
        title: "A Life of Grace and Strength",
        icon: Crown,
        content:
          "Her kindness was never separate from her strength. Through her example, she showed us that love can be firm without being harsh, that true care often comes in the form of quiet correction wrapped in compassion, and that understanding speaks louder than judgment. She had a remarkable gift for finding light in the darkest moments and sharing that light with others. Her infectious laughter, refreshing humor, and radiant smile melted every heart she encountered.",
        gradient: "from-pink-500/20 to-rose-500/20",
      },
      {
        title: "Her Final Days",
        icon: Star,
        content:
          "Phoebe lived a healthy and vibrant life, full of purpose. On the morning of 9th July 2025, she sustained an injury to her left leg which resulted in a fracture. She received initial treatment and bandaging at Matheri Hospital in Nyeri. Two weeks later, she was reviewed at PCEA Kikuyu Hospital, where her bandage was replaced with a more supportive cast. However, in the early hours of 2nd August 2025, Phoebe began experiencing sudden chest pains and difficulty in breathing. She collapsed shortly after. Despite being rushed to Bristol Park Hospital in Fedha, Embakasi, the medical team confirmed her passing.",
        gradient: "from-amber-500/20 to-yellow-500/20",
      },
    ],

    closing:
      "Phoebe has left behind a legacy of faith, love, and strength. She is survived by her loving husband and six beloved children, who will forever carry her memory in their hearts. As we say goodbye to our beloved Phoebe, let us carry forward the lessons she taught us through her beautiful example. Let us love more deeply, serve more willingly, and live more faithfully.",

    finalWords:
      "Rest in eternal peace, dear Phoebe, till we meet again. 'Precious in the sight of the Lord is the death of His faithful servants.' - Psalm 116:15. Her race is finished, her faith is complete, and her reward is eternal. Until we meet again in that place where there are no more tears, no more pain, only everlasting joy in the presence of our Lord.",

    memorialDetails: {
      location: "Family Home - Mutukanio Village, Njoro Sub-county",
      date: "August 8, 2025",
      time: "10:45 AM",
    },
  };

  const memorialInfo = {
    mainService: {
      title: "Memorial & Burial Service",
      date: "Friday, August 8th, 2025",
      time: "10:45 AM",
      location: "Family Home - Mutukanio Village, Njoro Sub-county",
    },
    celebration: {
      title: "Assembly at Family Home",
      date: "Friday, August 8th, 2025",
      time: "7:00 AM",
      location: "Family Home - Mutukanio Village, Njoro Sub-county",
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
          {/* Final Memorial Section */}
          <section
            className={`py-16 px-4 sm:px-6 lg:px-8 relative ${getBgClasses}`}
          >
            <div className="relative max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div
                  className={`${getGlassClasses()} p-8 rounded-3xl bg-gradient-to-br from-purple-500/5 to-rose-500/5`}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20">
                      <Crown className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>

                  <h3
                    className={`text-2xl font-serif font-semibold ${getTextClasses()} mb-4`}
                  >
                    In Loving Memory
                  </h3>

                  <p className={`text-lg font-serif ${getTextClasses()} mb-2`}>
                    Phoebe Wangeci Munge
                  </p>
                  <p className={`${getSecondaryTextClasses()} mb-4`}>
                    {eulogyContent.dates}
                  </p>
                  <p
                    className={`${getMutedTextClasses()} font-normal italic mb-6`}
                  >
                    "A life beautifully lived, a legacy lovingly remembered"
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

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
                  className={`${getSecondaryTextClasses()} font-normal leading-relaxed mb-6`}
                >
                  Celebrating the beautiful life of a devoted wife, loving
                  mother, and dedicated Sunday school teacher who touched
                  countless hearts with her faith and kindness.
                </p>
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
