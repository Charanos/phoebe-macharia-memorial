import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GalleryImage from "@/lib/models/GalleryImage";
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
    if (category && category !== "All Photos") {
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
        { alt: { $regex: search, $options: "i" } },
        { caption: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
      GalleryImage.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      GalleryImage.countDocuments(query),
    ]);

    return NextResponse.json({
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin gallery fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
});

export const POST = requireAdmin(async (request: NextRequest) => {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate required fields
    if (!body.src || !body.alt) {
      return NextResponse.json(
        { message: "Image source and alt text are required" },
        { status: 400 }
      );
    }

    const newImage = new GalleryImage({
      ...body,
      uploadedBy: "admin", // In a real implementation, you'd get this from auth
    });

    const savedImage = await newImage.save();

    return NextResponse.json({
      message: "Image added successfully",
      image: savedImage,
    });
  } catch (error) {
    console.error("Admin gallery create error:", error);
    return NextResponse.json(
      { message: "Failed to add image" },
      { status: 500 }
    );
  }
});
