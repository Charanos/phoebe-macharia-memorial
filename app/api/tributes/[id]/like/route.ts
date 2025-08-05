import { NextRequest, NextResponse } from 'next/server';
import { TributeAPI } from '@/lib/crud';
import dbConnect from '@/lib/mongodb';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Tribute ID is required' },
        { status: 400 }
      );
    }

    const tribute = await TributeAPI.findById(id);
    
    if (!tribute) {
      return NextResponse.json(
        { success: false, error: 'Tribute not found' },
        { status: 404 }
      );
    }

    // Increment likes
    const currentLikes = (tribute as any).likes || 0;
    (tribute as any).likes = currentLikes + 1;
    await tribute.save();

    return NextResponse.json(
      { success: true, data: tribute },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error liking tribute:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to like tribute' },
      { status: 500 }
    );
  }
}
