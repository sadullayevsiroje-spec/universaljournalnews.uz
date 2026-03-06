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
    
    // Transform to match expected format
    const transformedArticles = articles.map(article => ({
      slug: article.slug,
      title: article.title,
      authors: article.authors.map(a => a.author.fullName),
      publishedAt: article.publishedAt?.toISOString().split('T')[0] || '',
      pages: article.pages || '',
      doi: article.doi || '',
      abstract: article.abstract,
      keywords: article.keywords,
      pdfUrl: article.pdfUrl,
      issue: article.issue ? {
        year: article.issue.year,
        volume: article.issue.volume,
        number: article.issue.number
      } : null
    }));
    
    return NextResponse.json(transformedArticles);
  } catch (error) {
    console.error('Error reading articles:', error);
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, abstract, keywords, authors, affiliation, pdfUrl, pdfSlug, publishedAt, published, issue, slug, doi, pages } = body;
    
    // Find or create issue
    let issueId = null;
    if (issue && issue.year && issue.volume && issue.number) {
      let issueRecord = await prisma.issue.findFirst({
        where: {
          year: issue.year,
          volume: issue.volume,
          number: issue.number
        }
      });
      
      if (!issueRecord) {
        issueRecord = await prisma.issue.create({
          data: {
            year: issue.year,
            volume: issue.volume,
            number: issue.number,
            publishedAt: publishedAt ? new Date(publishedAt) : new Date()
          }
        });
      }
      
      issueId = issueRecord.id;
    }
    
    // Create article
    const article = await prisma.article.create({
      data: {
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title,
        abstract: abstract || null,
        keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
        doi: doi || null,
        pages: pages || null,
        pdfUrl: pdfSlug ? `/pdf/${pdfSlug}` : (pdfUrl || null),
        publishedAt: publishedAt ? new Date(publishedAt) : (published ? new Date(published) : new Date()),
        issueId: issueId
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
    const { slug, title, abstract, keywords, authors, affiliation, pdfUrl, publishedAt, issue, doi, pages } = body;
    
    // Find or create issue
    let issueId = null;
    if (issue && issue.year && issue.volume && issue.number) {
      let issueRecord = await prisma.issue.findFirst({
        where: {
          year: issue.year,
          volume: issue.volume,
          number: issue.number
        }
      });
      
      if (!issueRecord) {
        issueRecord = await prisma.issue.create({
          data: {
            year: issue.year,
            volume: issue.volume,
            number: issue.number,
            publishedAt: publishedAt ? new Date(publishedAt) : new Date()
          }
        });
      }
      
      issueId = issueRecord.id;
    }
    
    // Update article
    const article = await prisma.article.update({
      where: { slug },
      data: {
        title,
        abstract: abstract || null,
        keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
        doi: doi || null,
        pages: pages || null,
        pdfUrl: pdfUrl || null,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        issueId: issueId
      }
    });
    
    // Update authors - delete old ones and create new ones
    if (authors && Array.isArray(authors)) {
      // Delete old author links
      await prisma.articleAuthor.deleteMany({
        where: { articleId: article.id }
      });
      
      // Create new authors and link them
      for (let i = 0; i < authors.length; i++) {
        const authorName = authors[i];
        
        // Try to find existing author or create new one
        let author = await prisma.author.findFirst({
          where: { fullName: authorName }
        });
        
        if (!author) {
          author = await prisma.author.create({
            data: {
              fullName: authorName,
              affiliation: affiliation || null
            }
          });
        }
        
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
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}
