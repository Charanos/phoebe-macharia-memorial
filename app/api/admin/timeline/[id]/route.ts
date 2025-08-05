import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TimelineEvent from "@/lib/models/TimelineEvent";
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
    const event = await TimelineEvent.findById(id).lean();

    if (!event) {
      return NextResponse.json(
        { message: "Timeline event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Admin timeline event fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch timeline event" },
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
    const { id: eventId } = await params;

    const updatedEvent = await TimelineEvent.findByIdAndUpdate(
      eventId,
      { ...body },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedEvent) {
      return NextResponse.json(
        { message: "Timeline event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Timeline event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Admin timeline event update error:", error);
    return NextResponse.json(
      { message: "Failed to update timeline event" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = requireAdminForDynamicRoute(request);
  if (authError) return authError;
  
  try {
    await dbConnect();

    const { id: eventId } = await params;

    const deletedEvent = await TimelineEvent.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return NextResponse.json(
        { message: "Timeline event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Timeline event deleted successfully",
    });
  } catch (error) {
    console.error("Admin timeline event delete error:", error);
    return NextResponse.json(
      { message: "Failed to delete timeline event" },
      { status: 500 }
    );
  }
}
