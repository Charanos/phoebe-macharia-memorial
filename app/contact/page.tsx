"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Heart,
  Church,
  User,
  Coffee,
  Users,
  Shield,
} from "lucide-react";
import { useToast } from "../../components/ui/toast";

const Contact = () => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Light theme consistent with service page
  const getBgClasses = (variant = 1) => {
    return variant === 1
      ? "bg-gradient-to-br from-rose-50 via-purple-50/80 to-amber-50"
      : "bg-gradient-to-bl from-amber-50 via-rose-50/80 to-purple-50";
  };

  const getTextClasses = () => "text-gray-900";
  const getSecondaryTextClasses = () => "text-gray-800";
  const getGlassClasses = () =>
    "bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl";
  const getMutedTextClasses = () => "text-gray-600";

  const contactInfo = [
    {
      title: "Family Coordinator",
      details: "Dan Githuku: +254 725 231538",
      description:
        "Primary contact for memorial service arrangements, directions, and general support",
      icon: Phone,
      color: "text-purple-600",
      urgent: true,
    },
    {
      title: "Financial Support",
      details: "Eunice Njoki: 0725834099",
      description:
        "M-Pesa contributions for funeral expenses and family support",
      icon: Phone,
      color: "text-rose-600",
      urgent: true,
    },
    {
      title: "Email Messages",
      details: "phoebememorial2025@gmail.com",
      description:
        "Send condolence messages, photos, tributes, or written memories of Phibi",
      icon: Mail,
      color: "text-amber-600",
    },
    {
      title: "Church Support",
      details: "PCEA Riruta Satellite",
      description:
        "Pastoral care, spiritual guidance, and church community support",
      icon: Church,
      color: "text-purple-600",
    },
  ];

  const supportServices = [
    {
      title: "Immediate Assistance",
      description:
        "24/7 availability for urgent family needs and memorial service coordination",
      icon: Shield,
      contact: "Dan Githuku: +254 725 231538",
    },
    {
      title: "Transport & Directions",
      description:
        "Help with directions to Mutukanio Village and transport arrangements",
      icon: MapPin,
      contact: "Family coordinators available",
    },
    {
      title: "Accommodation Support",
      description:
        "Assistance finding local accommodation for out-of-town visitors",
      icon: Coffee,
      contact: "Contact family coordinator",
    },
    {
      title: "Community Support",
      description:
        "Connecting with the PCEA Riruta community and El Shama Primary School colleagues",
      icon: Users,
      contact: "Through church network",
    },
  ];

  const officeHours = [
    { day: "Memorial Week", hours: "Available 24/7", urgent: true },
    {
      day: "Church Office",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM",
      urgent: false,
    },
    { day: "Family Home", hours: "Daily: 6:00 AM - 10:00 PM", urgent: false },
    {
      day: "Weekend Support",
      hours: "Saturday & Sunday: As needed",
      urgent: false,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        showToast({
          type: "success",
          title: "Message Sent Successfully",
          message:
            "Thank you for your message. The family will respond as soon as possible.",
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 6000);
      } else {
        showToast({
          type: "error",
          title: "Failed to Send Message",
          message:
            result.error || "Please try again or contact us directly by phone.",
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        title: "Connection Error",
        message: "Please check your internet connection or call us directly.",
      });
    } finally {
      setSubmitting(false);
    }
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
              <Phone className="h-5 w-5 text-purple-600" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Contact & Support
              </span>
            </div>
            <h1
              className={`text-4xl md:text-6xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
            >
              We're Here to
              <span className="block font-serif bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                Support You
              </span>
            </h1>
            <p
              className={`text-lg ${getSecondaryTextClasses()} font-normal max-w-4xl mx-auto leading-relaxed`}
            >
              Whether you need directions to the memorial service, want to share
              a memory of Phibi, or require assistance during this difficult
              time, we're here to help you honor her legacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Primary Contact Information */}
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
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Primary Contacts
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()} mb-4`}
            >
              Get in Touch
            </h2>
            <p className={`${getSecondaryTextClasses()} font-normal`}>
              Multiple ways to connect with the family and support network
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  className={`${getGlassClasses()} p-8 rounded-3xl hover:scale-[1.01] transition-all duration-300 group ${
                    info.urgent ? "ring-2 ring-purple-200/50" : ""
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {info.urgent && (
                    <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-purple-500/20 to-rose-500/20 px-3 py-1 rounded-full mb-4">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                      <span className="text-xs font-serif font-medium text-purple-600">
                        PRIORITY CONTACT
                      </span>
                    </div>
                  )}

                  <div className="flex items-start space-x-4">
                    <div
                      className={`${getGlassClasses()} p-3 rounded-full flex-shrink-0 bg-gradient-to-br from-purple-500/20 to-rose-500/20 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-6 w-6 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-serif font-medium ${getTextClasses()} mb-2`}
                      >
                        {info.title}
                      </h3>
                      <p
                        className={`text-lg font-serif font-medium ${info.color} mb-3`}
                      >
                        {info.details}
                      </p>
                      <p
                        className={`${getMutedTextClasses()} font-normal text-sm leading-relaxed`}
                      >
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Services */}
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
              <Heart className="h-5 w-5 text-purple-600" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Support Services
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()} mb-4`}
            >
              How We Can Help
            </h2>
            <p className={`${getSecondaryTextClasses()} font-normal`}>
              Comprehensive support during this time of mourning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportServices.map((service, index) => {
              const IconComponent = service.icon;
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
                      {service.title}
                    </h3>
                  </div>
                  <p
                    className={`${getSecondaryTextClasses()} font-normal mb-4 leading-relaxed`}
                  >
                    {service.description}
                  </p>
                  <div
                    className={`${getGlassClasses()} p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-rose-500/10`}
                  >
                    <p
                      className={`text-sm font-serif font-medium ${getTextClasses()}`}
                    >
                      {service.contact}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Hours & Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={`${getGlassClasses()} p-8 rounded-3xl`}>
                <div className="flex items-center mb-6">
                  <div
                    className={`${getGlassClasses()} p-3 rounded-full mr-4 bg-gradient-to-br from-purple-500/20 to-rose-500/20`}
                  >
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3
                    className={`text-2xl font-serif font-medium ${getTextClasses()}`}
                  >
                    Availability & Support Hours
                  </h3>
                </div>

                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between py-4 border-b border-gray-200/30 last:border-b-0 ${
                        schedule.urgent
                          ? "bg-gradient-to-r from-purple-500/10 to-rose-500/10 px-4 rounded-2xl border-0"
                          : ""
                      }`}
                    >
                      <div>
                        <span
                          className={`font-serif font-medium ${getTextClasses()}`}
                        >
                          {schedule.day}
                        </span>
                        {schedule.urgent && (
                          <div className="flex items-center space-x-1 mt-1">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse"></div>
                            <span className="text-xs font-serif font-medium text-purple-600">
                              EMERGENCY SUPPORT
                            </span>
                          </div>
                        )}
                      </div>
                      <span
                        className={`${getMutedTextClasses()} font-normal text-sm`}
                      >
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-8 p-6 ${getGlassClasses()} rounded-2xl bg-gradient-to-r from-amber-500/10 to-rose-500/10`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-br from-amber-500/20 to-rose-500/20">
                      <Heart className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4
                        className={`font-serif font-medium ${getTextClasses()} mb-2`}
                      >
                        Memorial Week Priority
                      </h4>
                      <p
                        className={`text-sm ${getMutedTextClasses()} font-normal leading-relaxed`}
                      >
                        During the memorial period (August 4-9, 2025), our
                        family coordinators are available around the clock to
                        assist with any needs related to Phoebe's celebration of
                        life service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={`${getGlassClasses()} p-8 rounded-3xl`}>
                <div className="flex items-center mb-6">
                  <div
                    className={`${getGlassClasses()} p-3 rounded-full mr-4 bg-gradient-to-br from-purple-500/20 to-rose-500/20`}
                  >
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3
                    className={`text-2xl font-serif font-medium ${getTextClasses()}`}
                  >
                    Send a Message
                  </h3>
                </div>

                {submitSuccess && (
                  <motion.div
                    className={`${getGlassClasses()} p-6 rounded-2xl mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 ring-2 ring-green-200/50`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                        <Heart className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p
                          className={`font-serif font-medium ${getTextClasses()}`}
                        >
                          Message sent successfully!
                        </p>
                        <p
                          className={`${getMutedTextClasses()} font-normal text-sm mt-1`}
                        >
                          Thank you for your message. The family will respond as
                          soon as possible.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-serif font-medium ${getTextClasses()} mb-3`}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`${getGlassClasses()} w-full px-4 py-3 font-normal ${getTextClasses()} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-xl border-0`}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-serif font-medium ${getTextClasses()} mb-3`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`${getGlassClasses()} w-full px-4 py-3 font-normal ${getTextClasses()} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-xl border-0`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-serif font-medium ${getTextClasses()} mb-3`}
                    >
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`${getGlassClasses()} w-full px-4 py-3 font-normal ${getTextClasses()} focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer rounded-xl border-0`}
                    >
                      <option value="">Select a subject</option>
                      <option value="memorial-service">
                        Memorial Service - August 8th
                      </option>
                      <option value="directions">
                        Directions to Mutukanio Village
                      </option>
                      <option value="tribute">Tribute for Phibi</option>
                      <option value="financial-support">
                        Financial Support Question
                      </option>
                      <option value="accommodation">
                        Accommodation Assistance
                      </option>
                      <option value="photos-memories">Photos & Memories</option>
                      <option value="transport">Transport Arrangements</option>
                      <option value="pastoral-care">
                        Pastoral Care & Support
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-serif font-medium ${getTextClasses()} mb-3`}
                    >
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className={`${getGlassClasses()} w-full px-4 py-3 font-normal ${getTextClasses()} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none rounded-xl border-0`}
                      placeholder="Please share your message, memories of Phibi, questions about the service, or how we can support you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${getGlassClasses()} w-full py-4 font-serif font-medium cursor-pointer hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 rounded-xl bg-gradient-to-r from-purple-500/20 to-rose-500/20 hover:from-purple-500/30 hover:to-rose-500/30 ${getTextClasses()}`}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message with Love</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className={`${getGlassClasses()} p-12 rounded-3xl text-center`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 mb-6">
              <Phone className="h-8 w-8 text-purple-600" />
            </div>
            <h3
              className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()} mb-4`}
            >
              Need Immediate Support?
            </h3>
            <p
              className={`${getSecondaryTextClasses()} font-normal mb-8 text-lg leading-relaxed max-w-2xl mx-auto`}
            >
              For urgent matters related to the memorial service, directions to
              Mutukanio Village, or immediate family support, please don't
              hesitate to call our family coordinator.
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
                href="mailto:phoebememorial2025@gmail.com"
                className={`${getGlassClasses()} px-8 py-4 text-lg font-serif font-medium cursor-pointer hover:scale-105 transition-all duration-300 flex items-center space-x-3 group rounded-full border border-purple-500/30`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform text-purple-600" />
                <span className={getTextClasses()}>Send Email</span>
              </motion.a>
            </div>

            <div className={`mt-8 pt-8 border-t border-gray-200/30`}>
              <div
                className={`${getGlassClasses()} p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-rose-500/10`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="p-2 rounded-full bg-gradient-to-br from-amber-500/20 to-rose-500/20">
                    <Coffee className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="text-center">
                    <h4
                      className={`font-serif font-medium ${getTextClasses()} mb-1`}
                    >
                      Financial Support & Contributions
                    </h4>
                    <p
                      className={`${getMutedTextClasses()} text-sm leading-relaxed`}
                    >
                      To support the Munge family during this time: <br />
                      <strong className="text-rose-600">
                        M-Pesa to Eunice Njoki: 0725834099
                      </strong>
                    </p>
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

export default Contact;
