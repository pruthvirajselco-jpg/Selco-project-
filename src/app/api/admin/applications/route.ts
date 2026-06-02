import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Password authentication helper for the API
export function authenticate(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  const expectedKey = process.env.ADMIN_SECRET_KEY || 'bamboo2026';
  return adminKey === expectedKey;
}

export async function GET(req: NextRequest) {
  // Check authorization header
  if (!authenticate(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Build query conditions
    const where: any = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { primaryDiscipline: { contains: search } },
        { cityState: { contains: search } },
      ];
    }

    // Fetch matching applications from SQLite
    const applications = await prisma.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    console.error('Admin fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
