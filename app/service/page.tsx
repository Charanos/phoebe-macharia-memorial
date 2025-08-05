"use client";

import React from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

const Service = () => {
  const serviceDetails = {
    title: "Memorial Service Details",
    subtitle:
      "Join us as we celebrate the life and legacy of Phoebe Wangeci Macharia",

    mainService: {
      title: "Memorial Service",
      date: "Saturday, December 15, 2024",
      time: "10:00 AM - 12:00 PM",
      venue: "PCEA Riruta Satellite Church",
      address: "Riruta, Nairobi, Kenya",
      description:
        "A celebration of Phoebe's life, faith, and the impact she made on our community.",
    },

    celebrationOfLife: {
      title: "Celebration of Life Gathering",
      date: "Saturday, December 16, 2024",
      time: "2:00 PM - 6:00 PM",
      venue: "Family Home",
      address: "Nairobi, Kenya",
      description:
        "An intimate gathering for family and close friends to share memories and celebrate Phoebe's life.",
    },
  };

  const schedule = [
    {
      time: "9:30 AM",
      event: "Arrival & Registration",
      description: "Welcome and sign the memorial book",
      icon: Users,
    },
    {
      time: "10:00 AM",
      event: "Opening Prayer & Hymn",
      description: "Led by Pastor John Mwangi",
      icon: Church,
    },
    {
      time: "10:15 AM",
      event: "Scripture Reading",
      description: "Psalm 23 & John 14:1-6",
      icon: BookOpen,
    },
    {
      time: "10:30 AM",
      event: "Musical Tribute",
      description: "Church choir performance",
      icon: Music,
    },
    {
      time: "10:45 AM",
      event: "Eulogy",
      description: "Celebrating Phoebe's life and legacy",
      icon: Heart,
    },
    {
      time: "11:15 AM",
      event: "Family Tributes",
      description: "Words from loved ones",
      icon: Users,
    },
    {
      time: "11:45 AM",
      event: "Closing Prayer & Benediction",
      description: "Final blessings and farewell",
      icon: Church,
    },
    {
      time: "12:00 PM",
      event: "Reception",
      description: "Light refreshments and fellowship",
      icon: Coffee,
    },
  ];

  const practicalInfo = [
    {
      title: "Parking",
      description:
        "Free parking available at the church premises and nearby streets. Arrive early for the best spots.",
      icon: Car,
      tips: [
        "Arrive 30 minutes early",
        "Carpooling encouraged",
        "Street parking available",
      ],
    },
    {
      title: "Contact Information",
      description:
        "For questions or special arrangements, please contact the family coordinator.",
      icon: Phone,
      tips: [
        "Family Coordinator: +254 700 000 000",
        "Church Office: +254 700 000 001",
        "Available 8 AM - 6 PM",
      ],
    },
    {
      title: "Dress Code",
      description:
        "Smart casual or formal attire. Colors welcome - Phoebe loved vibrant, joyful colors.",
      icon: Heart,
      tips: [
        "Smart casual or formal",
        "Bright colors welcome",
        "Comfortable shoes recommended",
      ],
    },
    {
      title: "Flowers & Donations",
      description:
        "In lieu of flowers, donations can be made to the Memorial Fund for community projects.",
      icon: Flower,
      tips: [
        "Memorial Fund preferred",
        "Fresh flowers welcome",
        "Potted plants appreciated",
      ],
    },
  ];

  const directions = {
    title: "Getting to PCEA Riruta Satellite",
    address: "Riruta, Nairobi, Kenya",
    landmarks: [
      "Near Riruta Shopping Center",
      "Opposite Riruta Primary School",
      "5 minutes from Kawangware Junction",
    ],
    publicTransport: [
      "Matatu Route 46 from CBD",
      "Route 111 from Westlands",
      "Alight at Riruta Shopping Center",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="glass p-4 rounded-full mr-4">
                <Church className="h-8 w-8 text-accent-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-headings font-semibold text-text-primary">
                {serviceDetails.title}
              </h1>
            </div>
            <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto">
              {serviceDetails.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Service & Celebration Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Memorial Service */}
            <motion.div
              className="glass-card p-8 hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="glass p-3 rounded-full mr-4">
                  <Church className="h-6 w-6 text-accent-primary" />
                </div>
                <h2 className="text-2xl font-headings font-semibold text-text-primary">
                  {serviceDetails.mainService.title}
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-accent-primary" />
                  <span className="font-headings font-medium text-text-primary">
                    {serviceDetails.mainService.date}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-accent-primary" />
                  <span className="font-body text-text-secondary">
                    {serviceDetails.mainService.time}
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-accent-primary mt-0.5" />
                  <div>
                    <p className="font-headings font-medium text-text-primary">
                      {serviceDetails.mainService.venue}
                    </p>
                    <p className="font-body text-text-secondary text-sm">
                      {serviceDetails.mainService.address}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-text-secondary font-body leading-relaxed">
                {serviceDetails.mainService.description}
              </p>
            </motion.div>

            {/* Celebration of Life */}
            <motion.div
              className="glass-card p-8 hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="glass p-3 rounded-full mr-4">
                  <Heart className="h-6 w-6 text-accent-secondary" />
                </div>
                <h2 className="text-2xl font-headings font-semibold text-text-primary">
                  {serviceDetails.celebrationOfLife.title}
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-accent-secondary" />
                  <span className="font-headings font-medium text-text-primary">
                    {serviceDetails.celebrationOfLife.date}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-accent-secondary" />
                  <span className="font-body text-text-secondary">
                    {serviceDetails.celebrationOfLife.time}
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-accent-secondary mt-0.5" />
                  <div>
                    <p className="font-headings font-medium text-text-primary">
                      {serviceDetails.celebrationOfLife.venue}
                    </p>
                    <p className="font-body text-text-secondary text-sm">
                      {serviceDetails.celebrationOfLife.address}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-text-secondary font-body leading-relaxed">
                {serviceDetails.celebrationOfLife.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Schedule */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-headings font-semibold text-text-primary mb-4">
              Service Schedule
            </h2>
            <p className="text-text-secondary font-body">
              Order of service for the memorial celebration
            </p>
          </motion.div>

          <div className="space-y-4">
            {schedule.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-card p-6 hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="glass p-3 rounded-full flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-accent-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-headings font-medium text-text-primary">
                            {item.event}
                          </h3>
                          <p className="text-text-secondary font-body text-sm">
                            {item.description}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <span className="glass px-3 py-1 text-sm font-headings font-medium text-accent-primary">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative ">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5"></div>
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-headings font-semibold text-text-primary mb-4">
              Practical Information
            </h2>
            <p className="text-text-secondary font-body">
              Everything you need to know for the service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practicalInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-card p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="glass p-3 rounded-full mr-4">
                      <IconComponent className="h-6 w-6 text-accent-primary" />
                    </div>
                    <h3 className="text-xl font-headings font-medium text-text-primary">
                      {info.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary font-body mb-4 leading-relaxed">
                    {info.description}
                  </p>
                  <ul className="space-y-2">
                    {info.tips.map((tip, tipIndex) => (
                      <li
                        key={tipIndex}
                        className="flex items-center space-x-2 text-sm text-text-secondary font-body"
                      >
                        <div className="w-1.5 h-1.5 bg-accent-primary rounded-full flex-shrink-0"></div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="glass p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-accent-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-headings font-semibold text-text-primary">
                {directions.title}
              </h2>
            </div>

            <p className="text-lg font-headings font-medium text-text-primary mb-6">
              {directions.address}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-headings font-medium text-text-primary mb-4">
                  Nearby Landmarks
                </h3>
                <ul className="space-y-2">
                  {directions.landmarks.map((landmark, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-text-secondary font-body"
                    >
                      <div className="w-1.5 h-1.5 bg-accent-primary rounded-full flex-shrink-0"></div>
                      <span>{landmark}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-headings font-medium text-text-primary mb-4">
                  Public Transport
                </h3>
                <ul className="space-y-2">
                  {directions.publicTransport.map((transport, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-text-secondary font-body"
                    >
                      <div className="w-1.5 h-1.5 bg-accent-secondary rounded-full flex-shrink-0"></div>
                      <span>{transport}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-headings font-medium text-text-primary mb-4">
              Questions or Special Needs?
            </h3>
            <p className="text-text-secondary font-body mb-8">
              Please don't hesitate to contact us if you have any questions or
              require special arrangements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="/contact"
                className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-5 w-5" />
                <span>Contact Us</span>
              </motion.a>

              <motion.a
                href="/tributes"
                className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-secondary transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-5 w-5" />
                <span>Share Memory</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Service;
