"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Church,
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  Car,
  Heart,
  Music,
  BookOpen,
  Flower,
  Coffee,
  Home,
  Cross,
  Compass,
  Navigation,
} from "lucide-react";

// Dynamically import map component to avoid SSR issues
const DynamicMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
      <p className="text-gray-600">Loading map...</p>
    </div>
  ),
}) as React.ComponentType<{ className?: string }>;

const Service = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const getGlassClasses = () => {
    return "bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl";
  };

  const getMutedTextClasses = () => {
    return "text-gray-600";
  };

  const serviceDetails = {
    title: "Memorial Service for Phoebe Wangeci Munge",
    subtitle:
      "Join us as we celebrate the life and legacy of our beloved Phibi - devoted wife, loving mother, dedicated teacher, and faithful servant of God",

    memorial: {
      title: "Memorial & Burial Service",
      date: "Friday, August 8th, 2025",
      departure:
        "9:30 AM - Departure from Egerton University Funeral Home, Njoro",
      arrival:
        "10:15 AM - Expected arrival at family home in Mutukanio Village",
      service: "10:45 AM - Funeral service begins",
      venue: "Family Home - Mutukanio Village, Njoro Sub-county",
      description:
        "A celebration of Phoebe's 44 years of beautiful life, followed by burial at the family home.",
    },
  };

  const schedule = [
    {
      time: "7:00 AM",
      event: "Assembly at Family Home",
      description: "Family and friends gather for final preparations",
      icon: Home,
    },
    {
      time: "7:30 AM",
      event: "Departure to Funeral Home",
      description:
        "Cortège departs from family home to Egerton University Funeral Home",
      icon: Car,
    },
    {
      time: "8:30 AM",
      event: "Arrival at Funeral Home",
      description: "Brief gathering and preparations at Njoro",
      icon: MapPin,
    },
    {
      time: "9:30 AM",
      event: "Departure from Funeral Home",
      description: "Final journey back to the family home",
      icon: Car,
    },
    {
      time: "10:00 AM",
      event: "Arrival at Church/Home",
      description: "Cortège arrives for the memorial service",
      icon: Church,
    },
    {
      time: "10:30 AM",
      event: "Opening Prayer & Hymns",
      description: "Service begins with worship and praise",
      icon: Church,
    },
    {
      time: "10:45 AM",
      event: "Scripture Reading",
      description:
        "Psalm 116:15 - 'Precious in the sight of the Lord is the death of His faithful servants'",
      icon: BookOpen,
    },
    {
      time: "11:00 AM",
      event: "Resurrection Words",
      description: "Words of hope and eternal life",
      icon: Cross,
    },
    {
      time: "11:15 AM",
      event: "Eulogy",
      description: "Celebrating Phoebe's life of grace, compassion and faith",
      icon: Heart,
    },
    {
      time: "11:45 AM",
      event: "Family Tributes",
      description: "Words from husband Joseph, children and extended family",
      icon: Users,
    },
    {
      time: "12:15 PM",
      event: "Community Tributes",
      description:
        "Memories from P.C.E.A. Riruta Parish, El Shama Primary School colleagues",
      icon: Users,
    },
    {
      time: "12:45 PM",
      event: "Final Hymn & Closing Prayer",
      description: "Farewell and commitment to God",
      icon: Music,
    },
    {
      time: "1:00 PM",
      event: "Burial Service",
      description: "Final farewell at the family home",
      icon: Flower,
    },
    {
      time: "2:00 PM",
      event: "Fellowship & Refreshments",
      description: "Community gathering to support the family",
      icon: Coffee,
    },
  ];

  const practicalInfo = [
    {
      title: "Transportation & Parking",
      description:
        "The service will be held at the family home in Mutukanio Village, Njoro Sub-county. Parking will be available in designated areas around the homestead.",
      icon: Car,
      tips: [
        "Follow directions via Egerton University",
        "Carpooling highly encouraged",
        "Local guides will assist with directions",
        "Allow extra travel time from Nairobi (3-4 hours)",
      ],
    },
    {
      title: "Contact Information",
      description:
        "For questions, directions, or special arrangements, please contact the family coordinator.",
      icon: Phone,
      tips: [
        "Dan Githuku: +254 725 231538",
        "Family Support available 24/7",
        "WhatsApp updates available",
        "Financial support via Eunice Njoki: M-Pesa 0725834099",
      ],
    },
    {
      title: "Dress Code & Weather",
      description:
        "Modest, respectful attire appropriate for a Christian memorial service. Njoro weather can be cool, especially in the morning.",
      icon: Heart,
      tips: [
        "Modest, formal or semi-formal attire",
        "Bring a light jacket for morning coolness",
        "Comfortable walking shoes recommended",
        "Dark or muted colors traditional but not required",
      ],
    },
    {
      title: "Accommodation & Meals",
      description:
        "For those traveling from far, local accommodation can be arranged. Refreshments will be provided after the service.",
      icon: Coffee,
      tips: [
        "Contact family for accommodation assistance",
        "Local guesthouses available in Njoro town",
        "Meals provided during the service day",
        "Community support for visitors welcomed",
      ],
    },
  ];

  const mapLocation = {
    lat: -0.3875,
    lng: 35.9375,
    address: "Mutukanio Village, Njoro Sub-county, Nakuru County",
    googleMapsLink: "https://maps.app.goo.gl/zFAvv3hPyphKwnNq7",
  };

  const directions = {
    title: "Getting to Mutukanio Village, Njoro",
    address: "Family Home - Mutukanio Village, Njoro Sub-county, Nakuru County",
    landmarks: [
      "Via Egerton University, Njoro",
      "Near Njoro Township",
      "Mutukanio Village Center",
      "Follow local guides from main road",
    ],
    fromNairobi: [
      "Take Nakuru Highway (A104) - approximately 160km",
      "At Njoro town, follow signs to Egerton University",
      "Continue past Egerton University towards Mutukanio Village",
      "Contact family for final directions: +254 725 231538",
    ],
    publicTransport: [
      "Nairobi to Nakuru: Easy Coach, Guardian, or other bus services",
      "Nakuru to Njoro: Matatu services available",
      "Njoro to Mutukanio: Local transport arranged by family",
    ],
  };

  if (!mounted) {
    return (
      <div className={`min-h-screen ${getBgClasses()} animate-pulse pt-20`}>
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="h-32 bg-white/20 rounded-lg mb-8"></div>
          <div className="h-96 bg-white/20 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getBgClasses()} pt-20`}>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-8`}
            >
              <Church className="h-5 w-5 text-purple-600" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Memorial Service Details
              </span>
            </div>
            <h1
              className={`text-4xl md:text-6xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
            >
              Celebrating the Life of
              <span className="block font-serif bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                Phoebe Wangeci Munge
              </span>
            </h1>
            <p
              className={`text-lg ${getSecondaryTextClasses()} font-normal max-w-4xl mx-auto leading-relaxed`}
            >
              {serviceDetails.subtitle}
            </p>
            <div
              className={`inline-flex items-center space-x-4 mt-8 ${getGlassClasses()} px-6 py-3 rounded-full`}
            >
              <Calendar className="h-5 w-5 text-rose-600" />
              <span className={`font-serif font-medium ${getTextClasses()}`}>
                June 17, 1980 - August 2, 2025 (44 years, 52 days)
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Service Details */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className={`${getGlassClasses()} p-8 md:p-12 rounded-3xl hover:scale-[1.01] transition-all duration-300`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <div
                className={`${getGlassClasses()} p-4 rounded-full mr-6 bg-gradient-to-br from-purple-500/20 to-rose-500/20`}
              >
                <Church className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h2
                  className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()}`}
                >
                  {serviceDetails.memorial.title}
                </h2>
                <p className={`${getSecondaryTextClasses()} font-normal mt-2`}>
                  Final journey and celebration of a life well lived
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                  <div>
                    <p
                      className={`font-serif font-medium ${getTextClasses()} text-lg`}
                    >
                      {serviceDetails.memorial.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-purple-600 mt-1" />
                  <div className="space-y-2">
                    <p className={`${getSecondaryTextClasses()} font-normal`}>
                      <strong>9:30 AM:</strong>{" "}
                      {serviceDetails.memorial.departure}
                    </p>
                    <p className={`${getSecondaryTextClasses()} font-normal`}>
                      <strong>10:15 AM:</strong>{" "}
                      {serviceDetails.memorial.arrival}
                    </p>
                    <p className={`${getSecondaryTextClasses()} font-normal`}>
                      <strong>10:45 AM:</strong>{" "}
                      {serviceDetails.memorial.service}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <p
                      className={`font-serif font-medium ${getTextClasses()} text-lg mb-1`}
                    >
                      {serviceDetails.memorial.venue}
                    </p>
                    <p className={`${getMutedTextClasses()} text-sm`}>
                      Nakuru County, Kenya
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <p className={`${getSecondaryTextClasses()} font-normal`}>
                      <strong>Dan Githuku:</strong> +254 725 231538
                    </p>
                    <p className={`${getMutedTextClasses()} text-sm`}>
                      For directions and support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${getGlassClasses()} p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-rose-500/10`}
            >
              <p
                className={`${getSecondaryTextClasses()} font-normal leading-relaxed text-center`}
              >
                {serviceDetails.memorial.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
              <Navigation className="h-5 w-5 text-purple-600" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Service Location
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()} mb-4`}
            >
              Find Your Way to Mutukanio Village
            </h2>
            <p
              className={`${getSecondaryTextClasses()} font-normal max-w-3xl mx-auto`}
            >
              The memorial service will be held at the family home in Mutukanio
              Village, Njoro Sub-county, Nakuru County
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <DynamicMap className="h-96" />
              <div className="mt-4 text-center">
                <a
                  href="https://www.google.com/maps/place/Mutukanio+Village/@-0.3167,35.9333,15z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-4 py-2 rounded-full text-sm font-medium ${getTextClasses()} hover:scale-105 transition-all duration-300 bg-gradient-to-r from-purple-500/20 to-rose-500/20 hover:from-purple-500/30 hover:to-rose-500/30`}
                >
                  <Compass className="h-4 w-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              className={`${getGlassClasses()} p-8 rounded-3xl`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3
                className={`text-xl font-serif font-medium ${getTextClasses()} mb-6`}
              >
                Directions & Transport
              </h3>

              <div className="space-y-6">
                <div>
                  <h4
                    className={`font-serif font-medium ${getTextClasses()} mb-3`}
                  >
                    From Nairobi (160km)
                  </h4>
                  <ul className="space-y-2">
                    {directions.fromNairobi.map((direction, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className={`${getMutedTextClasses()} text-sm`}>
                          {direction}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4
                    className={`font-serif font-medium ${getTextClasses()} mb-3`}
                  >
                    Public Transport
                  </h4>
                  <ul className="space-y-2">
                    {directions.publicTransport.map((transport, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className={`${getMutedTextClasses()} text-sm`}>
                          {transport}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Schedule */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
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
              <Clock className="h-5 w-5 text-purple-600" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Order of Service
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()} mb-4`}
            >
              Friday, August 8th Schedule
            </h2>
            <p className={`${getSecondaryTextClasses()} font-normal`}>
              Complete timeline for Phoebe's memorial service
            </p>
          </motion.div>

          <div className="space-y-4">
            {schedule.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className={`${getGlassClasses()} p-6 rounded-2xl hover:scale-[1.01] transition-all duration-300 group`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`${getGlassClasses()} p-3 rounded-full flex-shrink-0 bg-gradient-to-br from-purple-500/20 to-rose-500/20 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <IconComponent className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <h3
                            className={`font-serif font-medium ${getTextClasses()} text-lg mb-1`}
                          >
                            {item.event}
                          </h3>
                          <p
                            className={`${getSecondaryTextClasses()} font-normal text-sm leading-relaxed`}
                          >
                            {item.description}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0 sm:ml-4">
                          <span
                            className={`${getGlassClasses()} px-4 py-2 text-sm font-serif font-medium text-purple-600 rounded-full bg-gradient-to-r from-purple-500/10 to-rose-500/10`}
                          >
                            {item.time}
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

      {/* Practical Information */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-rose-500/5"></div>
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
              <Users className="h-5 w-5 text-purple-600" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Practical Information
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()} mb-4`}
            >
              Everything You Need to Know
            </h2>
            <p className={`${getSecondaryTextClasses()} font-normal`}>
              Important details to help you attend the memorial service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practicalInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  className={`${getGlassClasses()} p-8 rounded-3xl hover:scale-[1.01] transition-all duration-300`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-6">
                    <div
                      className={`${getGlassClasses()} p-3 rounded-full mr-4 bg-gradient-to-br from-purple-500/20 to-rose-500/20`}
                    >
                      <IconComponent className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3
                      className={`text-xl font-serif font-medium ${getTextClasses()}`}
                    >
                      {info.title}
                    </h3>
                  </div>
                  <p
                    className={`${getSecondaryTextClasses()} font-normal mb-6 leading-relaxed`}
                  >
                    {info.description}
                  </p>
                  <ul className="space-y-3">
                    {info.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span
                          className={`${getMutedTextClasses()} text-sm font-normal`}
                        >
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={`${getGlassClasses()} p-12 rounded-3xl`}>
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3
                className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()} mb-4`}
              >
                Join Us in Celebrating Phibi's Life
              </h3>
              <p
                className={`${getSecondaryTextClasses()} font-normal mb-8 text-lg leading-relaxed max-w-2xl mx-auto`}
              >
                Your presence will be a blessing to the family as we celebrate
                the remarkable life of Phoebe Wangeci Munge - teacher, mother,
                wife, and faithful servant of God.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.a
                  href="tel:+254725231538"
                  className={`${getGlassClasses()} px-8 py-4 text-lg font-serif font-medium cursor-pointer hover:scale-105 transition-all duration-300 flex items-center space-x-3 group rounded-full bg-gradient-to-r from-purple-500/20 to-rose-500/20 hover:from-purple-500/30 hover:to-rose-500/30`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="h-5 w-5 group-hover:scale-110 transition-transform text-purple-600" />
                  <span className={getTextClasses()}>Call Dan Githuku</span>
                </motion.a>

                <motion.a
                  href="/tributes"
                  className={`${getGlassClasses()} px-8 py-4 text-lg font-serif font-medium cursor-pointer hover:scale-105 transition-all duration-300 flex items-center space-x-3 group rounded-full border border-purple-500/30`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="h-5 w-5 group-hover:scale-110 transition-transform text-purple-600" />
                  <span className={getTextClasses()}>Share a Memory</span>
                </motion.a>
              </div>

              <div className={`mt-8 pt-8 border-t border-gray-200/30`}>
                <div
                  className={`${getGlassClasses()} p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-rose-500/10`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-br from-amber-500/20 to-rose-500/20">
                      <Coffee className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="text-left">
                      <h4
                        className={`font-serif font-medium ${getTextClasses()} mb-1`}
                      >
                        Financial Support
                      </h4>
                      <p
                        className={`${getMutedTextClasses()} text-sm leading-relaxed`}
                      >
                        To support the family during this time, contributions
                        can be sent via M-Pesa to{" "}
                        <strong>Eunice Njoki: 0725834099</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Service;
