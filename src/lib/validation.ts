import { Filter } from "bad-words"
import { z } from "zod"

const filter = new Filter()

function validateEmail(email: string): null | string {
  if (!z.email().safeParse(email).success) return "Email address is invalid."
  return null
}

function validateUsername(username: string): null | string {
  if (username.length < 3) return "Username must be at least 3 characters long."
  if (username.length > 32) return "Username can be at most 32 characters long."
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) return "Username can only contain letters, numbers, hyphens, and underscores."
  if (filter.isProfane(username)) return "Username contains profanity."
  return null
}

function validatePassword(password: string): null | string {
  if (password.length < 8) return "Password must be at least 8 characters long."
  if (password.length > 128) return "Password can be at most 128 characters long."
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase character."
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase character."
  if (!/[0-9]/.test(password)) return "Password must contain at least one number."
  return null
}

export { validateEmail, validatePassword, validateUsername }
