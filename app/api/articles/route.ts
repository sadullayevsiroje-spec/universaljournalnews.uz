import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'articles.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const articles = JSON.parse(fileContents);
    
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error reading articles:', error);
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newArticle = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'articles.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const articles = JSON.parse(fileContents);
    
    articles.push(newArticle);
    
    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
    
    return NextResponse.json({ success: true, article: newArticle });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { slug } = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'articles.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    let articles = JSON.parse(fileContents);
    
    articles = articles.filter((article: any) => article.slug !== slug);
    
    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
    
    return NextResponse.json({ success: true, message: 'Article deleted' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedArticle = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'articles.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    let articles = JSON.parse(fileContents);
    
    const index = articles.findIndex((article: any) => article.slug === updatedArticle.slug);
    if (index !== -1) {
      articles[index] = updatedArticle;
      fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
      return NextResponse.json({ success: true, article: updatedArticle });
    }
    
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}
