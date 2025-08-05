import { NextRequest, NextResponse } from 'next/server';
import { GalleryAPI } from '@/lib/crud';

// GET /api/gallery - Get gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'All Photos';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const featured = searchParams.get('featured') === 'true';

    let images;
    if (featured) {
      images = await GalleryAPI.getFeaturedImages(limit);
    } else if (tags.length > 0) {
      images = await GalleryAPI.searchImages(tags);
    } else {
      images = await GalleryAPI.getImagesByCategory(category, page, limit);
    }

    const total = await GalleryAPI.count({ 
      ...(category !== 'All Photos' && { category }),
      ...(featured && { isFeatured: true }),
      isApproved: true
    });

    return NextResponse.json({
      success: true,
      data: images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

// POST /api/gallery - Upload a new image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { src, alt, category, uploadedBy } = body;
    if (!src || !alt || !category || !uploadedBy) {
      return NextResponse.json(
        { success: false, error: 'Image source, alt text, category, and uploader name are required' },
        { status: 400 }
      );
    }

    const image = await GalleryAPI.create(body);

    return NextResponse.json({
      success: true,
      data: image,
      message: 'Image uploaded successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
