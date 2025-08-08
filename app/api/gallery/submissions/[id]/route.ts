import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// PATCH /api/gallery/submissions/[id] - Approve or reject a submission
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action, adminNotes } = body; // action: 'approve' | 'reject'
    
    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be "approve" or "reject"' },
        { status: 400 }
      );
    }

    const submissionsFile = join(process.cwd(), 'data', 'submissions.json');
    
    if (!existsSync(submissionsFile)) {
      return NextResponse.json(
        { success: false, error: 'No submissions found' },
        { status: 404 }
      );
    }

    // Read existing submissions
    const data = await readFile(submissionsFile, 'utf-8');
    let submissions = JSON.parse(data);
    
    // Find the submission
    const submissionIndex = submissions.findIndex((sub: any) => sub.id === id);
    if (submissionIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
        { status: 404 }
      );
    }

    const submission = submissions[submissionIndex];
    
    if (action === 'approve') {
      // Move to approved gallery
      const approvedPhoto = {
        id: `photo_${Date.now()}`,
        title: submission.title,
        description: submission.description,
        imageUrl: submission.imageUrl,
        thumbnailUrl: submission.thumbnailUrl,
        category: submission.category,
        date: submission.date,
        location: submission.location,
        people: submission.people,
        isFeatured: false,
        isApproved: true,
        uploadedBy: submission.submitterName,
        approvedAt: new Date().toISOString(),
        adminNotes: adminNotes || ''
      };

      // In a real app, you'd add this to your main gallery database
      // For now, we'll add it to a separate approved photos file
      const approvedFile = join(process.cwd(), 'data', 'approved-photos.json');
      let approvedPhotos = [];
      
      try {
        if (existsSync(approvedFile)) {
          const approvedData = await readFile(approvedFile, 'utf-8');
          approvedPhotos = JSON.parse(approvedData);
        }
      } catch (error) {
        approvedPhotos = [];
      }

      approvedPhotos.push(approvedPhoto);
      await writeFile(approvedFile, JSON.stringify(approvedPhotos, null, 2));

      // Update submission status
      submissions[submissionIndex] = {
        ...submission,
        status: 'approved',
        approvedAt: new Date().toISOString(),
        adminNotes: adminNotes || '',
        galleryPhotoId: approvedPhoto.id
      };
    } else {
      // Reject submission
      submissions[submissionIndex] = {
        ...submission,
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        adminNotes: adminNotes || ''
      };
    }

    // Save updated submissions
    await writeFile(submissionsFile, JSON.stringify(submissions, null, 2));

    return NextResponse.json({
      success: true,
      data: submissions[submissionIndex],
      message: `Photo ${action}d successfully`
    });
    
  } catch (error) {
    console.error(`Error processing submission:`, error);
    return NextResponse.json(
      { success: false, error: `Failed to process submission` },
      { status: 500 }
    );
  }
}

// DELETE /api/gallery/submissions/[id] - Delete a submission
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const submissionsFile = join(process.cwd(), 'data', 'submissions.json');
    
    if (!existsSync(submissionsFile)) {
      return NextResponse.json(
        { success: false, error: 'No submissions found' },
        { status: 404 }
      );
    }

    // Read existing submissions
    const data = await readFile(submissionsFile, 'utf-8');
    let submissions = JSON.parse(data);
    
    // Find and remove the submission
    const initialLength = submissions.length;
    submissions = submissions.filter((sub: any) => sub.id !== id);
    
    if (submissions.length === initialLength) {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Save updated submissions
    await writeFile(submissionsFile, JSON.stringify(submissions, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Submission deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}
