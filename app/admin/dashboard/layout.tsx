"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  Camera,
  Clock,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  BarChart3,
  Bell,
} from "lucide-react";
import { useToast } from "../../../components/ui/toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // In a real app, verify token with backend
    setAdminUser({ username: "admin", role: "admin" });
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    showToast({
      type: "success",
      title: "Logged Out",
      message: "You have been successfully logged out",
    });
    router.push("/admin/login");
  };

  const sidebarItems = [
    {
      href: "/admin/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      description: "Dashboard overview",
    },
    {
      href: "/admin/dashboard/tributes",
      label: "Tributes",
      icon: MessageSquare,
      description: "Manage tributes",
      badge: "5", // Dynamic count
    },
    {
      href: "/admin/dashboard/gallery",
      label: "Gallery",
      icon: Camera,
      description: "Manage photos",
    },
    {
      href: "/admin/dashboard/timeline",
      label: "Timeline",
      icon: Clock,
      description: "Manage timeline events",
    },
    {
      href: "/admin/dashboard/users",
      label: "Users",
      icon: Users,
      description: "User management",
    },
    {
      href: "/admin/dashboard/analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "Site analytics",
    },
    {
      href: "/admin/dashboard/settings",
      label: "Settings",
      icon: Settings,
      description: "System settings",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-500">
            Loading dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
  );
};

export default AdminLayout;
