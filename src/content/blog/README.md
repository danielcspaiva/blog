# Blog Post Localization Guide

This directory contains localized blog posts for the website. Each post can be available in multiple languages by following this directory structure.

## Directory Structure

For a post with slug `example-post`, the directory structure should be:

```
blog/
├── example-post/
│   ├── en/
│   │   └── index.mdx    # English version
│   └── pt-br/
│       └── index.mdx    # Portuguese version
```

## Frontmatter Structure

Each post should have a frontmatter section like this:

```markdown
---
title: Post Title
description: Post description
date: 2023-01-01
tags: [tag1, tag2]
locale: en  # 'en' or 'pt-br'
---
```

The `locale` field is required and should match the language directory.

## Content Formatting

For consistent spacing and formatting across all blog posts, follow these guidelines:

1. Add a horizontal rule (---) after the frontmatter
2. All headings should start with ## (h2) as the page title is already an h1
3. Example of proper spacing:

```markdown
---
title: Post Title
description: Post description
date: 2023-01-01
tags: [tag1, tag2]
locale: en
---

---

## First Heading

Content starts here...
```

This ensures consistent spacing between the Table of Contents and the first heading.

## URL Structure

Posts will be accessible at:
- `/en/blog/example-post` (English version)
- `/pt-br/blog/example-post` (Portuguese version)

## Migration from Old Structure

To migrate existing posts:

1. Create a directory with the post slug name
2. Create language subdirectories (`en` and/or `pt-br`)
3. Place the appropriate markdown content in `index.mdx` in each language directory
4. Add the `locale` field to the frontmatter

## Fallbacks

If a post is not available in a specific language, it won't be listed in that language's blog index or accessible via URL. 