import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        authors: {
          include: {
            author: true
          },
          orderBy: {
            order: 'asc'
          }
        },
        issue: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });
    
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error reading articles:', error);
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, abstract, keywords, authors, affiliation, pdfUrl, publishedAt, issueId, slug } = body;
    
    // Create article
    const article = await prisma.article.create({
      data: {
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title,
        abstract: abstract || null,
        keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
        pdfUrl: pdfUrl || null,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        issueId: issueId || null
      }
    });
    
    // Create authors and link them
    if (authors && Array.isArray(authors)) {
      for (let i = 0; i < authors.length; i++) {
        const authorName = authors[i];
        
        // Create author
        const author = await prisma.author.create({
          data: {
            fullName: authorName,
            affiliation: affiliation || null
          }
        });
        
        // Link author to article
        await prisma.articleAuthor.create({
          data: {
            articleId: article.id,
            authorId: author.id,
            order: i + 1
          }
        });
      }
    }
    
    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { slug } = await request.json();
    
    await prisma.article.delete({
      where: { slug }
    });
    
    return NextResponse.json({ success: true, message: 'Article deleted' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, abstract, keywords, pdfUrl, publishedAt } = body;
    
    const article = await prisma.article.update({
      where: { slug },
      data: {
        title,
        abstract: abstract || null,
        keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
        pdfUrl: pdfUrl || null,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined
      }
    });
    
    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}
