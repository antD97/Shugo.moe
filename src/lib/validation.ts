import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity"
import { z } from "zod"

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
})

const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long.")
  .max(32, "Username can be at most 32 characters long.")
  .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores.")
  .refine(username => !matcher.hasMatch(username), "Username contains profanity.")

export { usernameSchema }
