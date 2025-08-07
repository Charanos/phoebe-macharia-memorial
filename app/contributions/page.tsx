"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Phone,
  Copy,
  Check,
  Shield,
  Users,
  Coffee,
  Church,
  Hand,
  ArrowRight,
} from "lucide-react";

const Contributions = () => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Light theme consistent with other pages
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("0725834099");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy number");
    }
  };

  const contributionAreas = [
    {
      title: "Memorial Service Expenses",
      description: "Supporting the costs of the celebration of life service",
      icon: Church,
    },
    {
      title: "Family Immediate Needs",
      description: "Helping with daily expenses during this difficult time",
      icon: Heart,
    },
    {
      title: "Community Support",
      description: "Refreshments and hospitality for memorial attendees",
      icon: Coffee,
    },
    {
      title: "General Support",
      description: "Any contribution to honor Phibi's memory",
      icon: Users,
    },
  ];

  const mpesaSteps = [
    {
      step: "1",
      action: "Go to M-Pesa",
      description: "Open your M-Pesa menu",
    },
    {
      step: "2",
      action: "Select Send Money",
      description: "Choose 'Send Money' option",
    },
    {
      step: "3",
      action: "Enter Number",
      description: "Type: 0725834099 (Eunice Njoki)",
    },
    {
      step: "4",
      action: "Enter Amount",
      description: "Any amount from your heart",
    },
    {
      step: "5",
      action: "Send & Confirm",
      description: "Complete the transaction",
    },
  ];

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
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-8`}
            >
              <Heart className="h-5 w-5 text-rose-600" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Support the Family
              </span>
            </div>
            <h1
              className={`text-4xl md:text-6xl font-serif font-medium ${getTextClasses()} mb-6 leading-tight`}
            >
              Honor Phibi's
              <span className="block font-serif bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                Memory with Love
              </span>
            </h1>
            <p
              className={`text-lg ${getSecondaryTextClasses()} font-normal max-w-3xl mx-auto leading-relaxed`}
            >
              Your generous contributions help us celebrate Phoebe's life with
              dignity and support the Munge family during this time of mourning.
              Every gift, no matter the size, is a blessing and a testament to
              the love Phibi shared with all of us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main M-Pesa Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className={`${getGlassClasses()} p-12 rounded-3xl text-center`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-8">
              <Phone className="h-10 w-10 text-green-600" />
            </div>

            <h2
              className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()} mb-6`}
            >
              Send Money via M-Pesa
            </h2>

            <p
              className={`${getSecondaryTextClasses()} font-normal mb-8 text-lg`}
            >
              All contributions are sent directly to the family coordinator
            </p>

            <div
              className={`${getGlassClasses()} p-8 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 mb-8`}
            >
              <h3
                className={`text-2xl font-serif font-medium ${getTextClasses()} mb-4`}
              >
                Eunice Njoki
              </h3>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <span
                  className={`text-2xl md:text-3xl font-serif font-bold text-green-600`}
                >
                  0725834099
                </span>
                <button
                  onClick={handleCopy}
                  className={`${getGlassClasses()} p-3 rounded-full hover:scale-105 transition-all duration-300 group`}
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-600 group-hover:text-green-600" />
                  )}
                </button>
              </div>

              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-green-600 font-medium"
                >
                  Number copied to clipboard!
                </motion.p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="tel:0725834099"
                className={`${getGlassClasses()} px-8 py-4 text-lg font-serif font-medium cursor-pointer hover:scale-105 transition-all duration-300 flex items-center space-x-3 group rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform text-green-600" />
                <span className={getTextClasses()}>Call to Contribute</span>
              </motion.a>

              <motion.button
                onClick={handleCopy}
                className={`${getGlassClasses()} px-8 py-4 text-lg font-serif font-medium cursor-pointer hover:scale-105 transition-all duration-300 flex items-center space-x-3 group rounded-full border border-green-500/30`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Copy className="h-5 w-5 group-hover:scale-110 transition-transform text-green-600" />
                <span className={getTextClasses()}>Copy Number</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Send M-Pesa */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
        <div className="relative max-w-5xl mx-auto">
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
              <Hand className="h-5 w-5 text-green-600" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Simple Steps
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()} mb-4`}
            >
              How to Send M-Pesa
            </h2>
            <p className={`${getSecondaryTextClasses()} font-normal`}>
              Follow these simple steps to make your contribution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {mpesaSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`${getGlassClasses()} p-6 rounded-3xl text-center hover:scale-[1.02] transition-all duration-300 relative`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-4">
                  <span className="text-lg font-serif font-bold text-green-600">
                    {step.step}
                  </span>
                </div>

                <h3
                  className={`font-serif font-medium ${getTextClasses()} mb-2`}
                >
                  {step.action}
                </h3>

                <p
                  className={`text-sm ${getMutedTextClasses()} font-normal leading-relaxed`}
                >
                  {step.description}
                </p>

                {index < mpesaSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="h-5 w-5 text-green-600/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Areas */}
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
              <Heart className="h-5 w-5 text-purple-600" />
              <span
                className={`text-xs font-serif uppercase font-medium ${getTextClasses()}`}
              >
                Supporting the Family
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-serif font-medium ${getTextClasses()} mb-4`}
            >
              Your Contributions Help With
            </h2>
            <p className={`${getSecondaryTextClasses()} font-normal`}>
              Every contribution goes directly to supporting the memorial
              service and family needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contributionAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <motion.div
                  key={index}
                  className={`${getGlassClasses()} p-8 rounded-3xl hover:scale-[1.01] transition-all duration-300`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`${getGlassClasses()} p-3 rounded-full flex-shrink-0 bg-gradient-to-br from-purple-500/20 to-rose-500/20`}
                    >
                      <IconComponent className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-serif font-medium ${getTextClasses()} mb-3`}
                      >
                        {area.title}
                      </h3>
                      <p
                        className={`${getMutedTextClasses()} font-normal leading-relaxed`}
                      >
                        {area.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className={`${getGlassClasses()} p-8 rounded-3xl text-center`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mb-6">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>

            <h3
              className={`text-2xl font-serif font-medium ${getTextClasses()} mb-4`}
            >
              Trusted & Secure
            </h3>

            <p
              className={`${getSecondaryTextClasses()} font-normal leading-relaxed mb-6`}
            >
              Eunice Njoki is the designated family coordinator for all memorial
              contributions. Your donations go directly to support the family
              and memorial service expenses. All contributions are handled with
              complete transparency and care.
            </p>

            <div
              className={`${getGlassClasses()} p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10`}
            >
              <div className="flex items-center justify-center space-x-3">
                <Heart className="h-5 w-5 text-amber-600" />
                <p
                  className={`text-sm font-serif font-medium ${getTextClasses()}`}
                >
                  "Every contribution, no matter the amount, is a blessing to
                  our family. Thank you for honoring Phibi's memory."
                  <span className="block mt-1 text-amber-600">
                    - The Munge Family
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contributions;
