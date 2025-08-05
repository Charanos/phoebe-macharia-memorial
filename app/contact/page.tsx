"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Heart,
  Church,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      title: "Family Coordinator",
      details: "+254 700 000 000",
      description: "For memorial service arrangements and general inquiries",
      icon: Phone,
      color: "text-accent-primary",
    },
    {
      title: "Email",
      details: "memorial@phoebe.com",
      description: "Send us your messages, photos, or tributes",
      icon: Mail,
      color: "text-accent-secondary",
    },
    {
      title: "Church Office",
      details: "+254 700 000 001",
      description: "PCEA Riruta Satellite Church inquiries",
      icon: Church,
      color: "text-accent-primary",
    },
    {
      title: "Location",
      details: "PCEA Riruta Satellite, Nairobi, Kenya",
      description: "Memorial service venue and church location",
      icon: MapPin,
      color: "text-accent-secondary",
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "After Service Hours" },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
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
                <Phone className="h-8 w-8 text-accent-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-headings font-semibold text-text-primary">
                Contact Us
              </h1>
            </div>
            <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto">
              We're here to help with any questions about the memorial service,
              tributes, or how you can honor Phoebe's memory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
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
              Get in Touch
            </h2>
            <p className="text-text-secondary font-body">
              Multiple ways to reach us for your convenience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-card p-8 hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="glass p-3 rounded-full flex-shrink-0">
                      <IconComponent className={`h-6 w-6 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-headings font-medium text-text-primary mb-2">
                        {info.title}
                      </h3>
                      <p className="text-lg font-headings font-medium text-accent-primary mb-2">
                        {info.details}
                      </p>
                      <p className="text-text-secondary font-body text-sm">
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
              <div className="glass-card p-8">
                <div className="flex items-center mb-6">
                  <div className="glass p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-accent-primary" />
                  </div>
                  <h3 className="text-2xl font-headings font-semibold text-text-primary">
                    Office Hours
                  </h3>
                </div>

                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                    >
                      <span className="font-headings font-medium text-text-primary">
                        {schedule.day}
                      </span>
                      <span className="text-text-secondary font-body">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 glass rounded-lg">
                  <p className="text-sm text-text-secondary font-body">
                    <strong className="text-accent-primary">Note:</strong>{" "}
                    During the memorial period, we may have extended hours to
                    accommodate all inquiries and arrangements.
                  </p>
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
              <div className="glass-card p-8">
                <div className="flex items-center mb-6">
                  <div className="glass p-3 rounded-full mr-4">
                    <MessageSquare className="h-6 w-6 text-accent-secondary" />
                  </div>
                  <h3 className="text-2xl font-headings font-semibold text-text-primary">
                    Send a Message
                  </h3>
                </div>

                {submitSuccess && (
                  <motion.div
                    className="glass p-4 rounded-lg mb-6 border border-accent-primary/30"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-accent-primary" />
                      <div>
                        <p className="font-headings font-medium text-text-primary text-sm">
                          Message sent successfully!
                        </p>
                        <p className="text-text-secondary font-body text-xs">
                          We'll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="glass w-full px-4 py-3 font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 cursor-pointer"
                    >
                      <option value="">Select a subject</option>
                      <option value="memorial-service">
                        Memorial Service Inquiry
                      </option>
                      <option value="tribute">Tribute Submission</option>
                      <option value="donation">Memorial Fund Question</option>
                      <option value="photos">Photo Sharing</option>
                      <option value="general">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 resize-none"
                      placeholder="Please share your message, question, or how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="glass-button w-full py-4 font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-accent-primary border-t-transparent rounded-full"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
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
            className="glass-card p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass p-4 rounded-full w-fit mx-auto mb-6">
              <Phone className="h-8 w-8 text-accent-primary" />
            </div>
            <h3 className="text-2xl font-headings font-semibold text-text-primary mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-text-secondary font-body mb-6">
              For urgent matters related to the memorial service or family
              needs, please don't hesitate to call our family coordinator
              directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="tel:+254700000000"
                className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>

              <a
                href="mailto:memorial@phoebe.com"
                className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-secondary transition-all duration-300 flex items-center space-x-2"
              >
                <Mail className="h-5 w-5" />
                <span>Send Email</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
