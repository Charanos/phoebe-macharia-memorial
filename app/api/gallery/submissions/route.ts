import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// POST /api/gallery/submissions - Submit a new photo for approval
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { 
      title, 
      imageData, 
      fileName, 
      submitterName, 
      submitterEmail,
      category = 'memories'
    } = body;
    
    if (!title || !imageData || !fileName || !submitterName || !submitterEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate image data format
    if (!imageData.startsWith('data:image/')) {
      return NextResponse.json(
        { success: false, error: 'Invalid image data format' },
        { status: 400 }
      );
    }

    // Extract base64 data and file extension
    const matches = imageData.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.json(
        { success: false, error: 'Invalid image data format' },
        { status: 400 }
      );
    }

    const [, fileExtension, base64Data] = matches;
    const buffer = Buffer.from(base64Data, 'base64');

    // Create unique filename
    const timestamp = Date.now();
    const uniqueFileName = `submission_${timestamp}_${fileName}`;
    
    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'submissions');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Save file
    const filePath = join(uploadsDir, uniqueFileName);
    await writeFile(filePath, buffer);

    // Create submission record
    const submission = {
      id: `submission_${timestamp}`,
      title,
      description: body.description || '',
      imageUrl: `/uploads/submissions/${uniqueFileName}`,
      thumbnailUrl: `/uploads/submissions/${uniqueFileName}`, // In production, you'd generate thumbnails
      category,
      date: body.date || new Date().toISOString().split('T')[0],
      location: body.location || '',
      people: body.people || [],
      submitterName,
      submitterEmail,
      submittedAt: new Date().toISOString(),
      isApproved: false,
      isFeatured: false,
      status: 'pending'
    };

    // In a real application, you would save this to a database
    // For now, we'll save to a JSON file for demonstration
    const submissionsFile = join(process.cwd(), 'data', 'submissions.json');
    
    // Ensure data directory exists
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Read existing submissions or create empty array
    let submissions = [];
    try {
      const { readFile } = await import('fs/promises');
      const existingData = await readFile(submissionsFile, 'utf-8');
      submissions = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist or is invalid, start with empty array
      submissions = [];
    }

    // Add new submission
    submissions.push(submission);

    // Save updated submissions
    await writeFile(submissionsFile, JSON.stringify(submissions, null, 2));

    return NextResponse.json({
      success: true,
      data: submission,
      message: 'Photo submitted successfully and is pending approval',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error submitting photo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit photo' },
      { status: 500 }
    );
  }
}

// GET /api/gallery/submissions - Get pending submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd check admin authentication here
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    
    const submissionsFile = join(process.cwd(), 'data', 'submissions.json');
    
    let submissions = [];
    try {
      const { readFile } = await import('fs/promises');
      const data = await readFile(submissionsFile, 'utf-8');
      submissions = JSON.parse(data);
    } catch (error) {
      // File doesn't exist, return empty array
      return NextResponse.json({
        success: true,
        data: [],
        total: 0
      });
    }

    // Filter by status if specified
    const filteredSubmissions = status === 'all' 
      ? submissions 
      : submissions.filter((sub: any) => sub.status === status);

    return NextResponse.json({
      success: true,
      data: filteredSubmissions,
      total: filteredSubmissions.length
    });
    
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
