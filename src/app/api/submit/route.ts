import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { applicationSchema } from '@/lib/validators';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body against full application schema
    const validatedData = applicationSchema.parse(body);

    // Check for duplicate email in database
    const existing = await prisma.application.findUnique({
      where: { email: validatedData.email },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'duplicate_email',
          message: 'We already have an application from this email. Contact us if you need to update it.',
        },
        { status: 409 }
      );
    }

    // Insert new application into SQLite database
    const newApplication = await prisma.application.create({
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      id: newApplication.id,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'validation_error',
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error('Submission error:', error);
    return NextResponse.json(
      { success: false, error: 'internal_error', message: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}
