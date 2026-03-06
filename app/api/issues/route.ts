import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        articles: true
      },
      orderBy: [
        { year: 'desc' },
        { volume: 'desc' },
        { number: 'desc' }
      ]
    });
    
    const formatted = issues.map(issue => ({
      id: issue.id,
      year: issue.year,
      volume: issue.volume,
      issue: issue.number,
      title: issue.title,
      publishedAt: issue.publishedAt?.toISOString().split('T')[0],
      articles: issue.articles.map(a => ({ slug: a.slug }))
    }));
    
    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error reading issues:', error);
    return NextResponse.json({ error: 'Failed to load issues' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { year, volume, issue, title, publishedAt } = body;
    
    // Check if issue already exists
    const exists = await prisma.issue.findFirst({
      where: {
        year,
        volume,
        number: issue
      }
    });
    
    if (exists) {
      return NextResponse.json({ error: 'Issue already exists' }, { status: 400 });
    }
    
    const newIssue = await prisma.issue.create({
      data: {
        year,
        volume,
        number: issue,
        title,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date()
      }
    });
    
    return NextResponse.json({ success: true, issue: newIssue });
  } catch (error) {
    console.error('Error creating issue:', error);
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, year, volume, issue, title, publishedAt } = body;
    
    const updatedIssue = await prisma.issue.update({
      where: { id },
      data: {
        year,
        volume,
        number: issue,
        title,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined
      }
    });
    
    return NextResponse.json({ success: true, issue: updatedIssue });
  } catch (error) {
    console.error('Error updating issue:', error);
    return NextResponse.json({ error: 'Failed to update issue' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    await prisma.issue.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true, message: 'Issue deleted' });
  } catch (error) {
    console.error('Error deleting issue:', error);
    return NextResponse.json({ error: 'Failed to delete issue' }, { status: 500 });
  }
}
