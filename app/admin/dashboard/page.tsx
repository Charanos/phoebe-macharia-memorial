"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Camera,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Eye,
  Heart,
  Calendar,
  Activity,
  LayoutDashboard,
  Search,
  Filter,
  Check,
  X,
  Star,
  Edit,
  Trash2,
  Download,
  User,
  MoreVertical,
  ChevronDown,
  RefreshCw,
  Upload,
  BarChart3,
  Plus,
  Save,
  Tag,
  Image as ImageIcon,
  Bell,
  LogOut,
  ChevronRight,
  Zap,
  Shield,
  Globe,
  Archive,
  FileText,
  PieChart,
  Target,
  Layers,
  Monitor,
  Moon,
  Sun,
  Menu,
  X as CloseIcon,
} from "lucide-react";
import { useToast } from "../../../components/ui/toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  tributes: {
    total: number;
    pending: number;
    approved: number;
    featured: number;
  };
  gallery: {
    total: number;
    recent: number;
  };
  timeline: {
    total: number;
    recent: number;
  };
  visitors: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
}

interface Tribute {
  _id: string;
  name: string;
  relationship: string;
  title: string;
  message: string;
  isApproved: boolean;
  isFeatured: boolean;
  likes: number;
  createdAt: string;
  email?: string;
}

interface GalleryPhoto {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  uploadedBy: string;
  createdAt: string;
  isApproved: boolean;
}

interface TimelineEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  isPublic: boolean;
  createdAt: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showToast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [activity, setActivity] = useState<Tribute[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("admin_token");
    if (!token) {
      // Redirect to login if not authenticated
      window.location.href = "/admin/login";
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const statsRes = await fetch("/api/admin/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!statsRes.ok) throw new Error("Failed to fetch stats");
        const statsData = await statsRes.json();
        setStats(statsData);
        setIsLoading(false);

        const tributesRes = await fetch("/api/admin/tributes?limit=100", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!tributesRes.ok) throw new Error("Failed to fetch tributes");
        const tributesData = await tributesRes.json();
        setTributes(tributesData.tributes);

        const activityRes = await fetch("/api/admin/dashboard/activity", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!activityRes.ok) throw new Error("Failed to fetch activity");
        const activityData = await activityRes.json();
        setActivity(activityData.activity || []);

        const galleryRes = await fetch("/api/admin/gallery", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!galleryRes.ok) throw new Error("Failed to fetch gallery photos");
        const galleryData = await galleryRes.json();
        setGalleryPhotos(galleryData.images || []);

        const timelineRes = await fetch("/api/admin/timeline", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!timelineRes.ok) throw new Error("Failed to fetch timeline events");
        const timelineData = await timelineRes.json();
        setTimelineEvents(timelineData.events || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        showToast({
          type: "error",
          title: "Error",
          message: `Failed to load dashboard data: ${errorMessage}`,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  // Action handlers
  const handleApprove = async (tributeId: string) => {
    try {
      const response = await fetch(`/api/admin/tributes/${tributeId}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to approve tribute");
      }

      const result = await response.json();

      setTributes((prev) =>
        prev.map((tribute) =>
          tribute._id === tributeId ? { ...tribute, isApproved: true } : tribute
        )
      );

      showToast({
        type: "success",
        title: "Tribute Approved",
        message:
          result.message ||
          "The tribute has been approved and is now visible to visitors",
      });
    } catch (error) {
      console.error("Error approving tribute:", error);
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to approve tribute",
      });
    }
  };

  const handleReject = async (tributeId: string) => {
    try {
      const response = await fetch(`/api/admin/tributes/${tributeId}/reject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reject tribute");
      }

      const result = await response.json();

      setTributes((prev) =>
        prev.filter((tribute) => tribute._id !== tributeId)
      );

      showToast({
        type: "success",
        title: "Tribute Rejected",
        message: result.message || "The tribute has been rejected and removed",
      });
    } catch (error) {
      console.error("Error rejecting tribute:", error);
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to reject tribute",
      });
    }
  };

  const handleFeature = async (tributeId: string) => {
    try {
      const response = await fetch(`/api/admin/tributes/${tributeId}/feature`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update tribute feature status");
      }

      const result = await response.json();

      setTributes((prev) =>
        prev.map((tribute) =>
          tribute._id === tributeId
            ? { ...tribute, isFeatured: !tribute.isFeatured }
            : tribute
        )
      );

      showToast({
        type: "success",
        title: "Tribute Updated",
        message: result.message || "Featured status has been updated",
      });
    } catch (error) {
      console.error("Error updating tribute feature status:", error);
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to update tribute",
      });
    }
  };

  // Gallery management functions
  const fetchGalleryPhotos = async () => {
    try {
      const response = await fetch("/api/admin/gallery", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch gallery photos");
      }

      const result = await response.json();
      setGalleryPhotos(result.images || []);
    } catch (error) {
      console.error("Error fetching gallery photos:", error);
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to fetch gallery photos",
      });
    }
  };

  const handleToggleGalleryPhotoStatus = async (
    photoId: string,
    approve: boolean
  ) => {
    try {
      const response = await fetch(`/api/admin/gallery/${photoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify({ isApproved: approve }),
      });

      if (!response.ok) {
        throw new Error("Failed to update gallery photo status");
      }

      const result = await response.json();

      setGalleryPhotos((prev) =>
        prev.map((photo) =>
          photo._id === photoId ? { ...photo, isApproved: approve } : photo
        )
      );

      showToast({
        type: "success",
        title: "Photo Updated",
        message:
          result.message ||
          `Photo has been ${approve ? "approved" : "unapproved"}`,
      });
    } catch (error) {
      console.error("Error updating gallery photo status:", error);
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to update gallery photo status",
      });
    }
  };

  const handleDeleteGalleryPhoto = async (photoId: string) => {
    try {
      const response = await fetch(`/api/admin/gallery/${photoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete gallery photo");
      }

      const result = await response.json();

      setGalleryPhotos((prev) => prev.filter((photo) => photo._id !== photoId));

      showToast({
        type: "success",
        title: "Photo Deleted",
        message: result.message || "Photo has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting gallery photo:", error);
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to delete gallery photo",
      });
    }
  };

  // Timeline management functions
  const fetchTimelineEvents = async () => {
    try {
      const response = await fetch("/api/admin/timeline", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch timeline events");
      }

      const result = await response.json();
      setTimelineEvents(result.events || []);
    } catch (error) {
      console.error("Error fetching timeline events:", error);
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to fetch timeline events",
      });
    }
  };

  const handleToggleTimelineEventStatus = async (
    eventId: string,
    makePublic: boolean
  ) => {
    try {
      const response = await fetch(`/api/admin/timeline/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify({ isPublic: makePublic }),
      });

      if (!response.ok) {
        throw new Error("Failed to update timeline event status");
      }

      const result = await response.json();

      setTimelineEvents((prev) =>
        prev.map((event) =>
          event._id === eventId ? { ...event, isPublic: makePublic } : event
        )
      );

      showToast({
        type: "success",
        title: "Event Updated",
        message:
          result.message ||
          `Event has been made ${makePublic ? "public" : "private"}`,
      });
    } catch (error) {
      console.error("Error updating timeline event status:", error);
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to update timeline event status",
      });
    }
  };

  const handleDeleteTimelineEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/admin/timeline/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete timeline event");
      }

      const result = await response.json();

      setTimelineEvents((prev) =>
        prev.filter((event) => event._id !== eventId)
      );

      showToast({
        type: "success",
        title: "Event Deleted",
        message: result.message || "Event has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting timeline event:", error);
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to delete timeline event",
      });
    }
  };

  // Enhanced tab configuration with sub-actions
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      description: "Dashboard summary and quick actions",
    },
    {
      id: "tributes",
      label: "Tributes",
      icon: MessageSquare,
      badge: stats?.tributes.pending,
      description: "Manage tribute submissions and approvals",
      actions: [
        { label: "View All", action: () => setFilterStatus("all") },
        { label: "Pending", action: () => setFilterStatus("pending") },
        { label: "Featured", action: () => setFilterStatus("featured") },
      ],
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: Camera,
      description: "Manage photos and media content",
      actions: [
        { label: "Upload New", action: () => console.log("Upload") },
        { label: "Bulk Actions", action: () => console.log("Bulk") },
      ],
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: Clock,
      description: "Manage life events and milestones",
      actions: [
        { label: "Add Event", action: () => console.log("Add") },
        { label: "Categories", action: () => console.log("Categories") },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "View site statistics and insights",
      actions: [
        { label: "Export Report", action: () => console.log("Export") },
        { label: "Custom Range", action: () => console.log("Range") },
      ],
    },
  ];

  // Enhanced stat cards with better visuals
  const statCards = [
    {
      title: "Total Tributes",
      value: stats?.tributes.total || 0,
      change: "+12%",
      changeType: "increase",
      icon: MessageSquare,
      gradient: "from-violet-500 via-purple-500 to-indigo-500",
      bgPattern: "bg-gradient-to-br",
      details: [
        {
          label: "Pending",
          value: stats?.tributes.pending || 0,
          color: "text-amber-600 dark:text-amber-400",
          bgColor: "bg-amber-50 dark:bg-amber-900/20",
        },
        {
          label: "Approved",
          value: stats?.tributes.approved || 0,
          color: "text-emerald-600 dark:text-emerald-400",
          bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        },
        {
          label: "Featured",
          value: stats?.tributes.featured || 0,
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-50 dark:bg-purple-900/20",
        },
      ],
    },
    {
      title: "Gallery Photos",
      value: stats?.gallery.total || 0,
      change: "+8%",
      changeType: "increase",
      icon: Camera,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      bgPattern: "bg-gradient-to-br",
      details: [
        {
          label: "Recent",
          value: stats?.gallery.recent || 0,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
        },
      ],
    },
    {
      title: "Timeline Events",
      value: stats?.timeline.total || 0,
      change: "+3%",
      changeType: "increase",
      icon: Clock,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      bgPattern: "bg-gradient-to-br",
      details: [
        {
          label: "Recent",
          value: stats?.timeline.recent || 0,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
        },
      ],
    },
    {
      title: "Monthly Visitors",
      value: stats?.visitors.thisMonth || 0,
      change: "+24%",
      changeType: "increase",
      icon: Users,
      gradient: "from-pink-500 via-rose-500 to-red-500",
      bgPattern: "bg-gradient-to-br",
      details: [
        {
          label: "Today",
          value: stats?.visitors.today || 0,
          color: "text-emerald-600 dark:text-emerald-400",
          bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        },
        {
          label: "This Week",
          value: stats?.visitors.thisWeek || 0,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
        },
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Loading Dashboard
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Preparing your memorial management interface...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
        <div className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-red-200 dark:border-red-700">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Dashboard Error
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      {/* Enhanced Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-13 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white font-montserrat">
                      Admin Panel
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Memorial Dashboard
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.div key={tab.id} className="relative">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:shadow-md"
                  }`}
                >
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    />
                    {tab.badge && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 text-left"
                    >
                      <div className="font-medium">{tab.label}</div>
                      <div
                        className={`text-xs ${
                          isActive
                            ? "text-purple-100"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {tab.description}
                      </div>
                    </motion.div>
                  )}
                  {!sidebarCollapsed && tab.actions && (
                    <ChevronRight
                      className={`w-4 h-4 ${
                        isActive ? "text-white" : "text-gray-400"
                      } group-hover:text-purple-500`}
                    />
                  )}
                </button>
              </motion.div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-500" />
            )}
            {!sidebarCollapsed && (
              <span className="font-medium">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>

          {/* Back to Website */}
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            {!sidebarCollapsed && (
              <span className="font-medium">Back to Website</span>
            )}
          </Link>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              window.location.href = "/admin/login";
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-montserrat">
                {tabs.find((tab) => tab.id === activeTab)?.label} Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {tabs.find((tab) => tab.id === activeTab)?.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200">
                  <Bell className="w-5 h-5" />
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>

              {/* Admin Avatar */}
              <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Admin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-88px)]">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-800/50 backdrop-blur-sm rounded-2xl"></div>
                        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                          {/* Card Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div
                              className={`w-14 h-14 ${card.bgPattern} ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-300`}
                            >
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            <div
                              className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                                card.changeType === "increase"
                                  ? "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30"
                                  : "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30"
                              }`}
                            >
                              <TrendingUp className="w-4 h-4" />
                              {card.change}
                            </div>
                          </div>

                          {/* Main Value */}
                          <div className="mb-4">
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                              {card.value.toLocaleString()}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">
                              {card.title}
                            </p>
                          </div>

                          {/* Details */}
                          {card.details && (
                            <div className="space-y-2">
                              {card.details.map((detail, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center"
                                >
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {detail.label}
                                  </span>
                                  <span
                                    className={`text-sm font-semibold px-2 py-1 rounded-full ${detail.bgColor} ${detail.color}`}
                                  >
                                    {detail.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Hover Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Enhanced Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Pending Actions - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="lg:col-span-2"
                  >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-montserrat">
                              Pending Actions
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Items requiring your attention
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                          <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                            {stats?.tributes.pending || 0} pending
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Tributes Pending */}
                        <div className="group p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl border border-amber-200/50 dark:border-amber-800/50 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {stats?.tributes.pending || 0} Tributes
                                  Awaiting Approval
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Review and approve new tribute submissions
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Latest:{" "}
                                    {activity[0]
                                      ? new Date(
                                          activity[0].createdAt
                                        ).toLocaleDateString()
                                      : "None"}
                                  </span>
                                  <span className="text-xs text-amber-600 dark:text-amber-400">
                                    Urgent
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => setActiveTab("tributes")}
                              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              Review Now
                            </button>
                          </div>
                        </div>

                        {/* Gallery Items */}
                        <div className="group p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <Camera className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  Gallery Management
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {stats?.gallery.total || 0} photos •{" "}
                                  {stats?.gallery.recent || 0} recent uploads
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setActiveTab("gallery")}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              Manage
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Recent Activity - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Activity className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-montserrat">
                              Recent Activity
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Latest submissions
                            </p>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>

                      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                        {activity.slice(0, 8).map((item, index) => (
                          <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all duration-200 cursor-pointer group"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 group-hover:scale-110 transition-transform duration-200">
                              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                  {item.name}
                                </p>
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    item.isApproved
                                      ? "bg-green-500"
                                      : "bg-amber-500"
                                  }`}
                                ></span>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                                {item.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <span>{item.relationship}</span>
                                <span>•</span>
                                <span>
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <span
                                className={`px-2 py-1 text-xs rounded-full font-medium ${
                                  item.isApproved
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                }`}
                              >
                                {item.isApproved ? "Approved" : "Pending"}
                              </span>
                              {item.likes > 0 && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Heart className="w-3 h-3 text-red-400" />
                                  {item.likes}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {activity.length === 0 && (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <Activity className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500 dark:text-gray-400">
                            No recent activity
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Quick Stats Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl p-6 text-white shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Memorial Impact
                      </h3>
                      <p className="text-purple-100">
                        Touching hearts and preserving memories since launch
                      </p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {(stats?.visitors.thisMonth || 0) +
                            (stats?.tributes.total || 0)}
                        </div>
                        <div className="text-sm text-purple-100">
                          Total Interactions
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {stats?.tributes.approved || 0}
                        </div>
                        <div className="text-sm text-purple-100">
                          Published Tributes
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {stats?.gallery.total || 0}
                        </div>
                        <div className="text-sm text-purple-100">
                          Shared Memories
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "tributes" && (
              <motion.div
                key="tributes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Enhanced Tributes Header */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <MessageSquare className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-montserrat">
                          Tributes Management
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Review and manage {tributes.length} tribute
                          submissions
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                        <CheckCircle className="w-4 h-4" />
                        Bulk Approve
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Search and Filter */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tributes by name, relationship, or content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white backdrop-blur-sm"
                      />
                    </div>
                    <div className="flex gap-3">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white backdrop-blur-sm"
                      >
                        <option value="all">All Tributes</option>
                        <option value="pending">Pending Approval</option>
                        <option value="approved">Approved</option>
                        <option value="featured">Featured</option>
                      </select>
                      <button className="px-4 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-200">
                        <Filter className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Tributes List */}
                <div className="space-y-4">
                  {tributes
                    .filter((tribute) => {
                      const matchesSearch =
                        searchTerm === "" ||
                        tribute.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        tribute.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        tribute.message
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        tribute.relationship
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase());

                      const matchesFilter =
                        filterStatus === "all" ||
                        (filterStatus === "pending" && !tribute.isApproved) ||
                        (filterStatus === "approved" && tribute.isApproved) ||
                        (filterStatus === "featured" && tribute.isFeatured);

                      return matchesSearch && matchesFilter;
                    })
                    .map((tribute, index) => (
                      <motion.div
                        key={tribute._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {/* Tribute Header */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                  {tribute.title}
                                </h4>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                  <span className="font-medium text-purple-600 dark:text-purple-400">
                                    {tribute.name}
                                  </span>
                                  <span>•</span>
                                  <span>{tribute.relationship}</span>
                                </div>
                              </div>

                              {/* Status Badges */}
                              <div className="flex items-center gap-2">
                                {!tribute.isApproved && (
                                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium rounded-full border border-amber-200 dark:border-amber-700">
                                    Pending Review
                                  </span>
                                )}
                                {tribute.isApproved && (
                                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full border border-green-200 dark:border-green-700">
                                    Approved
                                  </span>
                                )}
                                {tribute.isFeatured && (
                                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full border border-purple-200 dark:border-purple-700 flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Tribute Stats */}
                            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4 text-red-400" />
                                <span>{tribute.likes} likes</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(
                                    tribute.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {new Date(
                                    tribute.createdAt
                                  ).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>

                            {/* Tribute Content */}
                            <div className="bg-gray-50/50 dark:bg-gray-700/30 rounded-xl p-4 mb-4">
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                {tribute.message}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 ml-6">
                            {!tribute.isApproved && (
                              <>
                                <button
                                  onClick={() => handleApprove(tribute._id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                  <Check className="w-4 h-4" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(tribute._id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                  <X className="w-4 h-4" />
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleFeature(tribute._id)}
                              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                                tribute.isFeatured
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                              }`}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  tribute.isFeatured ? "fill-current" : ""
                                }`}
                              />
                              {tribute.isFeatured ? "Unfeature" : "Feature"}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                  {/* Empty State */}
                  {tributes.filter((tribute) => {
                    const matchesSearch =
                      searchTerm === "" ||
                      tribute.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      tribute.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      tribute.message
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      tribute.relationship
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());

                    const matchesFilter =
                      filterStatus === "all" ||
                      (filterStatus === "pending" && !tribute.isApproved) ||
                      (filterStatus === "approved" && tribute.isApproved) ||
                      (filterStatus === "featured" && tribute.isFeatured);

                    return matchesSearch && matchesFilter;
                  }).length === 0 && (
                    <div className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No tributes found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {searchTerm || filterStatus !== "all"
                          ? "Try adjusting your search or filters"
                          : "Tributes will appear here once submitted"}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "gallery" && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Gallery Header */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                        <Camera className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-montserrat">
                          Gallery Management
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Manage {galleryPhotos.length} photos and media content
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                        <Upload className="w-4 h-4" />
                        Upload Photos
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {galleryPhotos.map((photo, index) => (
                    <motion.div
                      key={photo._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-white font-semibold truncate">
                              {photo.title}
                            </h4>
                            <p className="text-white/80 text-sm truncate">
                              {photo.description}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              photo.isApproved
                                ? "bg-green-500 text-white"
                                : "bg-amber-500 text-white"
                            }`}
                          >
                            {photo.isApproved ? "Approved" : "Pending"}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            By {photo.uploadedBy}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(photo.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {!photo.isApproved ? (
                            <button
                              onClick={() =>
                                handleToggleGalleryPhotoStatus(photo._id, true)
                              }
                              className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleToggleGalleryPhotoStatus(photo._id, false)
                              }
                              className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                            >
                              Unapprove
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteGalleryPhoto(photo._id)}
                            className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Empty State */}
                {galleryPhotos.length === 0 && (
                  <div className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No photos yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Photos will appear here once uploaded
                    </p>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200">
                      Upload First Photo
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "timeline" && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Timeline Header */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                        <Clock className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-montserrat">
                          Timeline Management
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Manage {timelineEvents.length} life events and
                          milestones
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                        <Plus className="w-4 h-4" />
                        Add Event
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline Events */}
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => (
                    <motion.div
                      key={event._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                {event.title}
                              </h4>
                              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span>
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                                <span>•</span>
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                                  {event.category}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`px-3 py-1 text-sm font-medium rounded-full ${
                                  event.isPublic
                                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {event.isPublic ? "Public" : "Private"}
                              </span>
                            </div>
                          </div>

                          <div className="bg-gray-50/50 dark:bg-gray-700/30 rounded-xl p-4 mb-4">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {event.description}
                            </p>
                          </div>

                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Created on{" "}
                            {new Date(event.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-6">
                          <button
                            onClick={() =>
                              handleToggleTimelineEventStatus(
                                event._id,
                                !event.isPublic
                              )
                            }
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                              event.isPublic
                                ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                            }`}
                          >
                            {event.isPublic ? (
                              <>
                                <Eye className="w-4 h-4" />
                                Make Private
                              </>
                            ) : (
                              <>
                                <Globe className="w-4 h-4" />
                                Make Public
                              </>
                            )}
                          </button>

                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200">
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteTimelineEvent(event._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Empty State */}
                {timelineEvents.length === 0 && (
                  <div className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No timeline events yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Timeline events will appear here once created
                    </p>
                    <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200">
                      Create First Event
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Analytics Header */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <BarChart3 className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-montserrat">
                          Analytics & Insights
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Memorial site statistics and visitor insights
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white">
                        <option>Last 30 days</option>
                        <option>Last 7 days</option>
                        <option>Last 90 days</option>
                        <option>All time</option>
                      </select>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                        <Download className="w-4 h-4" />
                        Export Report
                      </button>
                    </div>
                  </div>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Visitor Analytics */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Visitor Analytics
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Today
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {stats?.visitors.today || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          This Week
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {stats?.visitors.thisWeek || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          This Month
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {stats?.visitors.thisMonth || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Engagement Metrics */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Engagement
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Total Likes
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {tributes.reduce(
                            (sum, tribute) => sum + tribute.likes,
                            0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Avg. per Tribute
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {tributes.length > 0
                            ? Math.round(
                                tributes.reduce(
                                  (sum, tribute) => sum + tribute.likes,
                                  0
                                ) / tributes.length
                              )
                            : 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Featured Items
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {stats?.tributes.featured || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Overview */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Content Overview
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Total Tributes
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {stats?.tributes.total || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Gallery Photos
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {stats?.gallery.total || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Timeline Events
                        </span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {stats?.timeline.total || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Placeholder for Charts */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Visitor Trends
                  </h3>
                  <div className="h-64 bg-gray-50 dark:bg-gray-700/30 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Chart visualization would go here
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
