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
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Quote,
  Clock,
} from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useToast } from "../../components/ui/toast";

interface Tribute {
  _id: string;
  name: string;
  relationship: string;
  message: string;
  createdAt: string;
  isApproved: boolean;
  isFeatured?: boolean;
  likes?: number;
  photo?: string;
  email?: string;
  isPrivate: boolean;
  familyResponse?: string;
}

const TRIBUTES_PER_PAGE = 12;

const Tributes = () => {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [apiFeaturedTributes, setApiFeaturedTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    relationship: "",
    title: "",
    message: "",
    isPrivate: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  // Fetch tributes from API
  const fetchTributes = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    }

    try {
      const [regularRes, featuredRes] = await Promise.all([
        fetch("/api/tributes?page=1&limit=100"),
        fetch("/api/tributes?featured=true&limit=5"),
      ]);

      const [regularJson, featuredJson] = await Promise.all([
        regularRes.json(),
        featuredRes.json(),
      ]);

      let regularTributes = [];
      let featuredTributes = [];

      if (regularJson.success) {
        regularTributes = Array.isArray(regularJson.data)
          ? regularJson.data
          : [];
        setTributes(regularTributes);
      } else {
        setTributes([]);
      }

      if (featuredJson.success) {
        featuredTributes = Array.isArray(featuredJson.data)
          ? featuredJson.data
          : [];
        setApiFeaturedTributes(featuredTributes);
      } else {
        setApiFeaturedTributes([]);
      }

      if (showRefreshIndicator) {
        showToast({
          type: "success",
          title: "Refreshed",
          message: "Tributes updated successfully",
        });
      }
    } catch (err) {
      showToast({
        type: "error",
        title: "Loading Failed",
        message: "Could not load tributes. Please refresh the page.",
      });
    } finally {
      setLoading(false);
      if (showRefreshIndicator) {
        setRefreshing(false);
      }
    }
  };

  const handleManualRefresh = () => {
    fetchTributes(true);
  };

  useEffect(() => {
    fetchTributes();

    const refreshInterval = setInterval(() => {
      fetchTributes();
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, [showToast]);

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

    try {
      const response = await fetch("/api/tributes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          isApproved: false,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const res = await fetch(`/api/tributes?page=1&limit=100`);
        const json = await res.json();
        if (json.success) {
          setTributes(json.data);
        }

        showToast({
          type: "success",
          title: "Tribute Submitted",
          message: "Your tribute has been submitted successfully.",
        });

        setFormData({
          name: "",
          email: "",
          title: "",
          relationship: "",
          message: "",
          isPrivate: false,
        });
        setShowForm(false);
      } else {
        showToast({
          type: "error",
          title: "Submission Failed",
          message:
            result.error || "Failed to submit tribute. Please try again.",
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        title: "Submission Failed",
        message: "An error occurred while submitting your tribute.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await fetch(`/api/tributes/${id}/like`, {
        method: "POST",
      });

      if (response.ok) {
        const res = await fetch(`/api/tributes?page=1&limit=100`);
        const json = await res.json();
        if (json.success) {
          setTributes(json.data);
        }

        showToast({
          type: "success",
          title: "Thank You",
          message: "Your like has been recorded.",
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        title: "Failed",
        message: "Could not record your like. Please try again.",
      });
    }
  };

  const filteredAndSortedTributes = tributes
    .filter((tribute) => {
      if (!tribute) return false;

      const isApproved = tribute.isApproved === true;
      const matchesFilter =
        filterBy === "featured"
          ? tribute.isFeatured === true
          : filterBy === "family"
          ? tribute.relationship?.toLowerCase().includes("family") || false
          : filterBy === "friends"
          ? tribute.relationship?.toLowerCase().includes("friend") || false
          : true;

      return isApproved && matchesFilter;
    })
    .filter((tribute) => {
      if (!tribute) return false;

      const matchesSearch =
        !searchTerm ||
        tribute.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tribute.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tribute.relationship?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      if (sortBy === "likes") return (b.likes || 0) - (a.likes || 0);
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(
    filteredAndSortedTributes.length / TRIBUTES_PER_PAGE
  );
  const startIndex = (currentPage - 1) * TRIBUTES_PER_PAGE;
  const paginatedTributes = filteredAndSortedTributes.slice(
    startIndex,
    startIndex + TRIBUTES_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBy, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mosaic grid pattern helper
  const getMosaicClass = (index: number) => {
    const patterns = [
      "md:col-span-1 md:row-span-1", // Regular
      "md:col-span-2 md:row-span-1", // Wide
      "md:col-span-1 md:row-span-2", // Tall
      "md:col-span-2 md:row-span-2", // Large
    ];

    // Create a varied pattern
    if (index % 7 === 0) return patterns[3]; // Large every 7th
    if (index % 5 === 0) return patterns[2]; // Tall every 5th
    if (index % 3 === 0) return patterns[1]; // Wide every 3rd
    return patterns[0]; // Regular otherwise
  };

  const TributeCard = ({
    tribute,
    index,
  }: {
    tribute: Tribute;
    index: number;
  }) => {
    const mosaicClass = getMosaicClass(index);
    const isLarge =
      mosaicClass.includes("col-span-2") && mosaicClass.includes("row-span-2");
    const isTall =
      mosaicClass.includes("row-span-2") && !mosaicClass.includes("col-span-2");
    const isWide =
      mosaicClass.includes("col-span-2") && !mosaicClass.includes("row-span-2");

    return (
      <motion.div
        className={`glass-card group hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden ${mosaicClass}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onClick={() => handleLike(tribute._id)}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div
          className={`relative p-6 h-full flex flex-col ${
            isLarge ? "p-8" : isTall || isWide ? "p-7" : "p-6"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              {tribute.isFeatured && (
                <motion.div
                  className="flex items-center space-x-1 bg-gradient-to-r from-accent-primary to-accent-secondary p-2 rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  <Star className="h-3 w-3 text-white" />
                  <span className="text-xs font-headings font-medium text-white">
                    Featured
                  </span>
                </motion.div>
              )}
              {!tribute.isFeatured && (
                <div className="glass p-2 rounded-full">
                  <Quote className="h-3 w-3 text-accent-primary" />
                </div>
              )}
            </div>

            <motion.button
              className="flex items-center space-x-1 glass px-3 py-1 rounded-full hover:bg-accent-primary/20 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart
                className={`h-3 w-3 ${
                  tribute.likes && tribute.likes > 0
                    ? "fill-accent-primary text-accent-primary"
                    : "text-text-secondary"
                }`}
              />
              <span className="text-xs font-body text-text-secondary">
                {tribute.likes || 0}
              </span>
            </motion.button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <div>
              <h3
                className={`font-headings font-semibold text-text-primary mb-2 leading-tight ${
                  isLarge
                    ? "text-2xl"
                    : isTall || isWide
                    ? "text-xl"
                    : "text-lg"
                }`}
              >
                {tribute.name}
              </h3>

              <div className="flex items-center space-x-2 mb-3">
                <div className="glass p-1 rounded-full">
                  <User className="h-3 w-3 text-accent-primary" />
                </div>
                <span
                  className={`font-body text-text-secondary ${
                    isLarge ? "text-base" : "text-sm"
                  }`}
                >
                  {tribute.relationship}
                </span>
              </div>
            </div>

            <div className="relative">
              <p
                className={`font-body text-text-secondary leading-relaxed ${
                  isLarge
                    ? "text-base line-clamp-8"
                    : isTall
                    ? "text-sm line-clamp-12"
                    : isWide
                    ? "text-sm line-clamp-4"
                    : "text-sm line-clamp-4"
                }`}
              >
                {tribute.message}
              </p>

              {/* Fade overlay for long text */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3 text-accent-primary" />
                <span className="text-xs font-body text-text-secondary">
                  {new Date(tribute.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <MessageSquare className="h-3 w-3 text-accent-secondary" />
                <span className="text-xs font-body text-accent-secondary">
                  Read More
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(
            1,
            "...",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          );
        } else {
          pages.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
          );
        }
      }

      return pages;
    };

    return (
      <motion.div
        className="flex items-center justify-center space-x-2 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="glass-button p-3 disabled:opacity-50 disabled:cursor-not-allowed hover:text-accent-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>

        {getPageNumbers().map((page, index) => (
          <motion.button
            key={index}
            onClick={() =>
              typeof page === "number" ? handlePageChange(page) : null
            }
            disabled={typeof page !== "number"}
            className={`px-4 py-2 rounded-lg font-headings font-medium transition-all duration-300 ${
              page === currentPage
                ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white"
                : typeof page === "number"
                ? "glass-button hover:text-accent-primary"
                : "cursor-default text-text-secondary"
            }`}
            whileHover={typeof page === "number" ? { scale: 1.05 } : {}}
            whileTap={typeof page === "number" ? { scale: 0.95 } : {}}
          >
            {page}
          </motion.button>
        ))}

        <motion.button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
          className="glass-button p-3 disabled:opacity-50 disabled:cursor-not-allowed hover:text-accent-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </motion.div>
    );
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
                <Heart className="h-8 w-8 text-accent-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-headings font-medium text-text-primary">
                Tributes & Memories
              </h1>
            </div>
            <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto mb-8">
              Share your memories, stories, and tributes to honor Phoebe's
              beautiful life and the impact she made on all of us.
            </p>

            <div className="flex items-center justify-center space-x-4">
              <motion.button
                onClick={() => setShowForm(true)}
                className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="h-5 w-5" />
                <span>Share Your Tribute</span>
              </motion.button>

              <motion.button
                onClick={handleManualRefresh}
                disabled={refreshing}
                className="glass-button px-6 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-secondary transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {refreshing ? (
                  <div className="animate-spin h-5 w-5 border-2 border-accent-secondary border-t-transparent rounded-full"></div>
                ) : (
                  <RefreshCw className="h-5 w-5" />
                )}
                <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Tributes */}
      {apiFeaturedTributes.length > 0 && (
        <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-headings font-semibold text-text-primary mb-4">
                Featured Tributes
              </h2>
              <p className="text-lg text-text-secondary font-body">
                Special memories shared by loved ones
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {apiFeaturedTributes.slice(0, 2).map((tribute, index) => (
                <motion.div
                  key={tribute._id}
                  className="glass-card p-8 hover:scale-[1.01] transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-accent-primary to-accent-secondary p-2 rounded-full">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-headings font-medium text-accent-primary">
                        Featured Tribute
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm font-body">
                        {tribute.likes || 0}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-headings font-semibold text-text-primary mb-3">
                    {tribute.name}
                  </h3>

                  <p className="text-text-secondary font-body leading-relaxed mb-6 line-clamp-4">
                    {tribute.message}
                  </p>

                  <div className="flex items-center justify-between text-sm pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-accent-primary" />
                      <span className="font-headings font-medium text-text-primary">
                        {tribute.name}
                      </span>
                      <span className="text-text-secondary font-body">
                        • {tribute.relationship}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Calendar className="h-3 w-3" />
                      <span className="font-body text-xs">
                        {new Date(tribute.createdAt).toLocaleDateString()}
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
                  className="glass w-full pl-10 pr-4 py-3 font-body text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                />
              </div>

              {/* Filters and Stats */}
              <div className="flex items-center justify-between lg:justify-end space-x-4">
                <div className="text-sm text-text-secondary font-body">
                  Showing {paginatedTributes.length} of{" "}
                  {filteredAndSortedTributes.length} tributes
                </div>

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
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mosaic Tributes Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className={`glass-card p-6 animate-pulse ${getMosaicClass(
                    index
                  )}`}
                >
                  <div className="h-4 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded mb-4"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded"></div>
                    <div className="h-3 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded w-3/4"></div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedTributes.length === 0 ? (
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
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr"
                layout
              >
                <AnimatePresence>
                  {paginatedTributes.map((tribute, index) => (
                    <TributeCard
                      key={tribute._id}
                      tribute={tribute}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              <Pagination />
            </>
          )}
        </div>
      </section>

      {/* Tribute Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-headings font-medium text-text-primary">
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
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
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

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    name="isPrivate"
                    checked={formData.isPrivate}
                    onChange={(e) =>
                      setFormData({ ...formData, isPrivate: e.target.checked })
                    }
                    className="w-4 h-4 text-accent-primary bg-transparent border-2 border-accent-primary/30 rounded focus:ring-accent-primary focus:ring-2"
                  />
                  <label
                    htmlFor="isPrivate"
                    className="text-sm font-body text-text-secondary"
                  >
                    Keep this tribute private (only visible to family)
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="glass-button px-6 py-3 font-headings font-medium cursor-pointer hover:text-text-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-8 py-3 rounded-lg font-headings font-medium cursor-pointer hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Tribute</span>
                      </>
                    )}
                  </motion.button>
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
