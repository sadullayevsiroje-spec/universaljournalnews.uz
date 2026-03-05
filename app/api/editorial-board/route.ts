import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get all members
export async function GET() {
  try {
    const members = await prisma.editorialBoard.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

// POST - Add new member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const lastMember = await prisma.editorialBoard.findFirst({
      orderBy: { order: 'desc' }
    });
    
    const newMember = await prisma.editorialBoard.create({
      data: {
        name: body.name,
        position: body.position,
        affiliation: body.affiliation,
        email: body.email || null,
        photo: body.photo || null,
        bio: body.bio || null,
        order: (lastMember?.order || 0) + 1
      }
    });
    
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}

// PUT - Update member
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const updatedMember = await prisma.editorialBoard.update({
      where: { id: body.id },
      data: {
        name: body.name,
        position: body.position,
        affiliation: body.affiliation,
        email: body.email || null,
        photo: body.photo || null,
        bio: body.bio || null
      }
    });
    
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

// DELETE - Delete member
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    await prisma.editorialBoard.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
