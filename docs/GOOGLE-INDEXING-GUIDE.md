# Google Indexing Guide - UJN

## Current Status
✅ Sitemap configured: https://universaljournalnews.uz/sitemap.xml
✅ Robots.txt configured: https://universaljournalnews.uz/robots.txt
✅ Google Scholar meta tags added to all articles
✅ Canonical URLs set for all pages
✅ OpenGraph meta tags configured

## Why Articles Don't Appear in Search Yet

Google indexing takes time:
- **New websites**: 2-4 weeks for first indexing
- **New articles**: 1-2 weeks after submission
- **Google Scholar**: Can take 2-6 months for academic content

## Steps to Speed Up Indexing

### 1. Submit to Google Search Console

1. Go to: https://search.google.com/search-console
2. Add property: `universaljournalnews.uz`
3. Verify ownership (DNS or HTML file method)
4. Submit sitemap: `https://universaljournalnews.uz/sitemap.xml`

### 2. Request Indexing for Each Article

In Google Search Console:
1. Go to "URL Inspection" tool
2. Enter article URL: `https://universaljournalnews.uz/articles/[slug]`
3. Click "Request Indexing"
4. Repeat for all 5 articles:
   - https://universaljournalnews.uz/articles/Article-1
   - https://universaljournalnews.uz/articles/Article-2
   - https://universaljournalnews.uz/articles/Article-3
   - https://universaljournalnews.uz/articles/Article-4
   - https://universaljournalnews.uz/articles/Article-5

### 3. Check Current Indexing Status

Test if Google can see your pages:
```
site:universaljournalnews.uz
```

Check specific article:
```
site:universaljournalnews.uz/articles/Article-1
```

### 4. Submit to Google Scholar

Google Scholar has specific requirements:
- ✅ PDF files must be publicly accessible
- ✅ Meta tags must include citation_pdf_url
- ✅ Articles must have proper academic format
- ✅ Author names and affiliations required

Google Scholar crawls automatically but you can help:
1. Ensure all PDFs are in `/public/pdf/` folder
2. Check PDF URLs work: `https://universaljournalnews.uz/pdf/Article-1.pdf`
3. Wait 2-6 months for Google Scholar indexing

### 5. Build Backlinks

Help Google find your site faster:
- Share articles on social media
- Submit to academic directories (DOAJ, ResearchGate)
- Link from other websites
- Add to university/institution websites

## Verify Your Setup

### Check Sitemap
Visit: https://universaljournalnews.uz/sitemap.xml
Should show all pages and articles

### Check Robots.txt
Visit: https://universaljournalnews.uz/robots.txt
Should allow all crawlers

### Check Article Meta Tags
1. Open any article page
2. Right-click → "View Page Source"
3. Look for these meta tags:
   - `<meta name="citation_title">`
   - `<meta name="citation_pdf_url">`
   - `<meta name="citation_author">`
   - `<link rel="canonical">`

## Common Issues

### Issue: "Site not indexed after 2 weeks"
**Solution**: Submit sitemap to Google Search Console and request indexing

### Issue: "Articles show in Google but not Google Scholar"
**Solution**: Google Scholar is slower. Ensure PDFs are accessible and wait 2-6 months

### Issue: "PDF links don't work"
**Solution**: Check that PDF files exist in `/public/pdf/` folder

### Issue: "Wrong information in search results"
**Solution**: Update meta tags and request re-indexing in Search Console

## Monitoring Progress

Check weekly:
1. Google Search Console → Coverage report
2. Search: `site:universaljournalnews.uz`
3. Check article views in analytics

## Timeline Expectations

- **Week 1-2**: Sitemap submitted, waiting for first crawl
- **Week 2-4**: Homepage and main pages indexed
- **Week 4-8**: All articles indexed in Google Search
- **Month 2-6**: Articles appear in Google Scholar

## Need Help?

If articles still don't appear after 4 weeks:
1. Check Google Search Console for errors
2. Verify all PDFs are accessible
3. Ensure no robots.txt blocking
4. Check for manual penalties in Search Console

---

Last Updated: March 3, 2026
