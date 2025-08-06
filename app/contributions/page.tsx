"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  DollarSign,
  Users,
  School,
  Home,
  Stethoscope,
  Church,
  Target,
  CheckCircle,
  Copy,
  ExternalLink,
  ArrowRight,
  Gift,
} from "lucide-react";

const Contributions = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    message: "",
    anonymous: false,
  });
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const fundInfo = {
    title: "Phoebe Wangeci Send Off Funds",
    subtitle: "Continuing her legacy of love, service, and community impact",
    description:
      "The Phoebe Wangeci Send Off Funds was established to honor her memory by supporting the causes she cared about most. Your contribution will help continue her work in education, healthcare, community development, and faith-based initiatives.",
    totalRaised: 2847500, // KES
    goal: 5000000, // KES
    donors: 234,
  };

  const projects = [
    {
      id: "education",
      title: "Education Support Program",
      description:
        "Providing scholarships and educational resources to underprivileged children in our community, just as Phoebe always believed education was the key to breaking cycles of poverty.",
      icon: School,
      target: 2000000,
      raised: 1200000,
      beneficiaries: "50+ students",
      details: [
        "School fees for primary and secondary students",
        "Educational materials and supplies",
        "Mentorship programs",
        "After-school tutoring support",
      ],
    },
    {
      id: "healthcare",
      title: "Community Healthcare Initiative",
      description:
        "Supporting local healthcare facilities and providing medical assistance to families in need, reflecting Phoebe's compassion for those facing health challenges.",
      icon: Stethoscope,
      target: 1500000,
      raised: 850000,
      beneficiaries: "200+ families",
      details: [
        "Medical equipment for local clinics",
        "Health insurance support for families",
        "Maternal and child health programs",
        "Health education workshops",
      ],
    },
    {
      id: "church",
      title: "PCEA Riruta Satellite Development",
      description:
        "Supporting church infrastructure and community programs at PCEA Riruta Satellite, where Phoebe served faithfully and found her spiritual home.",
      icon: Church,
      target: 1000000,
      raised: 600000,
      beneficiaries: "500+ members",
      details: [
        "Church building improvements",
        "Youth and children's programs",
        "Community outreach initiatives",
        "Worship and ministry equipment",
      ],
    },
    {
      id: "housing",
      title: "Housing Assistance Program",
      description:
        "Helping families secure safe and affordable housing, embodying Phoebe's belief that everyone deserves a place to call home.",
      icon: Home,
      target: 500000,
      raised: 197500,
      beneficiaries: "15+ families",
      details: [
        "Rent assistance for struggling families",
        "Home improvement grants",
        "Emergency housing support",
        "Housing counseling services",
      ],
    },
  ];

  const donationAmounts = [50000, 100000, 250000, 500000]; // KES

  const paymentMethods = [
    {
      name: "M-Pesa",
      details: "Paybill: 247247, Account: PHOEBE-FUND",
      icon: "📱",
    },
    {
      name: "Bank Transfer",
      details: "Account: 1234567890, Bank: KCB Bank",
      icon: "🏦",
    },
    {
      name: "Online Payment",
      details: "Secure online payment via card",
      icon: "💳",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donation submission
    console.log("Donation submitted:", {
      donationAmount,
      customAmount,
      donorInfo,
      selectedProject,
    });
    setShowDonationForm(false);
  };

  const progressPercentage = (fundInfo.totalRaised / fundInfo.goal) * 100;

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
                <Gift className="h-8 w-8 text-accent-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-headings font-medium text-text-primary">
                {fundInfo.title}
              </h1>
            </div>
            <p className="text-xl text-accent-primary font-headings font-medium mb-8">
              {fundInfo.subtitle}
            </p>
            <p className="text-lg text-text-secondary font-body max-w-3xl mx-auto mb-12">
              {fundInfo.description}
            </p>

            {/* Fund Progress */}
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <p className="text-2xl font-headings font-medium text-text-primary">
                    {formatCurrency(fundInfo.totalRaised)}
                  </p>
                  <p className="text-sm text-text-secondary font-body">
                    raised of {formatCurrency(fundInfo.goal)} goal
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-headings font-medium text-accent-primary">
                    {fundInfo.donors}
                  </p>
                  <p className="text-sm text-text-secondary font-body">
                    donors
                  </p>
                </div>
              </div>

              <div className="w-full bg-border rounded-full h-3 mb-6">
                <motion.div
                  className="bg-gradient-to-r from-accent-primary to-accent-secondary h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>

              <motion.button
                onClick={() => setShowDonationForm(true)}
                className="glass-button w-full py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className="h-5 w-5" />
                <span>Make a Donation</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-headings font-medium text-text-primary mb-4">
              Send Off Funds Projects
            </h2>
            <p className="text-text-secondary font-body max-w-2xl mx-auto">
              Your donations support these meaningful projects that reflect
              Phoebe's values and continue her legacy of service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              const projectProgress = (project.raised / project.target) * 100;

              return (
                <motion.div
                  key={project.id}
                  className="glass-card p-8 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() =>
                    setSelectedProject(
                      selectedProject === project.id ? null : project.id
                    )
                  }
                >
                  <div className="flex items-center mb-4">
                    <div className="glass p-3 rounded-full mr-4">
                      <IconComponent className="h-6 w-6 text-accent-primary" />
                    </div>
                    <h3 className="text-xl font-headings font-medium text-text-primary">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-text-secondary font-body mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-headings font-medium text-text-primary">
                        {formatCurrency(project.raised)}
                      </span>
                      <span className="text-sm text-text-secondary font-body">
                        {formatCurrency(project.target)}
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-accent-primary to-accent-secondary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${projectProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-accent-primary" />
                      <span className="font-body text-text-secondary">
                        {project.beneficiaries}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-accent-secondary" />
                      <span className="font-body text-text-secondary">
                        {Math.round(projectProgress)}% funded
                      </span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedProject === project.id && (
                      <motion.div
                        className="mt-6 pt-6 border-t border-border"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="font-headings font-medium text-text-primary mb-3">
                          How your donation helps:
                        </h4>
                        <ul className="space-y-2">
                          {project.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-start space-x-2 text-sm text-text-secondary font-body"
                            >
                              <CheckCircle className="h-4 w-4 text-accent-primary mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDonationForm(true);
                          }}
                          className="glass-button mt-4 px-6 py-2 font-headings font-medium cursor-pointer hover:text-accent-primary transition-colors flex items-center space-x-2"
                        >
                          <Heart className="h-4 w-4" />
                          <span>Donate to this project</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5"></div>
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-headings font-medium text-text-primary mb-4">
              How to Donate
            </h2>
            <p className="text-text-secondary font-body">
              Choose your preferred method to make a contribution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 text-center hover:scale-[1.01] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-headings font-medium text-text-primary mb-3">
                  {method.name}
                </h3>
                <p className="text-text-secondary font-body text-sm mb-4">
                  {method.details}
                </p>
                <button
                  onClick={() => copyToClipboard(method.details)}
                  className="glass-button px-4 py-2 text-sm font-headings font-medium cursor-pointer hover:text-accent-primary transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy Details</span>
                </button>
              </motion.div>
            ))}
          </div>

          {copied && (
            <motion.div
              className="fixed top-24 right-4 glass-card p-3 z-50"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-accent-primary" />
                <span className="text-sm font-body text-text-primary">
                  Copied to clipboard!
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Donation Form Modal */}
      <AnimatePresence>
        {showDonationForm && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDonationForm(false)}
          >
            <motion.div
              className="glass-card p-8 max-w-2xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-headings font-medium text-text-primary">
                  Make a Donation
                </h2>
                <button
                  onClick={() => setShowDonationForm(false)}
                  className="glass p-2 rounded-full hover:text-accent-primary transition-colors cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleDonationSubmit} className="space-y-6">
                {/* Donation Amount */}
                <div>
                  <label className="block text-sm font-headings font-medium text-text-primary mb-3">
                    Donation Amount (KES)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setDonationAmount(amount.toString());
                          setCustomAmount("");
                        }}
                        className={`glass-button p-3 font-headings font-medium cursor-pointer transition-all duration-300 ${
                          donationAmount === amount.toString()
                            ? "text-accent-primary border-accent-primary/30"
                            : "hover:text-accent-primary"
                        }`}
                      >
                        {formatCurrency(amount)}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setDonationAmount("");
                    }}
                    className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                  />
                </div>

                {/* Project Selection */}
                <div>
                  <label className="block text-sm font-headings font-medium text-text-primary mb-3">
                    Designate your donation (optional)
                  </label>
                  <select
                    value={selectedProject || ""}
                    onChange={(e) => setSelectedProject(e.target.value || null)}
                    className="glass w-full px-4 py-3 font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 cursor-pointer"
                  >
                    <option value="">General Send Off Funds</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Donor Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={donorInfo.name}
                      onChange={(e) =>
                        setDonorInfo({ ...donorInfo, name: e.target.value })
                      }
                      className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) =>
                        setDonorInfo({ ...donorInfo, email: e.target.value })
                      }
                      className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    value={donorInfo.message}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, message: e.target.value })
                    }
                    rows={3}
                    className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 resize-none"
                    placeholder="Share a message in memory of Phoebe"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={donorInfo.anonymous}
                    onChange={(e) =>
                      setDonorInfo({
                        ...donorInfo,
                        anonymous: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-accent-primary bg-transparent border-border rounded focus:ring-accent-primary/50 cursor-pointer"
                  />
                  <label
                    htmlFor="anonymous"
                    className="text-sm font-body text-text-secondary cursor-pointer"
                  >
                    Make this donation anonymous
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDonationForm(false)}
                    className="glass-button px-6 py-3 font-headings font-medium cursor-pointer hover:text-text-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="glass-button px-8 py-3 font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>Continue to Payment</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contributions;
