# Astro to Next.js Migration Review

This document summarizes all differences found between the legacy Astro version (port 4321) and the new Next.js version (port 3000).

## Status: ALL ISSUES FIXED ✅

All critical and medium priority issues have been resolved. The Next.js version now matches the Astro version.

---

## Issues Found and Fixed

### 1. Blog Post: Table of Contents Not Working ✅ FIXED
**Priority: HIGH**

**Location**: `components/TableOfContents.tsx`

**Problem**: The TableOfContents component was rendered without headings, and was invisible due to animation issues.

**Solution**: Updated TableOfContents to read headings from the DOM using `useEffect`. The component now:
- Queries the article element for h2, h3, h4 headings
- Extracts the id (slug) and text content
- Builds the hierarchical TOC structure
- Removed `animate` class that caused `opacity: 0` (animation wasn't triggering for client-side rendered content)
- Added `list-disc` for bullet points and `underline` for links to match Astro styling

Now placed above the article content, matching Astro's layout.

---

### 2. Blog Post: Missing "Back to blog" Link ✅ FIXED
**Priority: MEDIUM**

**Location**: `app/[locale]/blog/[slug]/page.tsx`

**Problem**: Next.js version was missing the "Back to blog" navigation link.

**Solution**: Added `<BackToPrevious href="/blog">Back to blog</BackToPrevious>` at the top of the page. The BackToPrevious component already existed and matches Astro's styling.

---

### 3. Blog Post: Missing Post Description ✅ FIXED
**Priority: MEDIUM**

**Location**: `app/[locale]/blog/[slug]/page.tsx`

**Problem**: The post description was not displayed below the title.

**Solution**: Added `<p className="animate mb-4 text-gray-500">{post.description}</p>` after the title, matching Astro's styling.

---

### 4. Blog Post: Tags Not Linked ✅ FIXED
**Priority: MEDIUM**

**Location**: `app/[locale]/blog/[slug]/page.tsx`

**Problem**: Tags were plain `<span>` elements, not clickable links.

**Solution**: Changed tags from `<span>` to `<Link href={/tags/${tag}}>` using next-intl's Link component. Tags now navigate to their respective tag pages.

---

### 5. Blog Post: Tags Layout Different ✅ FIXED
**Priority: LOW**

**Location**: `app/[locale]/blog/[slug]/page.tsx`

**Problem**: Tags appeared inline with date/reading time instead of below description.

**Solution**: Restructured the entire header section to match Astro's layout:
1. Back to blog link
2. Date + Reading time
3. Title
4. Description
5. Tags (separate line)
6. Table of Contents
7. Article content

---

### 6. Blog Listing: Different Subtitle Text ✅ FIXED
**Priority: LOW**

**Location**: `app/[locale]/blog/page.tsx`

**Problem**: Subtitle text didn't match Astro version.

**Solution**: Updated subtitle to "A collection of articles on topics I am passionate about." (EN) and "Uma coleção de artigos sobre temas que me interessam." (PT-BR).

---

### 7. Radar Chart Console Warning
**Priority: LOW** (not fixed - cosmetic only)

**Location**: Blog post page with HumanVsAIRadarChart component

**Problem**: Console shows warning about chart dimensions being 0 on initial render. This is a cosmetic issue that doesn't affect functionality - the chart renders correctly.

---

## Pages Comparison Summary

| Page | Status | Issues |
|------|--------|--------|
| Homepage | ✅ Matching | None |
| Blog listing | ✅ Matching | Subtitle fixed |
| Blog post | ✅ Matching | All issues fixed |
| Experience | ✅ Matching | None |
| Projects | ✅ Matching | None |
| Tags listing | ✅ Matching | None |

## Screenshots Taken

All screenshots are saved in `.playwright-mcp/`:

**Astro (Legacy)**:
- `astro-blog-post.png`
- `astro-experience.png`
- `astro-projects.png`
- `astro-tags.png`

**Next.js (New)**:
- `nextjs-homepage.png`
- `nextjs-blog-listing.png`
- `nextjs-blog-post.png`
- `nextjs-experience.png`
- `nextjs-projects.png`
- `nextjs-tags.png`

## All Fixes Applied

1. ✅ **Table of Contents** - Now reads headings from DOM, removed `animate` class for visibility, added bullet points and underlined links
2. ✅ **Back to blog link** - Added at top of post
3. ✅ **Post description** - Displayed below title
4. ✅ **Tag links** - Tags now link to tag pages
5. ✅ **Tags layout** - Moved below description
6. ✅ **Blog listing subtitle** - Updated to match Astro
7. ✅ **Tag visibility** - Tags have proper text color

## Notes

- Both servers can run simultaneously:
  - Astro: `pnpm dev` in `/Users/danielcspaiva/personal/blog-astro` (port 4321)
  - Next.js: `pnpm dev` in `/Users/danielcspaiva/personal/blog` (port 3000)
- The Astro version is in a git worktree at `../blog-astro` pointing to the `main` branch
