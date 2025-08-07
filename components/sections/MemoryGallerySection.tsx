"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";
import { Camera, ArrowRight } from "lucide-react";

interface MemoryGallerySectionProps {
  mounted: boolean;
}

const MemoryGallerySection: React.FC<MemoryGallerySectionProps> = ({
  mounted,
}) => {
  const { resolvedTheme } = useTheme();

  const memories = [
    {
      src: "/images/gallery/memory-1.jpg",
      alt: "Family gathering",
      span: "col-span-2",
    },
    { src: "/images/gallery/memory-2.jpg", alt: "Sunday school teaching" },
    { src: "/images/gallery/memory-3.jpg", alt: "Wedding day" },
    {
      src: "/images/gallery/memory-4.jpg",
      alt: "With grandchildren",
      span: "col-span-2",
    },
    { src: "/images/gallery/memory-5.jpg", alt: "Church service" },
    { src: "/images/gallery/memory-6.jpg", alt: "Family portrait" },
    {
      src: "/images/gallery/memory-7.jpg",
      alt: "Holiday celebration",
      span: "col-span-2",
    },
    { src: "/images/gallery/memory-8.jpg", alt: "Garden moments" },
  ];

  // Theme-based background classes
  const getBgClasses = (variant = 1) => {
    const isDark = resolvedTheme === "dark";

    if (variant === 1) {
      return isDark
        ? "bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900"
        : "bg-gradient-to-br from-rose-50 via-purple-50/80 to-amber-50";
    } else {
      return isDark
        ? "bg-gradient-to-bl from-slate-800 via-indigo-900/50 to-slate-800"
        : "bg-gradient-to-bl from-amber-50 via-rose-50/80 to-purple-50";
    }
  };

  const getTextClasses = () => {
    return resolvedTheme === "dark" ? "text-white" : "text-gray-900";
  };

  const getSecondaryTextClasses = () => {
    return resolvedTheme === "dark" ? "text-gray-500" : "text-gray-700";
  };

  const getGlassClasses = () => {
    return resolvedTheme === "dark"
      ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
      : "bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl";
  };

  if (!mounted) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-bl from-amber-50 via-rose-50/80 to-purple-50 dark:from-slate-800 dark:via-indigo-900/50 dark:to-slate-800 animate-pulse">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 bg-white/20 rounded-full w-48 mx-auto mb-8"></div>
            <div className="h-16 bg-white/20 rounded-lg w-96 mx-auto mb-6"></div>
            <div className="h-6 bg-white/20 rounded-lg w-full max-w-3xl mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-48 md:h-64 bg-white/20 rounded-2xl"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-24 px-4 sm:px-6 lg:px-8 relative ${getBgClasses(2)}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-purple-500/5"></div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className={`inline-flex items-center space-x-2 ${getGlassClasses()} px-6 py-3 rounded-full mb-8`}
          >
            <Camera className="h-5 w-5 text-purple-600 dark:text-purple-500" />
            <span className={`text-sm font-medium ${getTextClasses()}`}>
              Precious Memories
            </span>
          </div>
          <h2
            className={`text-4xl md:text-6xl font-serif font-semibold ${getTextClasses()} mb-6 leading-tight`}
          >
            A Life in
            <span className="block bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 dark:from-purple-500 dark:via-rose-300 dark:to-amber-300 bg-clip-text text-transparent">
              Beautiful Moments
            </span>
          </h2>
          <p
            className={`text-xl ${getSecondaryTextClasses()} max-w-3xl mx-auto font-normal leading-relaxed`}
          >
            Each photograph tells a story, captures a smile, and preserves the
            love that Phoebe brought to every moment of her remarkable life.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              className={`${
                memory.span || ""
              } group relative overflow-hidden rounded-2xl`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-square md:aspect-auto h-48 md:h-64 relative">
                <div
                  className={`${getGlassClasses()} absolute inset-0 rounded-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-500`}
                >
                  <Image
                    src={memory.src}
                    alt={memory.alt}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium text-sm">{memory.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/gallery">
            <motion.button
              className={`${getGlassClasses()} px-8 py-4 rounded-full font-medium ${getTextClasses()} hover:scale-[1.01] transition-all duration-300 group`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <span>View Complete Gallery</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MemoryGallerySection;
