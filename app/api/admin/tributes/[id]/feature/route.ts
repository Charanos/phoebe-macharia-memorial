import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Tribute from "@/lib/models/Tribute";
import { getAdminFromRequest } from "@/lib/admin-auth";

// Manual admin check for dynamic routes
function requireAdminForDynamicRoute(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  return null; // No error, proceed
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = requireAdminForDynamicRoute(request);
  if (authError) return authError;
  
  try {
    await dbConnect();

    const { id: tributeId } = await params;

    // Get the current tribute to check its featured status
    const tribute = await Tribute.findById(tributeId);
    if (!tribute) {
      return NextResponse.json(
        { message: "Tribute not found" },
        { status: 404 }
      );
    }

    // Toggle the featured status
    const updatedTribute = await Tribute.findByIdAndUpdate(
      tributeId,
      { isFeatured: !tribute.isFeatured },
      { new: true }
    );

    // Log admin action
    console.log(`Admin ${updatedTribute?.isFeatured ? 'featured' : 'unfeatured'} tribute ${tributeId} at ${new Date().toISOString()}`);

    return NextResponse.json({
      message: `Tribute ${updatedTribute?.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      tribute: updatedTribute,
    });
  } catch (error) {
    console.error("Admin tribute feature error:", error);
    return NextResponse.json(
      { message: "Failed to update tribute feature status" },
      { status: 500 }
    );
  }
}
