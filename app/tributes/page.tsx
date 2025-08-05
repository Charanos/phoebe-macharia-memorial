"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Star,
  Send,
  User,
  Mail,
  MessageSquare,
  Calendar,
  Filter,
  Search,
  Plus,
  X,
} from "lucide-react";

interface Tribute {
  id: string;
  author: string;
  email: string;
  relationship: string;
  title: string;
  content: string;
  date: string;
  featured: boolean;
  approved: boolean;
  likes: number;
}

const Tributes = () => {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [formData, setFormData] = useState({
    author: "",
    email: "",
    relationship: "",
    title: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sample tributes data
  const sampleTributes: Tribute[] = [
    {
      id: "1",
      author: "Sarah Mwangi",
      email: "sarah@example.com",
      relationship: "Close Friend",
      title: "A Light That Never Dims",
      content:
        "Phoebe was more than a friend; she was a sister, a confidant, and a source of endless joy. Her laughter could fill any room, and her kindness touched every heart she encountered. I will forever cherish our late-night conversations, her wise counsel, and the way she always believed in me even when I didn't believe in myself. Rest in peace, dear friend.",
      date: "2024-12-10",
      featured: true,
      approved: true,
      likes: 24,
    },
    {
      id: "2",
      author: "Pastor John Mwangi",
      email: "pastor@pcea.com",
      relationship: "Pastor",
      title: "A Faithful Servant",
      content:
        "In all my years of ministry, I have rarely encountered someone who lived their faith as authentically as Phoebe did. She served not for recognition but out of pure love for God and others. Her dedication to our church community and her unwavering faith in times of trial were truly inspiring. She embodied Christ's love in everything she did.",
      date: "2024-12-09",
      featured: true,
      approved: true,
      likes: 31,
    },
    {
      id: "3",
      author: "Mary Wanjiku",
      email: "mary@example.com",
      relationship: "Neighbor",
      title: "The Heart of Our Community",
      content:
        "Phoebe was the kind of neighbor everyone wishes they had. She was always ready to lend a helping hand, whether it was watching the children, sharing a meal, or simply offering a listening ear. Her home was always open, and her heart even more so. Our community will never be the same without her warm presence.",
      date: "2024-12-08",
      featured: false,
      approved: true,
      likes: 18,
    },
    {
      id: "4",
      author: "David Kamau",
      email: "david@example.com",
      relationship: "Colleague",
      title: "Professional Excellence with a Human Touch",
      content:
        "Working alongside Phoebe was a privilege. She brought not only exceptional skills and dedication to her work but also a warmth and humanity that made every day brighter. She mentored younger colleagues with patience and grace, and her positive attitude was contagious. She showed us all how to excel professionally while never losing sight of what truly matters.",
      date: "2024-12-07",
      featured: false,
      approved: true,
      likes: 15,
    },
    {
      id: "5",
      author: "Grace Njeri",
      email: "grace@example.com",
      relationship: "Family Friend",
      title: "An Angel Among Us",
      content:
        "Phoebe had this incredible gift of making everyone feel special and loved. She remembered birthdays, celebrated achievements, and was there during difficult times. Her generosity knew no bounds, and her love was unconditional. She truly was an angel walking among us, and now she's an angel watching over us.",
      date: "2024-12-06",
      featured: false,
      approved: true,
      likes: 22,
    },
  ];

  const relationships = [
    "Family",
    "Close Friend",
    "Friend",
    "Colleague",
    "Neighbor",
    "Church Member",
    "Community Member",
    "Other",
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTributes(sampleTributes);
      setLoading(false);
    }, 1000);
  }, []);

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

    // Simulate API call
    setTimeout(() => {
      const newTribute: Tribute = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString().split("T")[0],
        featured: false,
        approved: false, // Would need admin approval
        likes: 0,
      };

      setTributes([newTribute, ...tributes]);
      setFormData({
        author: "",
        email: "",
        relationship: "",
        title: "",
        content: "",
      });
      setSubmitting(false);
      setSubmitSuccess(true);
      setShowForm(false);

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  const filteredAndSortedTributes = tributes
    .filter((tribute) => {
      if (!tribute.approved) return false;
      if (filterBy === "featured") return tribute.featured;
      if (filterBy === "family")
        return tribute.relationship.toLowerCase().includes("family");
      if (filterBy === "friends")
        return tribute.relationship.toLowerCase().includes("friend");
      return true;
    })
    .filter(
      (tribute) =>
        tribute.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tribute.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tribute.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "likes") return b.likes - a.likes;
      return 0;
    });

  const featuredTributes = tributes.filter((t) => t.featured && t.approved);

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
                <Heart className="h-8 w-8 text-accent-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-headings font-semibold text-text-primary">
                Tributes & Memories
              </h1>
            </div>
            <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto mb-8">
              Share your memories, stories, and tributes to honor Phoebe's
              beautiful life and the impact she made on all of us.
            </p>

            <motion.button
              onClick={() => setShowForm(true)}
              className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-5 w-5" />
              <span>Share Your Tribute</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Success Message */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            className="fixed top-24 right-4 glass-card p-4 z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="flex items-center space-x-3">
              <div className="glass p-2 rounded-full">
                <Heart className="h-4 w-4 text-accent-primary" />
              </div>
              <div>
                <p className="font-headings font-medium text-text-primary text-sm">
                  Thank you for your tribute!
                </p>
                <p className="text-text-secondary font-body text-xs">
                  It will be reviewed and published soon.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Tributes */}
      {featuredTributes.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-headings font-semibold text-text-primary mb-4">
                Featured Tributes
              </h2>
              <p className="text-text-secondary font-body">
                Special messages that capture the essence of who Phoebe was
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredTributes.slice(0, 2).map((tribute, index) => (
                <motion.div
                  key={tribute.id}
                  className="glass-card p-8 hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="glass p-2 rounded-full">
                        <Star className="h-4 w-4 text-accent-primary" />
                      </div>
                      <span className="text-xs font-headings font-medium text-accent-primary">
                        Featured
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm font-body">{tribute.likes}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-headings font-semibold text-text-primary mb-3">
                    {tribute.title}
                  </h3>

                  <p className="text-text-secondary font-body leading-relaxed mb-6 line-clamp-4">
                    {tribute.content}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-accent-primary" />
                      <span className="font-headings font-medium text-text-primary">
                        {tribute.author}
                      </span>
                      <span className="text-text-secondary font-body">
                        • {tribute.relationship}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Calendar className="h-3 w-3" />
                      <span className="font-body text-xs">
                        {new Date(tribute.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="glass-card p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search tributes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass w-full pl-10 pr-4 py-2 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-text-secondary" />
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="glass px-3 py-2 font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 cursor-pointer"
                  >
                    <option value="all">All Tributes</option>
                    <option value="featured">Featured</option>
                    <option value="family">Family</option>
                    <option value="friends">Friends</option>
                  </select>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="glass px-3 py-2 font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Tributes */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="glass-card p-6 animate-pulse">
                  <div className="h-4 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded mb-4"></div>
                  <div className="h-3 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded mb-2"></div>
                  <div className="h-3 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded mb-2"></div>
                  <div className="h-3 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded mb-4"></div>
                  <div className="h-2 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence>
                {filteredAndSortedTributes.map((tribute, index) => (
                  <motion.div
                    key={tribute.id}
                    className="glass-card p-6 hover:scale-105 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    layout
                  >
                    <div className="flex items-center justify-between mb-3">
                      {tribute.featured && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-accent-primary" />
                          <span className="text-xs font-headings font-medium text-accent-primary">
                            Featured
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-text-secondary ml-auto">
                        <Heart className="h-3 w-3" />
                        <span className="text-xs font-body">
                          {tribute.likes}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-headings font-medium text-text-primary mb-2 line-clamp-2">
                      {tribute.title}
                    </h3>

                    <p className="text-text-secondary font-body text-sm leading-relaxed mb-4 line-clamp-3">
                      {tribute.content}
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 text-accent-primary" />
                        <span className="font-headings font-medium text-text-primary">
                          {tribute.author}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary font-body">
                          {tribute.relationship}
                        </span>
                        <div className="flex items-center space-x-1 text-text-secondary">
                          <Calendar className="h-3 w-3" />
                          <span className="font-body">
                            {new Date(tribute.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {filteredAndSortedTributes.length === 0 && !loading && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="h-16 w-16 text-text-secondary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-headings font-medium text-text-secondary mb-2">
                No tributes found
              </h3>
              <p className="text-text-secondary font-body mb-6">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Be the first to share a tribute."}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="glass-button px-6 py-3 font-headings font-medium cursor-pointer hover:text-accent-primary transition-colors"
              >
                Share Your Tribute
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tribute Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="glass-card p-8 max-w-2xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-headings font-semibold text-text-primary">
                  Share Your Tribute
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="glass p-2 rounded-full hover:text-accent-primary transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
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
                    Your Relationship to Phoebe *
                  </label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    required
                    className="glass w-full px-4 py-3 font-body text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 cursor-pointer"
                  >
                    <option value="">Select your relationship</option>
                    {relationships.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                    Tribute Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                    placeholder="Give your tribute a meaningful title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-headings font-medium text-text-primary mb-2">
                    Your Tribute *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="glass w-full px-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 resize-none"
                    placeholder="Share your memories, stories, and thoughts about Phoebe. What made her special? How did she impact your life?"
                  />
                  <p className="text-xs text-text-secondary font-body mt-2">
                    Your tribute will be reviewed before being published.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="glass-button px-6 py-3 font-headings font-medium cursor-pointer hover:text-text-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="glass-button px-8 py-3 font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-accent-primary border-t-transparent rounded-full"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Tribute</span>
                      </>
                    )}
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

export default Tributes;
