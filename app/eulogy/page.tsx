"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useTheme } from "../../components/providers/ThemeProvider";
import {
  BookOpen,
  Heart,
  Star,
  Quote,
  Church,
  Users,
  Sparkles,
  Calendar,
  Crown,
  ArrowRight,
  Camera,
  Flower2,
  Sun,
  Music,
  Home,
  GraduationCap,
  MapPin,
  Award,
  Baby,
  School,
  Briefcase,
  Clock,
} from "lucide-react";

const Eulogy = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      location: "P.C.E.A. Riruta Parish Satellite Church",
      date: "August 2025",
      time: "10:30 AM",
    },
  };

  const quotes = [
    {
      text: "Her kindness and strength were never separate - she showed us that love can be firm without being harsh, and that forgiveness was her greatest superpower.",
      author: "Her Children - Dennis & Eric",
      icon: Heart,
    },
    {
      text: "She was the cornerstone of our Holiday Vocational Bible Study programs, leading with contagious energy and unwavering dedication to God's children.",
      author: "P.C.E.A. Riruta Parish Satellite",
      icon: Church,
    },
    {
      text: "Family always came first, and her faith lit even the darkest paths with humility and love. Her laughter was medicine, her presence was comfort.",
      author: "Joseph Munge Githuku - Loving Husband",
      icon: Sparkles,
    },
    {
      text: "You were the third child I conceived — and I remember it like it was yesterday. You came into my life tender and peaceful, a source of immense joy.",
      author: "Tribute to My Beloved Daughter",
      icon: Baby,
    },
    {
      text: "She was our strength in times of trouble, our wisdom in moments of uncertainty, and our companion in times of joy. Her presence will always remain by our side.",
      author: "Tribute to Our Beloved Sister",
      icon: Users,
    },
  ];

  const serviceProgram = [
    "7:00am - Assemble at home",
    "7:30am - Departure from home to mortuary",
    "8:30am - Arrival at Mortuary",
    "9:30am - Departure from mortuary",
    "10:00am - Arrival at Church",
    "10:30am - Church Service",
  ];

  const floatingElements = [
    { icon: Heart, delay: 0, color: "text-rose-400" },
    { icon: Star, delay: 1.5, color: "text-amber-300" },
    { icon: Flower2, delay: 2.5, color: "text-pink-300" },
    { icon: Sparkles, delay: 3.5, color: "text-purple-300" },
    { icon: Sun, delay: 4.5, color: "text-yellow-300" },
    { icon: Music, delay: 5.5, color: "text-blue-300" },
  ];

  // Light theme only - consistent with About page
  const getBgClasses = (variant = 1) => {
    return variant === 1
      ? "bg-gradient-to-br from-rose-50 via-purple-50/80 to-amber-50"
      : "bg-gradient-to-bl from-amber-50 via-rose-50/80 to-purple-50";
  };

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
        className={`pt-14 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(
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

        <div className="relative max-w-7xl mx-auto text-center pt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-8`}
            >
              <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Memorial Eulogy
              </span>
            </div>

            <h1
              className={`text-4xl md:text-6xl font-serif font-semibold ${getTextClasses()} mb-6 leading-tight`}
            >
              {eulogyContent.title}
              <span className="block !bg-gradient-to-r !from-purple-600 !via-rose-600 !to-amber-600 !dark:from-purple-300 !dark:via-rose-300 !dark:to-amber-300 !bg-clip-text !text-transparent text-2xl md:text-3xl mt-4">
                {eulogyContent.subtitle}
              </span>
            </h1>

            <div
              className={`${getGlassClasses()} p-8 md:p-12 max-w-4xl mx-auto rounded-3xl`}
            >
              <motion.div
                className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 mb-8"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Quote className="h-8 w-8 text-purple-600 dark:text-purple-300" />
              </motion.div>

              <p
                className={`text-lg md:text-xl ${getSecondaryTextClasses()} font-normal leading-relaxed italic mb-6`}
              >
                {eulogyContent.introduction}
              </p>

              <div className="border-t border-white/20 pt-6">
                <p className={`text-lg font-serif ${getTextClasses()}`}>
                  {eulogyContent.dates}
                </p>
                <p className={`${getMutedTextClasses()} mt-2`}>
                  "A life beautifully lived, a legacy lovingly remembered"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Memorial Service Details */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-purple-500/5"></div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-6`}
            >
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Service Information
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-serif font-semibold ${getTextClasses()}`}
            >
              Memorial Service Details
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className={`${getGlassClasses()} p-8 text-center rounded-3xl bg-gradient-to-br from-purple-500/10 to-rose-500/10`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20">
                  <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <h3
                  className={`text-2xl md:text-3xl font-serif font-semibold ${getTextClasses()}`}
                >
                  Service Details
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 text-center">
                <div>
                  <MapPin className="h-5 w-5 text-purple-600 mx-auto mb-2" />
                  <p className={`font-semibold ${getTextClasses()} mb-1`}>
                    Location
                  </p>
                  <p className={`${getSecondaryTextClasses()}`}>
                    P.C.E.A. Riruta Parish
                  </p>
                  <p className={`${getMutedTextClasses()} text-sm`}>
                    Satellite Church
                  </p>
                </div>
                <div>
                  <Calendar className="h-5 w-5 text-purple-600 mx-auto mb-2" />
                  <p className={`font-semibold ${getTextClasses()} mb-1`}>
                    Date & Time
                  </p>
                  <p className={`${getSecondaryTextClasses()}`}>August 2025</p>
                  <p className={`${getMutedTextClasses()} text-sm`}>
                    10:30 AM Church Service
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`${getGlassClasses()} p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/10`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <h3
                  className={`text-2xl font-serif font-semibold ${getTextClasses()}`}
                >
                  Service Program
                </h3>
              </div>
              <div className="space-y-3">
                {serviceProgram.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500/60"></div>
                    <p className={`${getSecondaryTextClasses()} text-sm`}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Family Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(1)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-rose-500/5 via-transparent to-purple-500/5"></div>

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
              <Heart className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Family Tree
              </span>
            </div>
            <h2
              className={`text-4xl md:text-5xl font-serif font-semibold ${getTextClasses()} mb-4`}
            >
              Her Beautiful Family
            </h2>
            <p
              className={`text-xl ${getSecondaryTextClasses()} font-normal max-w-3xl mx-auto`}
            >
              The loving family that was the center of Phoebe's world and her
              greatest source of joy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className={`${getGlassClasses()} p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 mx-auto w-fit mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3
                  className={`text-xl font-serif font-semibold ${getTextClasses()} mb-4`}
                >
                  Parents
                </h3>
                <p className={`${getSecondaryTextClasses()} font-medium mb-1`}>
                  (Late) James Macharia Thiong'o
                </p>
                <p className={`${getSecondaryTextClasses()} font-medium`}>
                  Rtd. Eld. Zeliphah Wamahiga Macharia
                </p>
              </div>
            </motion.div>

            <motion.div
              className={`${getGlassClasses()} p-8 rounded-3xl bg-gradient-to-br from-rose-500/10 to-pink-500/10`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 mx-auto w-fit mb-4">
                  <Heart className="h-8 w-8 text-rose-600" />
                </div>
                <h3
                  className={`text-xl font-serif font-semibold ${getTextClasses()} mb-4`}
                >
                  Beloved Husband
                </h3>
                <p className={`${getSecondaryTextClasses()} font-medium`}>
                  Joseph Munge Githuku
                </p>
                <p className={`${getMutedTextClasses()} text-sm mt-2 italic`}>
                  "Family always came first, and her faith lit even the darkest
                  paths"
                </p>
              </div>
            </motion.div>

            <motion.div
              className={`${getGlassClasses()} p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 mx-auto w-fit mb-4">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
                <h3
                  className={`text-xl font-serif font-semibold ${getTextClasses()} mb-4`}
                >
                  Siblings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <p className={`${getSecondaryTextClasses()} text-sm`}>
                    (Late) Harun Ruben Thiong'o Macharia
                  </p>
                  <p className={`${getSecondaryTextClasses()} text-sm`}>
                    Mary Nyambura Macharia
                  </p>
                  <p className={`${getSecondaryTextClasses()} text-sm`}>
                    Philip E. Kimutiri Macharia
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`${getGlassClasses()} p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-teal-500/10 md:col-span-2 lg:col-span-3`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-teal-500/20 mx-auto w-fit mb-6">
                  <Baby className="h-8 w-8 text-green-600" />
                </div>
                <h3
                  className={`text-2xl font-serif font-semibold ${getTextClasses()} mb-6`}
                >
                  Her Six Beloved Children
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {eulogyContent.familyInfo.children.map((child, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/30 backdrop-blur-sm"
                    >
                      <p className={`${getSecondaryTextClasses()} font-medium`}>
                        {child}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eulogy Sections */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-rose-500/5 via-transparent to-purple-500/5"></div>

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
              <span className={`text-sm font-medium ${getTextClasses()}`}>
                Her Beautiful Life
              </span>
            </div>
            <h2
              className={`text-4xl md:text-5xl font-serif font-semibold ${getTextClasses()} mb-4`}
            >
              Celebrating Her Legacy
            </h2>
            <p
              className={`text-xl ${getSecondaryTextClasses()} font-normal max-w-3xl mx-auto`}
            >
              Each aspect of Phoebe's life tells a story of love, faith, and
              unwavering dedication to others.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {eulogyContent.sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={index}
                  className={`${getGlassClasses()} p-8 md:p-10 rounded-3xl bg-gradient-to-br ${
                    section.gradient
                  } hover:scale-105 transition-all duration-500 group`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 mr-4 group-hover:from-white/30 group-hover:to-white/20 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3
                      className={`text-2xl md:text-3xl font-serif font-semibold ${getTextClasses()}`}
                    >
                      {section.title}
                    </h3>
                  </div>
                  <p
                    className={`text-lg ${getSecondaryTextClasses()} font-normal leading-relaxed`}
                  >
                    {section.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(1)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-rose-500/10"></div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-14`}
            >
              <Quote className="h-5 w-5 text-purple-600 dark:text-purple-300 " />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Words of Remembrance
              </span>
            </div>
            <h2
              className={`text-4xl md:text-5xl font-serif font-semibold ${getTextClasses()} mb-6 leading-tight`}
            >
              Heartfelt
              <span className="block bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 dark:from-purple-300 dark:via-rose-300 dark:to-amber-300 bg-clip-text text-transparent">
                Tributes
              </span>
            </h2>
            <p
              className={`text-xl ${getSecondaryTextClasses()} font-normal max-w-3xl mx-auto`}
            >
              Beautiful words from those whose lives she touched most deeply.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {quotes.map((quote, index) => {
              const IconComponent = quote.icon;
              return (
                <motion.div
                  key={index}
                  className={`${getGlassClasses()} p-8 text-center rounded-3xl hover:scale-105 transition-all duration-500 group`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 group-hover:from-purple-500/30 group-hover:to-rose-500/30 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-purple-600 " />
                    </div>
                  </div>

                  <blockquote
                    className={`text-lg ${getSecondaryTextClasses()} italic mb-6 leading-relaxed font-normal`}
                  >
                    "{quote.text}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
                    <cite
                      className={`font-serif font-medium text-purple-600 px-2 text-sm`}
                    >
                      {quote.author}
                    </cite>
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-rose-500/10"></div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            className={`${getGlassClasses()} p-12 md:p-16 text-center rounded-3xl`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-rose-500/10 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="p-6 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20">
                  <Crown className="h-12 w-12 text-purple-600 " />
                </div>
              </div>

              <h2
                className={`text-2xl md:text-3xl font-serif font-semibold ${getTextClasses()} mb-8 leading-tight`}
              >
                A Legacy That
                <span className="block bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600  !bg-clip-text !text-transparent">
                  Lives On
                </span>
              </h2>

              <p
                className={`text-lg md:text-xl ${getSecondaryTextClasses()} font-normal leading-relaxed mb-10`}
              >
                {eulogyContent.closing}
              </p>

              <div className="border-t border-white/20 pt-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20">
                    <Star className="h-8 w-8 text-amber-500" />
                  </div>
                </div>

                <p
                  className={`text-lg md:text-xl text-purple-600 font-serif italic leading-relaxed`}
                >
                  {eulogyContent.finalWords}
                </p>

                <div className="flex items-center justify-center mt-8 space-x-4">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-600 dark:via-purple-300 to-transparent"></div>
                  <p
                    className={`${getMutedTextClasses()} font-serif italic text-center max-w-md`}
                  >
                    "She served God's purposes in her generation with total
                    commitment, love, and dedication." - The Lord, in His divine
                    wisdom and mercy, has called her home to eternal rest.
                  </p>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-600 dark:via-purple-300 to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`py-24 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(1)}`}
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
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-14`}
            >
              <Heart className="h-5 w-5 text-purple-600 " />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Honor Her Memory
              </span>
            </div>

            <h2
              className={`text-4xl md:text-6xl font-serif font-semibold ${getTextClasses()} mb-6 leading-tight`}
            >
              Continue Her
              <span className="block bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600  bg-clip-text text-transparent">
                Beautiful Legacy
              </span>
            </h2>

            <p
              className={`text-xl ${getSecondaryTextClasses()} max-w-3xl mx-auto font-normal leading-relaxed mb-12`}
            >
              Share your own memories and tributes to celebrate Phoebe's
              beautiful life. Her story continues through each heart she
              touched.
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
                    <span className="text-lg">Share a Tribute</span>
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
                    <span className="text-lg">View Memories</span>
                  </div>
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  className={`${getGlassClasses()} px-10 py-5 rounded-full font-semibold ${getTextClasses()} hover:scale-105 transition-all duration-300 group cursor-pointer border border-rose-500/20`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-6 w-6 text-rose-600 dark:text-rose-300" />
                    <span className="text-lg">Her Story</span>
                  </div>
                </motion.button>
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center items-center space-x-8 pt-12 opacity-60">
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
                <Church className="h-6 w-6 text-purple-400" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -3, 3, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3,
                }}
              >
                <Sparkles className="h-6 w-6 text-blue-400" />
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

export default Eulogy;
