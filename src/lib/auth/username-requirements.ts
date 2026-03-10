import { auth } from "@/lib/auth/auth"
import type { BetterAuthPlugin } from "better-auth"
import { APIError, createAuthMiddleware } from "better-auth/api"

const usernameRequirementsPlugin = {
  id: "require-username",
  hooks: {
    before: [
      {
        matcher: ctx => ctx.path === "/sign-up/email" || ctx.path === "/update-user",
        handler: createAuthMiddleware(async (ctx) => {
          if (ctx.path === "/sign-up/email" || ctx.path === "/update-user") {
            if (!ctx.body || !ctx.body.username) {
              throw new APIError("BAD_REQUEST", { message: "Username is required." })
            }
            if (typeof ctx.body.username === "string") {
              const response = await auth.api.isUsernameAvailable({ body: { username: ctx.body.username } })
              if (!response?.available) throw new APIError("CONFLICT", { message: "Username is taken." })
            }
          }
        }),
      },
    ],
  },
} satisfies BetterAuthPlugin

export { usernameRequirementsPlugin }
