
import { z } from "zod"

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().optional(),
  content: z.string().min(2, "Content is required"),
  image: z.any(),
})


export type BlogPostFormData = z.infer<typeof blogPostSchema>
