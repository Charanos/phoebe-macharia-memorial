import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TimelineEvent from "@/lib/models/TimelineEvent";
import { requireAdmin } from "@/lib/admin-auth";

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all"; // all, public, private

    let query: any = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by status
    if (status === "public") {
      query.isPublic = true;
    } else if (status === "private") {
      query.isPublic = false;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      TimelineEvent.find(query)
        .sort({ year: -1, order: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      TimelineEvent.countDocuments(query),
    ]);

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin timeline fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch timeline events" },
      { status: 500 }
    );
  }
});

export const POST = requireAdmin(async (request: NextRequest) => {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate required fields
    if (!body.year || !body.title || !body.description || !body.category) {
      return NextResponse.json(
        { message: "Year, title, description, and category are required" },
        { status: 400 }
      );
    }

    const newEvent = new TimelineEvent({
      ...body,
    });

    const savedEvent = await newEvent.save();

    return NextResponse.json({
      message: "Timeline event added successfully",
      event: savedEvent,
    });
  } catch (error) {
    console.error("Admin timeline create error:", error);
    return NextResponse.json(
      { message: "Failed to add timeline event" },
      { status: 500 }
    );
  }
});
