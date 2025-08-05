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
} from "lucide-react";
import Image from "next/image";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

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
  featured: boolean;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample photos data - in a real app, this would come from an API
  const samplePhotos: Photo[] = [
    {
      id: "1",
      title: "Family Gathering",
      description: "A beautiful family moment during the holidays",
      imageUrl: "/placeholder-photo.jpg",
      thumbnailUrl: "/placeholder-photo.jpg",
      category: "family",
      date: "2023-12-25",
      location: "Family Home",
      people: ["Phoebe", "Family"],
      featured: true,
    },
    {
      id: "2",
      title: "Church Service",
      description: "Phoebe serving at PCEA Riruta Satellite",
      imageUrl: "/placeholder-photo.jpg",
      thumbnailUrl: "/placeholder-photo.jpg",
      category: "church",
      date: "2023-11-15",
      location: "PCEA Riruta Satellite",
      people: ["Phoebe", "Church Community"],
      featured: false,
    },
    {
      id: "3",
      title: "Community Service",
      description: "Helping at the local community center",
      imageUrl: "/placeholder-photo.jpg",
      thumbnailUrl: "/placeholder-photo.jpg",
      category: "community",
      date: "2023-10-20",
      location: "Community Center",
      people: ["Phoebe", "Volunteers"],
      featured: true,
    },
    {
      id: "4",
      title: "Birthday Celebration",
      description: "Celebrating another year of life and joy",
      imageUrl: "/placeholder-photo.jpg",
      thumbnailUrl: "/placeholder-photo.jpg",
      category: "celebrations",
      date: "2023-08-15",
      location: "Home",
      people: ["Phoebe", "Friends", "Family"],
      featured: false,
    },
    {
      id: "5",
      title: "Graduation Day",
      description: "A proud moment of achievement",
      imageUrl: "/placeholder-photo.jpg",
      thumbnailUrl: "/placeholder-photo.jpg",
      category: "milestones",
      date: "2022-06-10",
      location: "University",
      people: ["Phoebe", "Family"],
      featured: true,
    },
    {
      id: "6",
      title: "Nature Walk",
      description: "Enjoying the beauty of God's creation",
      imageUrl: "/placeholder-photo.jpg",
      thumbnailUrl: "/placeholder-photo.jpg",
      category: "nature",
      date: "2023-09-05",
      location: "Karura Forest",
      people: ["Phoebe", "Friends"],
      featured: false,
    },
  ];

  const categories = [
    { id: "all", label: "All Photos", count: samplePhotos.length },
    {
      id: "family",
      label: "Family",
      count: samplePhotos.filter((p) => p.category === "family").length,
    },
    {
      id: "church",
      label: "Church",
      count: samplePhotos.filter((p) => p.category === "church").length,
    },
    {
      id: "community",
      label: "Community",
      count: samplePhotos.filter((p) => p.category === "community").length,
    },
    {
      id: "celebrations",
      label: "Celebrations",
      count: samplePhotos.filter((p) => p.category === "celebrations").length,
    },
    {
      id: "milestones",
      label: "Milestones",
      count: samplePhotos.filter((p) => p.category === "milestones").length,
    },
    {
      id: "nature",
      label: "Nature",
      count: samplePhotos.filter((p) => p.category === "nature").length,
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPhotos(samplePhotos);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const featuredPhotos = photos.filter((photo) => photo.featured);

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;

    const currentIndex = filteredPhotos.findIndex(
      (p) => p.id === selectedPhoto.id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    } else {
      newIndex =
        currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      <Header />
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
              <h1 className="text-4xl md:text-5xl font-headings font-semibold text-text-primary">
                Photo Gallery
              </h1>
            </div>
            <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto">
              A collection of cherished memories capturing the beautiful moments
              of Phoebe's life, her love for family, faith, and community
              service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Photos Section */}
      {featuredPhotos.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-headings font-semibold text-text-primary mb-4">
                Featured Memories
              </h2>
              <p className="text-text-secondary font-body">
                Special moments that capture the essence of who Phoebe was
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {featuredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="glass-card cursor-pointer group hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => openLightbox(photo)}
                >
                  <div className="relative h-64 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center">
                    <Heart className="h-16 w-16 text-accent-primary opacity-50" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute top-4 right-4 glass px-2 py-1 rounded-full">
                      <span className="text-xs font-headings font-medium text-text-primary">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-headings font-medium text-lg text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-text-secondary font-body text-sm mb-3 line-clamp-2">
                      {photo.description}
                    </p>
                    <div className="flex items-center text-xs text-text-secondary font-body space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(photo.date).toLocaleDateString()}</span>
                      </div>
                      {photo.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{photo.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`glass-button px-6 py-3 font-headings font-medium cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "text-accent-primary border-accent-primary/30"
                    : "text-text-secondary hover:text-accent-primary"
                }`}
              >
                {category.label}
                <span className="ml-2 text-xs opacity-70">
                  ({category.count})
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="glass-card h-64 animate-pulse">
                  <div className="h-full bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              layout
            >
              <AnimatePresence>
                {filteredPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    className="glass-card cursor-pointer group hover:scale-105 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    layout
                    onClick={() => openLightbox(photo)}
                  >
                    <div className="relative h-64 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center">
                      <Heart className="h-12 w-12 text-accent-primary opacity-50" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      {photo.featured && (
                        <div className="absolute top-3 right-3 glass px-2 py-1 rounded-full">
                          <Heart className="h-3 w-3 text-accent-primary" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-headings font-medium text-sm text-text-primary mb-1 group-hover:text-accent-primary transition-colors line-clamp-1">
                        {photo.title}
                      </h3>
                      <p className="text-text-secondary font-body text-xs mb-2 line-clamp-2">
                        {photo.description}
                      </p>
                      <div className="flex items-center text-xs text-text-secondary font-body">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(photo.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {filteredPhotos.length === 0 && !loading && (
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
              <p className="text-text-secondary font-body">
                No photos available in this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-full bg-transparent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-accent-primary transition-colors z-10 cursor-pointer"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigatePhoto("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-primary transition-colors z-10 cursor-pointer"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={() => navigatePhoto("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-primary transition-colors z-10 cursor-pointer"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Photo */}
              <div className="relative bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-lg">
                <div className="aspect-video flex items-center justify-center min-h-[400px]">
                  <Heart className="h-24 w-24 text-accent-primary opacity-50" />
                </div>
              </div>

              {/* Photo Info */}
              <div className="glass-card mt-4 p-6">
                <h2 className="text-2xl font-headings font-semibold text-text-primary mb-2">
                  {selectedPhoto.title}
                </h2>
                <p className="text-text-secondary font-body mb-4">
                  {selectedPhoto.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary font-body mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(selectedPhoto.date).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedPhoto.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedPhoto.location}</span>
                    </div>
                  )}
                  {selectedPhoto.people && selectedPhoto.people.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{selectedPhoto.people.join(", ")}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <button className="glass-button px-4 py-2 text-sm font-headings font-medium cursor-pointer hover:text-accent-primary transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button className="glass-button px-4 py-2 text-sm font-headings font-medium cursor-pointer hover:text-accent-secondary transition-colors flex items-center space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
