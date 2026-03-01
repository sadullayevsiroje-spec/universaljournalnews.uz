# Admin Panel Guide

## Overview
The admin panel provides a complete management interface for the Universal Journal News website.

## Features

### 1. Authentication
- Secure login with NextAuth.js
- Session-based authentication
- Protected admin routes

### 2. Dashboard
- Overview statistics (total articles, published, pending reviews, views)
- Quick action links to manage articles, users, and settings

### 3. Article Management
- View all articles in a table format
- Add new articles with full metadata
- Edit existing articles
- Delete articles
- Fields: title, authors, affiliation, abstract, keywords, pages, year, volume, issue

### 4. User Management
- View all users (authors, editors, reviewers, admins)
- Add new users
- Edit user roles and permissions
- Manage user status (active/inactive)

### 5. Settings
- Journal information (name, ISSN)
- Contact details (email, phone, address)
- Submission settings (email, review period, publication fee)

## Access

### Login Credentials (Development)
- URL: http://localhost:3000/admin/login
- Username: `ujnadmin`
- Password: `UJN2026secure!`

**IMPORTANT**: Change these credentials in production!

### Routes
- `/admin` - Dashboard (protected)
- `/admin/login` - Login page
- `/admin/articles` - Article management
- `/admin/articles/new` - Add new article
- `/admin/users` - User management
- `/admin/settings` - Journal settings

## Setup

### 1. Environment Variables
Create `.env.local` file:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
DATABASE_URL="file:./prisma/dev.db"
```

### 2. Generate Secret Key
```bash
openssl rand -base64 32
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access Admin Panel
Navigate to: http://localhost:3000/admin/login

## Production Deployment

### 1. Update Authentication
Replace the hardcoded credentials in `app/api/auth/[...nextauth]/route.ts` with database authentication:

```typescript
async authorize(credentials) {
  // Query database for user
  const user = await prisma.user.findUnique({
    where: { username: credentials?.username }
  });
  
  // Verify password with bcrypt
  if (user && await bcrypt.compare(credentials?.password, user.password)) {
    return { id: user.id, name: user.name, email: user.email };
  }
  return null;
}
```

### 2. Set Environment Variables
On Vercel or your hosting platform:
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `DATABASE_URL` - Your production database URL

### 3. Database Integration
Currently, the admin panel uses JSON files for articles. To integrate with Prisma:

1. Update article management to use Prisma queries
2. Create API routes for CRUD operations
3. Update forms to call API routes

Example API route (`app/api/articles/route.ts`):
```typescript
import { prisma } from '@/lib/prisma';

export async function GET() {
  const articles = await prisma.article.findMany({
    include: { authors: true, issue: true }
  });
  return Response.json(articles);
}

export async function POST(request: Request) {
  const data = await request.json();
  const article = await prisma.article.create({ data });
  return Response.json(article);
}
```

## Security Notes

1. **Change default credentials** before deploying to production
2. **Use strong NEXTAUTH_SECRET** (32+ characters)
3. **Enable HTTPS** in production
4. **Implement rate limiting** for login attempts
5. **Add CSRF protection** for forms
6. **Validate all inputs** on server side
7. **Use environment variables** for sensitive data

## Future Enhancements

1. **File Upload**: Add PDF upload functionality for articles
2. **Rich Text Editor**: Integrate editor for article abstracts
3. **Email Notifications**: Send emails on article submission/approval
4. **Review System**: Add peer review workflow
5. **Analytics**: Track article views and downloads
6. **Export**: Export articles to various formats (BibTeX, RIS, etc.)
7. **Multi-language**: Add support for multiple languages
8. **Roles & Permissions**: Granular access control

## Troubleshooting

### "Session not found" error
- Ensure `NEXTAUTH_SECRET` is set in `.env.local`
- Clear browser cookies and try again

### "Cannot find module 'next-auth'"
- Run `npm install` to install dependencies

### Middleware not protecting routes
- Check `middleware.ts` matcher configuration
- Ensure NextAuth is properly configured

### Database connection errors
- Verify `DATABASE_URL` in `.env.local`
- Run `npx prisma generate` to regenerate Prisma client

## Support

For issues or questions, contact: admin@universaljournalnews.uz
