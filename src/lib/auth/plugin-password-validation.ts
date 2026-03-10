import { validatePassword } from "@/lib/validation"
import type { BetterAuthPlugin } from "better-auth"
import { APIError, createAuthMiddleware } from "better-auth/api"

const passwordValidationPlugin = {
  id: "password-validation",
  hooks: {
    before: [
      {
        matcher: ctx => ctx.path === "/sign-up/email",
        handler: createAuthMiddleware(async (ctx) => {
          const password = ctx.body?.password
          if (password) {
            const validationError = validatePassword(password)
            if (validationError) throw new APIError("BAD_REQUEST", { message: validationError })
          }
        }),
      },
    ],
  },
} satisfies BetterAuthPlugin

export { passwordValidationPlugin }
