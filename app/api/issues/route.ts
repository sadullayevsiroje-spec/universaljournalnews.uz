import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'issues.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const issues = JSON.parse(fileContents);
    
    return NextResponse.json(issues);
  } catch (error) {
    console.error('Error reading issues:', error);
    return NextResponse.json({ error: 'Failed to load issues' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newIssue = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'issues.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const issues = JSON.parse(fileContents);
    
    // Check if issue already exists
    const exists = issues.some((issue: any) => 
      issue.year === newIssue.year && 
      issue.volume === newIssue.volume && 
      issue.issue === newIssue.issue
    );
    
    if (exists) {
      return NextResponse.json({ error: 'Issue already exists' }, { status: 400 });
    }
    
    issues.push(newIssue);
    
    fs.writeFileSync(filePath, JSON.stringify(issues, null, 2));
    
    return NextResponse.json({ success: true, issue: newIssue });
  } catch (error) {
    console.error('Error creating issue:', error);
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedIssue = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'issues.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    let issues = JSON.parse(fileContents);
    
    const index = issues.findIndex((issue: any) => 
      issue.year === updatedIssue.oldYear && 
      issue.volume === updatedIssue.oldVolume && 
      issue.issue === updatedIssue.oldIssue
    );
    
    if (index !== -1) {
      issues[index] = {
        year: updatedIssue.year,
        volume: updatedIssue.volume,
        issue: updatedIssue.issue,
        title: updatedIssue.title,
        publishedAt: updatedIssue.publishedAt,
        articles: issues[index].articles || []
      };
      
      fs.writeFileSync(filePath, JSON.stringify(issues, null, 2));
      return NextResponse.json({ success: true, issue: issues[index] });
    }
    
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating issue:', error);
    return NextResponse.json({ error: 'Failed to update issue' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { year, volume, issue } = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'issues.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    let issues = JSON.parse(fileContents);
    
    issues = issues.filter((i: any) => 
      !(i.year === year && i.volume === volume && i.issue === issue)
    );
    
    fs.writeFileSync(filePath, JSON.stringify(issues, null, 2));
    
    return NextResponse.json({ success: true, message: 'Issue deleted' });
  } catch (error) {
    console.error('Error deleting issue:', error);
    return NextResponse.json({ error: 'Failed to delete issue' }, { status: 500 });
  }
}
