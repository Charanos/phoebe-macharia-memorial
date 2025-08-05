import { NextRequest, NextResponse } from 'next/server';
import { TributeAPI } from '@/lib/crud';

// GET /api/tributes - Get all approved tributes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const featured = searchParams.get('featured') === 'true';
    
    let tributes;
    let total;
    
    if (featured) {
      tributes = await TributeAPI.getFeaturedTributes(limit);
      total = await TributeAPI.count({ isApproved: true, isFeatured: true, isPrivate: false });
    } else {
      tributes = await TributeAPI.getApprovedTributes(page, limit);
      total = await TributeAPI.count({ isApproved: true, isPrivate: false });
    }

    return NextResponse.json({
      success: true,
      data: tributes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching tributes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tributes' },
      { status: 500 }
    );
  }
}

// POST /api/tributes - Create a new tribute
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, relationship, message } = body;
    if (!name || !relationship || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, relationship, and message are required' },
        { status: 400 }
      );
    }

    const tribute = await TributeAPI.create({
      ...body,
      isApproved: false, // Requires approval by default
    });

    return NextResponse.json({
      success: true,
      data: tribute,
      message: 'Tribute submitted successfully. It will be reviewed before being published.',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating tribute:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create tribute' },
      { status: 500 }
    );
  }
}
