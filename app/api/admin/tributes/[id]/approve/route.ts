import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Tribute from "@/lib/models/Tribute";
import { requireAdmin, AdminUser } from "@/lib/admin-auth";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Manual admin check since requireAdmin doesn't work with dynamic routes
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();

    const { id: tributeId } = await params;

    const tribute = await Tribute.findByIdAndUpdate(
      tributeId,
      { 
        isApproved: true,
        approvedAt: new Date(),
        approvedBy: "admin"
      },
      { new: true }
    );

    if (!tribute) {
      return NextResponse.json(
        { message: "Tribute not found" },
        { status: 404 }
      );
    }

    // Log admin action
    console.log(`Admin approved tribute ${tributeId} at ${new Date().toISOString()}`);

    return NextResponse.json({
      message: "Tribute approved successfully",
      tribute,
    });
  } catch (error) {
    console.error("Admin tribute approval error:", error);
    return NextResponse.json(
      { message: "Failed to approve tribute" },
      { status: 500 }
    );
  }
}
