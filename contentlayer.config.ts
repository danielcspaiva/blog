import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*/index.{md,mdx}',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    draft: { type: 'boolean', default: false },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    locale: { type: 'string', required: true },
    hideTableOfContents: { type: 'boolean', default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        // Extract slug from path: blog/hello-world/en/index.mdx -> hello-world
        const pathParts = doc._raw.flattenedPath.split('/');
        return pathParts[1]; // The post directory name
      },
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => {
        const time = readingTime(doc.body.raw);
        return Math.ceil(time.minutes).toString();
      },
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        const pathParts = doc._raw.flattenedPath.split('/');
        const slug = pathParts[1];
        return `/blog/${slug}`;
      },
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*/index.{md,mdx}',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    draft: { type: 'boolean', default: false },
    demoURL: { type: 'string' },
    repoURL: { type: 'string' },
    locale: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        const pathParts = doc._raw.flattenedPath.split('/');
        return pathParts[1];
      },
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        const pathParts = doc._raw.flattenedPath.split('/');
        const slug = pathParts[1];
        return `/projects/${slug}`;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog, Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
