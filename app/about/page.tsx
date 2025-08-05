"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, Church, Users, BookOpen, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary pt-20">
      {/* Hero Section */}
      <section className="py-20 sm:py-30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="glass p-4 rounded-full mr-4">
                <Heart className="h-8 w-8 text-accent-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-headings font-semibold text-text-primary">
                About Phoebe
              </h1>
            </div>
            <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto">
              Learn about the beautiful life, values, and lasting impact of
              Phoebe Wangeci Macharia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card p-8 md:p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-full flex items-center justify-center">
                <Heart className="h-16 w-16 text-accent-primary" />
              </div>
              <h2 className="text-3xl font-headings font-semibold text-text-primary mb-4">
                Phoebe Wangeci Macharia
              </h2>
              <p className="text-xl text-accent-primary font-headings font-medium mb-6">
                1985 - 2024
              </p>
            </div>

            <div className="space-y-6 text-lg text-text-secondary font-body leading-relaxed">
              <p>
                Phoebe Wangeci Macharia was a beacon of love, faith, and service
                who touched countless lives throughout her journey. Born in
                1985, she grew up with a heart full of compassion and a spirit
                dedicated to making the world a better place for everyone around
                her.
              </p>

              <p>
                Her life was a testament to the power of genuine love and
                unwavering faith. As an active member of PCEA Riruta Satellite,
                Phoebe found her spiritual home and dedicated herself to serving
                her church community with joy and enthusiasm.
              </p>

              <p>
                Phoebe's legacy lives on through the countless lives she
                touched, the love she shared, and the example she set for all
                who knew her. Her memory continues to inspire us to love more
                deeply, serve more willingly, and live more faithfully.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-headings font-semibold text-text-primary mb-4">
              Her Values & Legacy
            </h2>
            <p className="text-text-secondary font-body">
              The principles that guided her life and continue to inspire us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Faith & Devotion",
                description:
                  "Her unwavering faith in God was the foundation of everything she did, guiding her decisions and strengthening her in all circumstances.",
                icon: Church,
                color: "text-accent-primary",
              },
              {
                title: "Love & Compassion",
                description:
                  "Phoebe had an extraordinary capacity for love, extending kindness and compassion to everyone she met.",
                icon: Heart,
                color: "text-accent-secondary",
              },
              {
                title: "Service to Others",
                description:
                  "She found true fulfillment in serving others, always ready to lend a helping hand to those in need.",
                icon: Users,
                color: "text-accent-primary",
              },
              {
                title: "Wisdom & Guidance",
                description:
                  "Her wise counsel and gentle guidance helped many navigate life's challenges with grace and strength.",
                icon: BookOpen,
                color: "text-accent-secondary",
              },
              {
                title: "Joy & Laughter",
                description:
                  "Her infectious laughter and joyful spirit could brighten even the darkest days for those around her.",
                icon: Sparkles,
                color: "text-accent-primary",
              },
              {
                title: "Excellence & Integrity",
                description:
                  "She approached everything with excellence and maintained the highest standards of integrity in all her dealings.",
                icon: Star,
                color: "text-accent-secondary",
              },
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-card p-6 text-center hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="glass p-4 rounded-full w-fit mx-auto mb-4">
                    <IconComponent className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-headings font-medium text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary font-body leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
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
              Honor Her Memory
            </h3>
            <p className="text-text-secondary font-body mb-8">
              Continue her legacy by sharing your memories and supporting the
              causes she cared about.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="/tributes"
                className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-5 w-5" />
                <span>Share a Tribute</span>
              </motion.a>

              <motion.a
                href="/memorial-fund"
                className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-secondary transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="h-5 w-5" />
                <span>Make a Donation</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
