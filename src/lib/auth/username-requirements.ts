import type { BetterAuthPlugin } from "better-auth"
import { APIError, createAuthMiddleware } from "better-auth/api"

const usernameRequirementsPlugin = {
  id: "username-requirements",
  hooks: {
    before: [
      {
        matcher: ctx => ctx.path === "/sign-up/email" || ctx.path === "/update-user",
        handler: createAuthMiddleware(async (ctx) => {
          // username required on sign up
          if (ctx.path === "/sign-up/email" && !ctx.body?.username) {
            throw new APIError("BAD_REQUEST", { message: "Username is required." })
          }

          if (ctx.path === "/update-user" && ctx.body) {
            // username cannot be deleted
            if ("username" in ctx.body && !ctx.body.username) {
              throw new APIError("BAD_REQUEST", { message: "Username cannot be empty." })
            }

            // display name cannot be edited
            if ("name" in ctx.body || "displayUsername" in ctx.body) {
              throw new APIError("FORBIDDEN", { message: "Display name cannot be changed." })
            }
          }
        }),
      },
    ],
  },
} satisfies BetterAuthPlugin

export { usernameRequirementsPlugin }
