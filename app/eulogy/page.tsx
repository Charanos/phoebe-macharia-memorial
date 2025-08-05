"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  Star,
  Quote,
  Church,
  Users,
  Sparkles,
  Calendar,
} from "lucide-react";

const Eulogy = () => {
  const eulogyContent = {
    title: "A Life Well Lived",
    subtitle: "Celebrating the Beautiful Journey of Phoebe Wangeci Macharia",
    introduction:
      "Today, we gather not just to mourn the loss of Phoebe Wangeci Macharia, but to celebrate a life that touched so many hearts, a soul that radiated love, and a spirit that will forever inspire us.",

    sections: [
      {
        title: "A Heart Full of Love",
        icon: Heart,
        content:
          "Phoebe's love was like a warm embrace that welcomed everyone she met. Her family was her greatest treasure, and she poured her heart into nurturing, supporting, and cherishing each member. Her love extended beyond blood relations to embrace friends, neighbors, and even strangers who became family through her kindness. She had an extraordinary ability to make everyone feel valued, heard, and deeply loved.",
      },
      {
        title: "Faith as Her Foundation",
        icon: Church,
        content:
          "At PCEA Riruta Satellite, Phoebe found not just a place of worship, but a community where her faith could flourish and serve others. Her relationship with God was the cornerstone of her life, guiding her decisions, strengthening her in difficult times, and inspiring her countless acts of service. She lived her faith authentically, showing Christ's love through her actions, words, and unwavering compassion for others.",
      },
      {
        title: "A Servant's Heart",
        icon: Users,
        content:
          "Phoebe's life was a testament to the power of service. She never sought recognition or praise; instead, she found joy in lifting others up, in being the helping hand that appeared just when it was needed most. Whether organizing community events, supporting those in need, or simply offering a listening ear, Phoebe understood that true fulfillment comes from serving others with a pure heart.",
      },
      {
        title: "Joy and Laughter",
        icon: Sparkles,
        content:
          "Those who knew Phoebe will forever remember her infectious laughter and the way her eyes sparkled with joy. She had a remarkable gift for finding light in the darkest moments and sharing that light with others. Her sense of humor could brighten any room, and her optimistic spirit reminded us all that life, despite its challenges, is a beautiful gift to be celebrated every day.",
      },
      {
        title: "Legacy of Love",
        icon: Star,
        content:
          "Though Phoebe's physical presence is no longer with us, her legacy lives on in every life she touched, every heart she healed, and every soul she inspired. She taught us that love is not just a feeling but an action, that faith is not just a belief but a way of living, and that true success is measured not by what we achieve for ourselves, but by what we give to others.",
      },
    ],

    closing:
      "As we say goodbye to our beloved Phoebe, let us carry forward the lessons she taught us through her beautiful example. Let us love more deeply, serve more willingly, and live more faithfully. Her spirit will forever guide us, her love will forever sustain us, and her memory will forever inspire us to be better versions of ourselves.",

    finalWords:
      "Rest in peace, dear Phoebe. Your race is finished, your faith is complete, and your reward is eternal. Until we meet again in that place where there are no more tears, no more pain, only everlasting joy in the presence of our Lord.",
  };

  const quotes = [
    {
      text: "She lived her life as a prayer, and her love as a blessing to all who knew her.",
      author: "Family Friend",
    },
    {
      text: "Phoebe didn't just attend church; she was the church - embodying Christ's love in everything she did.",
      author: "Pastor, PCEA Riruta Satellite",
    },
    {
      text: "Her laughter was medicine, her presence was comfort, and her love was a gift we'll treasure forever.",
      author: "Close Friend",
    },
  ];

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
                <BookOpen className="h-8 w-8 text-accent-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-headings font-semibold text-text-primary">
                {eulogyContent.title}
              </h1>
            </div>
            <p className="text-xl text-accent-primary font-headings font-medium mb-8">
              {eulogyContent.subtitle}
            </p>
            <div className="glass-card p-8 max-w-3xl mx-auto">
              <Quote className="h-8 w-8 text-accent-primary mx-auto mb-4" />
              <p className="text-lg text-text-secondary font-body leading-relaxed italic">
                {eulogyContent.introduction}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Memorial Date */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Calendar className="h-5 w-5 text-accent-primary" />
              <span className="font-headings font-medium text-text-primary">
                Memorial Service
              </span>
            </div>
            <p className="text-text-secondary font-body">
              December 15, 2024 • 10:00 AM • PCEA Riruta Satellite
            </p>
          </motion.div>
        </div>
      </section>

      {/* Eulogy Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {eulogyContent.sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-card p-8 md:p-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-6">
                    <div className="glass p-3 rounded-full mr-4">
                      <IconComponent className="h-6 w-6 text-accent-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-headings font-semibold text-text-primary">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-lg text-text-secondary font-body leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
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
              Words of Remembrance
            </h2>
            <p className="text-text-secondary font-body">
              Heartfelt words from those whose lives she touched
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Quote className="h-8 w-8 text-accent-primary mx-auto mb-4" />
                <blockquote className="text-text-secondary font-body italic mb-4 leading-relaxed">
                  "{quote.text}"
                </blockquote>
                <cite className="font-headings font-medium text-accent-primary">
                  - {quote.author}
                </cite>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card p-8 md:p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Star className="h-12 w-12 text-accent-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-headings font-semibold text-text-primary mb-6">
              A Legacy That Lives On
            </h2>
            <p className="text-lg text-text-secondary font-body leading-relaxed mb-8">
              {eulogyContent.closing}
            </p>
            <div className="border-t border-border pt-8">
              <p className="text-lg text-accent-primary font-body italic leading-relaxed">
                {eulogyContent.finalWords}
              </p>
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
              Honor Her Memory
            </h3>
            <p className="text-text-secondary font-body mb-8">
              Share your own memories and tributes to celebrate Phoebe's
              beautiful life.
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
                href="/gallery"
                className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-secondary transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="h-5 w-5" />
                <span>View Memories</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Eulogy;
