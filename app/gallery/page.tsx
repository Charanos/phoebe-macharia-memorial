"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Calendar,
  MapPin,
  Users,
  RefreshCw,
  Plus,
  Eye,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { useToast } from "../../components/ui/toast";
import {
  getThumbnailUrl,
  getMediumUrl,
  getLargeUrl,
  getResponsiveImageSet,
  getPlaceholderImage,
} from "../../lib/image-utils";
import PhotoSubmissionForm from "../../components/gallery/PhotoSubmissionForm";

interface Photo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  date: string;
  location?: string;
  people?: string[];
  isFeatured: boolean;
  isApproved: boolean;
}

const INITIAL_LOAD = 16;
const LOAD_MORE_AMOUNT = 12;

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [apiFeaturedPhotos, setApiFeaturedPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(INITIAL_LOAD);
  const { showToast } = useToast();
  const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false);

  // Fetch photos from API
  const fetchPhotos = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setLoading(true);
    }

    try {
      const [regularRes, featuredRes] = await Promise.all([
        fetch("/api/gallery?page=1&limit=100"),
        fetch("/api/gallery?featured=true&limit=6"),
      ]);

      const [regularJson, featuredJson] = await Promise.all([
        regularRes.json(),
        featuredRes.json(),
      ]);

      if (regularJson.success) {
        setPhotos(regularJson.data);
      }

      if (featuredJson.success) {
        setApiFeaturedPhotos(featuredJson.data);
      }

      if (showRefreshIndicator) {
        showToast({
          type: "success",
          title: "Gallery Refreshed",
          message: "Latest photos loaded successfully",
        });
      }
    } catch (err) {
      showToast({
        type: "error",
        title: "Loading Failed",
        message: "Could not load gallery photos. Please refresh the page.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();

    const interval = setInterval(() => {
      fetchPhotos();
    }, 30000);

    return () => clearInterval(interval);
  }, [showToast]);

  const categories = [
    { id: "all", label: "All Photos", count: photos.length },
    {
      id: "family",
      label: "Family",
      count: photos.filter((p) => p.category === "family").length,
    },
    {
      id: "childhood",
      label: "Childhood",
      count: photos.filter((p) => p.category === "childhood").length,
    },
    {
      id: "school",
      label: "School Days",
      count: photos.filter((p) => p.category === "school").length,
    },
    {
      id: "work",
      label: "Work Life",
      count: photos.filter((p) => p.category === "work").length,
    },
    {
      id: "memories",
      label: "Special Memories",
      count: photos.filter((p) => p.category === "memories").length,
    },
    {
      id: "nature",
      label: "Nature",
      count: photos.filter((p) => p.category === "nature").length,
    },
  ];

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const allFeaturedPhotos = [
    ...apiFeaturedPhotos,
    ...photos.filter((photo: Photo) => photo.isFeatured),
  ];

  // Reset display count when category changes
  useEffect(() => {
    setDisplayCount(INITIAL_LOAD);
  }, [selectedCategory]);

  const displayedPhotos = filteredPhotos.slice(0, displayCount);
  const hasMorePhotos = displayCount < filteredPhotos.length;

  const loadMorePhotos = async () => {
    setLoadingMore(true);

    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    setDisplayCount((prev) => prev + LOAD_MORE_AMOUNT);
    setLoadingMore(false);

    showToast({
      type: "success",
      title: "More Photos Loaded",
      message: `Showing ${Math.min(
        displayCount + LOAD_MORE_AMOUNT,
        filteredPhotos.length
      )} of ${filteredPhotos.length} photos`,
    });
  };

  // Mosaic grid pattern helper
  const getMosaicClass = (index: number) => {
    const patterns = [
      { class: "md:col-span-1 md:row-span-1", height: "h-64" }, // Regular
      { class: "md:col-span-2 md:row-span-1", height: "h-64" }, // Wide
      { class: "md:col-span-1 md:row-span-2", height: "h-[32rem]" }, // Tall
      { class: "md:col-span-2 md:row-span-2", height: "h-[32rem]" }, // Large
      { class: "md:col-span-1 md:row-span-1", height: "h-48" }, // Short
    ];

    // Create varied pattern for visual interest
    if (index % 11 === 0) return patterns[3]; // Large every 11th
    if (index % 7 === 0) return patterns[2]; // Tall every 7th
    if (index % 5 === 0) return patterns[1]; // Wide every 5th
    if (index % 13 === 0) return patterns[4]; // Short every 13th
    return patterns[0]; // Regular otherwise
  };

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;

    const currentIndex = displayedPhotos.findIndex(
      (p) => p.id === selectedPhoto.id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : displayedPhotos.length - 1;
    } else {
      newIndex =
        currentIndex < displayedPhotos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedPhoto(displayedPhotos[newIndex]);
  };

  const PhotoCard = ({ photo, index }: { photo: Photo; index: number }) => {
    const mosaic = getMosaicClass(index);
    const isLarge =
      mosaic.class.includes("col-span-2") &&
      mosaic.class.includes("row-span-2");
    const isTall =
      mosaic.class.includes("row-span-2") &&
      !mosaic.class.includes("col-span-2");
    const isWide =
      mosaic.class.includes("col-span-2") &&
      !mosaic.class.includes("row-span-2");
    const isShort = mosaic.height === "h-48";

    return (
      <motion.div
        className={`glass-card group cursor-pointer overflow-hidden hover:scale-[1.02] transition-all duration-500 ${mosaic.class}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onClick={() => openLightbox(photo)}
        layout
      >
        {/* Image Container */}
        <div className={`relative ${mosaic.height} overflow-hidden`}>
          <Image
            src={
              isLarge
                ? getLargeUrl(photo.imageUrl)
                : isTall || isWide
                ? getMediumUrl(photo.imageUrl)
                : getThumbnailUrl(photo.imageUrl)
            }
            alt={photo.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                : isTall || isWide
                ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            priority={index < 6}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Hover Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-transparent to-accent-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured Badge */}
          {photo.isFeatured && (
            <motion.div
              className="absolute top-4 right-4 bg-gradient-to-r from-accent-primary to-accent-secondary p-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              <Sparkles className="h-3 w-3 text-white" />
            </motion.div>
          )}

          {/* View Indicator */}
          <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3 text-white" />
              <span className="text-xs font-body text-white">View</span>
            </div>
          </div>

          {/* Photo Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3
              className={`font-headings font-semibold text-white mb-1 leading-tight ${
                isLarge
                  ? "text-2xl"
                  : isTall || isWide
                  ? "text-xl"
                  : isShort
                  ? "text-sm"
                  : "text-lg"
              }`}
            >
              {photo.title}
            </h3>

            {!isShort && (
              <p
                className={`text-white/80 font-body mb-2 line-clamp-2 ${
                  isLarge ? "text-base" : "text-sm"
                }`}
              >
                {photo.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-white/70">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(photo.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {photo.location && !isShort && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate max-w-20">{photo.location}</span>
                  </div>
                )}
              </div>

              <motion.button
                className="glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="h-3 w-3 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
      {[...Array(8)].map((_, index) => {
        const mosaic = getMosaicClass(index);
        return (
          <div
            key={index}
            className={`glass-card animate-pulse ${mosaic.class}`}
          >
            <div
              className={`${mosaic.height} bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 rounded-lg`}
            ></div>
          </div>
        );
      })}
    </div>
  );

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
                <Camera className="h-8 w-8 text-accent-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-headings font-medium text-text-primary">
                Photo Gallery
              </h1>
            </div>

            <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto mb-8">
              A collection of cherished moments that celebrate the beautiful
              life and memories we shared together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={() => setIsSubmissionFormOpen(true)}
                className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-2 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border-accent-primary/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="h-5 w-5" />
                <span>Submit a Photo</span>
              </motion.button>

              <motion.button
                onClick={() => fetchPhotos(true)}
                disabled={loading}
                className="glass-button px-6 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-secondary transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw
                  className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
                />
                <span>{loading ? "Refreshing..." : "Refresh"}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Photos Section */}
      {allFeaturedPhotos.length > 0 && (
        <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-headings font-semibold text-text-primary mb-4">
                Featured Photos
              </h2>
              <p className="text-lg text-text-secondary font-body">
                A special collection of memorable moments
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allFeaturedPhotos
                .slice(0, 6)
                .map((photo: Photo, index: number) => (
                  <motion.div
                    key={`featured-${photo.id}`}
                    className="glass-card group cursor-pointer overflow-hidden hover:scale-[1.02] transition-all duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => openLightbox(photo)}
                  >
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={getLargeUrl(photo.imageUrl)}
                        alt={photo.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                      <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-primary to-accent-secondary p-2 rounded-full">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="font-headings font-semibold text-xl text-white mb-2">
                          {photo.title}
                        </h3>
                        <p className="text-white/80 font-body text-sm mb-3 line-clamp-2">
                          {photo.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-white/70">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(photo.date).toLocaleDateString()}
                            </span>
                          </div>
                          {photo.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{photo.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`glass-button px-6 py-3 font-headings font-medium cursor-pointer transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "text-accent-primary border-accent-primary/30 bg-accent-primary/10"
                      : "text-text-secondary hover:text-accent-primary hover:border-accent-primary/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                  <span className="ml-2 text-xs opacity-70">
                    ({category.count})
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-text-secondary font-body">
              Showing {displayedPhotos.length} of {filteredPhotos.length} photos
              {selectedCategory !== "all" &&
                ` in ${
                  categories.find((c) => c.id === selectedCategory)?.label
                }`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mosaic Photo Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSkeleton />
          ) : displayedPhotos.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Camera className="h-16 w-16 text-text-secondary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-headings font-medium text-text-secondary mb-2">
                No photos found
              </h3>
              <p className="text-text-secondary font-body mb-6">
                No photos available in this category yet.
              </p>
              <button
                onClick={() => setIsSubmissionFormOpen(true)}
                className="glass-button px-6 py-3 font-headings font-medium cursor-pointer hover:text-accent-primary transition-colors"
              >
                Submit the First Photo
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr"
                layout
              >
                <AnimatePresence>
                  {displayedPhotos.map((photo, index) => (
                    <PhotoCard key={photo.id} photo={photo} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Load More Button */}
              {hasMorePhotos && (
                <motion.div
                  className="text-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.button
                    onClick={loadMorePhotos}
                    disabled={loadingMore}
                    className="glass-button px-8 py-4 text-lg font-headings font-medium cursor-pointer hover:text-accent-primary transition-all duration-300 flex items-center space-x-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-accent-primary border-t-transparent rounded-full"></div>
                        <span>Loading More Photos...</span>
                      </>
                    ) : (
                      <>
                        <MoreHorizontal className="h-5 w-5" />
                        <span>Load More Photos</span>
                        <span className="text-sm opacity-70">
                          (
                          {Math.min(
                            LOAD_MORE_AMOUNT,
                            filteredPhotos.length - displayCount
                          )}{" "}
                          more)
                        </span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-6xl max-h-full w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-accent-primary transition-colors z-10 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-8 w-8" />
              </motion.button>

              {/* Navigation Buttons */}
              <motion.button
                onClick={() => navigatePhoto("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-primary transition-colors z-10 cursor-pointer glass p-3 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <motion.button
                onClick={() => navigatePhoto("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-primary transition-colors z-10 cursor-pointer glass p-3 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>

              {/* Photo Container */}
              <div className="relative bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 rounded-2xl overflow-hidden mb-6">
                <div className="relative aspect-[4/3] max-h-[70vh]">
                  <Image
                    src={getLargeUrl(selectedPhoto.imageUrl)}
                    alt={selectedPhoto.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 90vw"
                    priority
                  />
                </div>
              </div>

              {/* Photo Info */}
              <div className="glass-card p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-3xl font-headings font-semibold text-text-primary mb-3">
                      {selectedPhoto.title}
                    </h2>
                    <p className="text-text-secondary font-body leading-relaxed mb-6">
                      {selectedPhoto.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm text-text-secondary font-body">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-accent-primary" />
                        <span>
                          {new Date(selectedPhoto.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      {selectedPhoto.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-accent-primary" />
                          <span>{selectedPhoto.location}</span>
                        </div>
                      )}
                      {selectedPhoto.people &&
                        selectedPhoto.people.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-accent-primary" />
                            <span>{selectedPhoto.people.join(", ")}</span>
                          </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-4 pt-4">
                      <motion.button
                        className="glass-button px-6 py-3 text-sm font-headings font-medium cursor-pointer hover:text-accent-primary transition-colors flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </motion.button>

                      <motion.button
                        className="glass-button px-6 py-3 text-sm font-headings font-medium cursor-pointer hover:text-accent-secondary transition-colors flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </motion.button>

                      <motion.button
                        className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-6 py-3 rounded-lg text-sm font-headings font-medium cursor-pointer hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="h-4 w-4" />
                        <span>Add to Favorites</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Submission Form */}
      <PhotoSubmissionForm
        isOpen={isSubmissionFormOpen}
        onClose={() => setIsSubmissionFormOpen(false)}
        onSuccess={() => {
          fetchPhotos(true);
          showToast({
            type: "success",
            title: "Photo Submitted",
            message: "Your photo has been submitted for review.",
          });
        }}
      />
    </div>
  );
};

export default Gallery;
