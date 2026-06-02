import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Determine upload type for size check
    const uploadType = formData.get('type') as string || 'creative';
    const maxSize = uploadType === 'cv' ? 10 * 1024 * 1024 : 50 * 1024 * 1024; // 10MB or 50MB

    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `File size exceeds the limit (${maxSize / (1024 * 1024)}MB)` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Write file to local public directory
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, new Uint8Array(buffer));

    // Return the accessible public URL
    const url = `/uploads/${filename}`;

    return NextResponse.json({ success: true, url });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during file upload' },
      { status: 500 }
    );
  }
}
