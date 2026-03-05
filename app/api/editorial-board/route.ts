import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'editorial-board.json');

// GET - Get all members
export async function GET() {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    const members = JSON.parse(data);
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
    const data = fs.readFileSync(dataPath, 'utf-8');
    const members = JSON.parse(data);
    
    const newMember = {
      id: Date.now().toString(),
      name: body.name,
      position: body.position,
      affiliation: body.affiliation,
      email: body.email || null,
      photo: body.photo || null,
      bio: body.bio || null,
      order: members.length + 1
    };
    
    members.push(newMember);
    fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
    
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
    const data = fs.readFileSync(dataPath, 'utf-8');
    let members = JSON.parse(data);
    
    const index = members.findIndex((m: any) => m.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    
    members[index] = { ...members[index], ...body };
    fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
    
    return NextResponse.json(members[index]);
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
    
    const data = fs.readFileSync(dataPath, 'utf-8');
    let members = JSON.parse(data);
    
    members = members.filter((m: any) => m.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
