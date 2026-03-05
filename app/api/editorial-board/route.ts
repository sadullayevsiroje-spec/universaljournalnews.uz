import { NextRequest, NextResponse } from 'next/server';
import editorialBoardData from '@/data/editorial-board.json';

// GET - Get all members (read from JSON)
export async function GET() {
  try {
    return NextResponse.json(editorialBoardData);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

// POST, PUT, DELETE - Not supported in production (read-only)
// These will work in development but data won't persist in production
export async function POST(request: NextRequest) {
  return NextResponse.json({ 
    error: 'Write operations not supported. Please use database in production.' 
  }, { status: 501 });
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ 
    error: 'Write operations not supported. Please use database in production.' 
  }, { status: 501 });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ 
    error: 'Write operations not supported. Please use database in production.' 
  }, { status: 501 });
}
