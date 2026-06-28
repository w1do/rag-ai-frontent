import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const possibilitiesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "src/content/possibilities" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    icon: z.string().optional(),
    features: z.array(z.string()).optional(),
    category: z.string().default('AI Solutions'),
    order: z.number().default(0),
    benefits: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().default('fa-solid fa-hand-point-right'),
    })).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    whatWeDo: z.string().optional(),
    whatWeDoList: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'possibilities': possibilitiesCollection,
};
