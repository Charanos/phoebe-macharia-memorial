import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Tribute from "@/lib/models/Tribute";
import GalleryImage from "@/lib/models/GalleryImage";
import TimelineEvent from "@/lib/models/TimelineEvent";
import { requireAdmin } from "@/lib/admin-auth";

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    await dbConnect();

    // Get recent tributes for activity feed
    const recentTributes = await Tribute.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name createdAt isApproved")
      .lean();

    // Get recent gallery images
    const recentGalleryImages = await GalleryImage.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("alt uploadedBy createdAt")
      .lean();

    // Get recent timeline events
    const recentTimelineEvents = await TimelineEvent.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .select("title createdAt")
      .lean();

    // Transform to activity format
    const tributeActivities = recentTributes.map((tribute) => ({
      id: tribute._id,
      type: "tribute",
      action: tribute.isApproved ? "Tribute approved" : "New tribute submitted",
      user: tribute.name,
      time: getRelativeTime(new Date(tribute.createdAt)),
      status: tribute.isApproved ? "approved" : "pending",
    }));

    const galleryActivities = recentGalleryImages.map((image) => ({
      id: image._id,
      type: "gallery",
      action: "Photo uploaded",
      user: image.uploadedBy,
      time: getRelativeTime(new Date(image.createdAt)),
      status: "approved",
    }));

    const timelineActivities = recentTimelineEvents.map((event) => ({
      id: event._id,
      type: "timeline",
      action: "Timeline event added",
      user: "Admin",
      time: getRelativeTime(new Date(event.createdAt)),
      status: "approved",
    }));

    const allActivities = [...tributeActivities, ...galleryActivities, ...timelineActivities]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10);

    return NextResponse.json({ activity: allActivities });
  } catch (error) {
    console.error("Admin dashboard activity error:", error);
    return NextResponse.json(
      { message: "Failed to fetch dashboard activity" },
      { status: 500 }
    );
  }
});

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return `${Math.floor(diffInSeconds / 2592000)} months ago`;
}
