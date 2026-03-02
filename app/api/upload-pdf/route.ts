import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/pdf folder
    const filename = file.name;
    const filepath = path.join(process.cwd(), 'public', 'pdf', filename);
    
    await writeFile(filepath, buffer);
    
    return NextResponse.json({ 
      success: true, 
      filename: filename,
      path: `/pdf/${filename}`
    });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    return NextResponse.json({ error: 'Failed to upload PDF' }, { status: 500 });
  }
}
