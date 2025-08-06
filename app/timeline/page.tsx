"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Heart } from "lucide-react";
import { useToast } from "../../components/ui/toast";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  location?: string;
  importance: "high" | "medium" | "low";
  photos?: string[];
}

const Timeline = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { showToast } = useToast();

  // Fetch timeline events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/timeline?page=1&limit=50");
        const json = await res.json();
        if (json.success) {
          setEvents(json.data);
        }
      } catch (err) {
        console.error("Failed to load timeline events", err);
        showToast({
          type: "error",
          title: "Loading Failed",
          message: "Could not load timeline events. Please refresh the page.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [showToast]);

  const categories = [
    { id: "all", label: "All Events", color: "bg-gray-500" },
    { id: "birth", label: "Birth & Early Life", color: "bg-blue-500" },
    { id: "education", label: "Education", color: "bg-green-500" },
    { id: "career", label: "Career", color: "bg-purple-500" },
    { id: "family", label: "Family", color: "bg-pink-500" },
    { id: "community", label: "Community Service", color: "bg-orange-500" },
    { id: "church", label: "Church Life", color: "bg-indigo-500" },
    { id: "achievements", label: "Achievements", color: "bg-yellow-500" },
  ];

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "border-red-400 bg-red-500/10";
      case "medium":
        return "border-yellow-400 bg-yellow-500/10";
      case "low":
        return "border-gray-400 bg-gray-500/10";
      default:
        return "border-gray-400 bg-gray-500/10";
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    return cat ? cat.color : "bg-gray-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            Life Timeline
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            A journey through the beautiful moments and milestones of Phoebe's
            life
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : "bg-gray-800 text-gray-500 hover:bg-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 via-pink-400 to-purple-400 rounded-full"></div>

          <div className="space-y-12">
            {sortedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {/* Event card */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                  }`}
                >
                  <div
                    className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border-l-4 ${getImportanceColor(
                      event.importance
                    )} shadow-lg hover:shadow-xl transition-shadow duration-300`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(
                          event.category
                        )}`}
                      >
                        {categories.find((c) => c.id === event.category)
                          ?.label || event.category}
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatDate(event.date)}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-500 mb-3">{event.description}</p>

                    {event.location && (
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </div>
                    )}

                    {event.photos && event.photos.length > 0 && (
                      <div className="mt-3">
                        <span className="text-sm text-gray-400">
                          📸 {event.photos.length} photo
                          {event.photos.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-400 rounded-full border-4 border-slate-900 z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {sortedEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-500 mb-2">No events found</h3>
            <p className="text-gray-400">
              {selectedCategory === "all"
                ? "Timeline events will be added soon."
                : `No events found in the ${
                    categories.find((c) => c.id === selectedCategory)?.label
                  } category.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
