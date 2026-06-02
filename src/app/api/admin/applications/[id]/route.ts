import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticate } from '../route';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authorization header
  if (!authenticate(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { status, adminNotes } = body;

    // Check if application exists
    const existing = await prisma.application.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 444 });
    }

    // Build update payload
    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    // Update in SQLite database
    const updated = await prisma.application.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    console.error('Admin update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update application' },
      { status: 500 }
    );
  }
}
