import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const PUBLICATIONS_PATH = "src/data/publications";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${PUBLICATIONS_PATH}` }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    pubDate: z.date(),
    tldr: z.string().optional(),
    abstract: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    links: z
      .object({
        pdf: z.string().url().optional(),
        arxiv: z.string().url().optional(),
        code: z.string().url().optional(),
        project: z.string().url().optional(),
        doi: z.string().url().optional(),
        slides: z.string().url().optional(),
      })
      .optional(),
    featured: z.boolean().optional(),
    highlight: z.boolean().optional(),
    highlightLabel: z.string().optional(), // e.g. "Oral", "Spotlight", "Best Paper"
  }),
});

export const collections = { blog, publications };
