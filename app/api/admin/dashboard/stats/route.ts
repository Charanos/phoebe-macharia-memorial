import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Tribute from "@/lib/models/Tribute";
import GalleryImage from "@/lib/models/GalleryImage";
import TimelineEvent from "@/lib/models/TimelineEvent";
import { requireAdmin } from "@/lib/admin-auth";

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    await dbConnect();

    // Get tribute statistics
    const [
      totalTributes,
      pendingTributes,
      approvedTributes,
      featuredTributes,
    ] = await Promise.all([
      Tribute.countDocuments(),
      Tribute.countDocuments({ isApproved: false }),
      Tribute.countDocuments({ isApproved: true }),
      Tribute.countDocuments({ isFeatured: true }),
    ]);

    // Get gallery statistics
    const [
      totalGalleryImages,
      recentGalleryImages,
    ] = await Promise.all([
      GalleryImage.countDocuments(),
      GalleryImage.countDocuments({
        createdAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      }),
    ]);

    // Get timeline statistics
    const [
      totalTimelineEvents,
      recentTimelineEvents,
    ] = await Promise.all([
      TimelineEvent.countDocuments(),
      TimelineEvent.countDocuments({
        createdAt: {
          $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      }),
    ]);

    // For visitor statistics, we'll use a simple approach for now
    // In a production environment, you'd want to implement proper analytics
    const stats = {
      tributes: {
        total: totalTributes,
        pending: pendingTributes,
        approved: approvedTributes,
        featured: featuredTributes,
      },
      gallery: {
        total: totalGalleryImages,
        recent: recentGalleryImages,
      },
      timeline: {
        total: totalTimelineEvents,
        recent: recentTimelineEvents,
      },
      visitors: {
        today: 0, // Placeholder - would need analytics implementation
        thisWeek: 0, // Placeholder - would need analytics implementation
        thisMonth: 0, // Placeholder - would need analytics implementation
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Admin dashboard stats error:", error);
    return NextResponse.json(
      { message: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
});
