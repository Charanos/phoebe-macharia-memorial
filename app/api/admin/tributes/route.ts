import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Tribute from "@/lib/models/Tribute";
import { requireAdmin } from "@/lib/admin-auth";

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search") || "";

    let query: any = {};

    // Filter by status
    if (status === "pending") {
      query.isApproved = false;
    } else if (status === "approved") {
      query.isApproved = true;
    } else if (status === "featured") {
      query.isFeatured = true;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
        { relationship: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [tributes, total] = await Promise.all([
      Tribute.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Tribute.countDocuments(query),
    ]);

    return NextResponse.json({
      tributes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin tributes fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch tributes" },
      { status: 500 }
    );
  }
});
