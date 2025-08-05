import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GalleryImage from "@/lib/models/GalleryImage";
import { getAdminFromRequest } from "@/lib/admin-auth";

// Manual admin check for dynamic routes
function requireAdminForDynamicRoute(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  return null; // No error, proceed
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = requireAdminForDynamicRoute(request);
  if (authError) return authError;
  
  try {
    await dbConnect();

    const { id } = await params;
    const image = await GalleryImage.findById(id).lean();

    if (!image) {
      return NextResponse.json(
        { message: "Image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error("Admin gallery image fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch image" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = requireAdminForDynamicRoute(request);
  if (authError) return authError;
  
  try {
    await dbConnect();

    const body = await request.json();
    const { id: imageId } = await params;

    const updatedImage = await GalleryImage.findByIdAndUpdate(
      imageId,
      { ...body },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedImage) {
      return NextResponse.json(
        { message: "Image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Image updated successfully",
      image: updatedImage,
    });
  } catch (error) {
    console.error("Admin gallery image update error:", error);
    return NextResponse.json(
      { message: "Failed to update image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = requireAdminForDynamicRoute(request);
  if (authError) return authError;
  
  try {
    await dbConnect();

    const { id: imageId } = await params;

    const deletedImage = await GalleryImage.findByIdAndDelete(imageId);

    if (!deletedImage) {
      return NextResponse.json(
        { message: "Image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Admin gallery image delete error:", error);
    return NextResponse.json(
      { message: "Failed to delete image" },
      { status: 500 }
    );
  }
}
