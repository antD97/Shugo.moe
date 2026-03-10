import { ALTCHA_PAYLOAD_HEADER } from "@/lib/constants"
import { prisma } from "@/lib/prisma-client"
import { createChallenge, verifySolution } from "altcha-lib"
import { BetterAuthPlugin } from "better-auth"
import { APIError, createAuthEndpoint, createAuthMiddleware } from "better-auth/api"
import { z } from "zod"

const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY!

const altchaPlugin = {
  id: "altcha",

  rateLimit: [
    {
      pathMatcher: path => path === "/altcha",
      max: 10,
      window: 60, // seconds
    },
    {
      pathMatcher: path => path === "/sign-in/magic-link",
      max: 30,
      window: 60 * 60, // 60 minutes
    },
  ],

  endpoints: {
    getAltcha: createAuthEndpoint(
      "/altcha",
      { method: "GET" },
      async (ctx) => {
        try {
          const challenge = await createChallenge({
            hmacKey: ALTCHA_HMAC_KEY,
            maxNumber: 1_000_000, // altcha-lib default
            expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
          })
          return ctx.json(challenge)
        }
        catch (error) {
          console.error("Failed to generate challenge: ", error)
          return ctx.json({ error: "Failed to generate challenge" }, { status: 500 })
        }
      }),
  },

  hooks: {
    before: [
      {
        matcher: ctx => ctx.path === "/sign-in/magic-link",
        handler: createAuthMiddleware(async (ctx) => {
          const email = z.email().safeParse(ctx.body?.email)
          if (email.success) {
            const user = await prisma.user.findUnique({ where: { email: email.data.toLowerCase() } })
            // require altcha for new users
            if (!user) {
              const altchaPayload = ctx.headers?.get(ALTCHA_PAYLOAD_HEADER)
              if (!altchaPayload) {
                throw new APIError("BAD_REQUEST", { message: "User with that email address does not exist." })
              }
              if (!await verifySolution(altchaPayload, ALTCHA_HMAC_KEY)) {
                throw new APIError("FORBIDDEN", { message: "CAPTCHA verification failed or expired." })
              }
            }
            // require no altcha for existing users
            else {
              const altchaPayload = ctx.headers?.get(ALTCHA_PAYLOAD_HEADER)
              if (altchaPayload) {
                throw new APIError("BAD_REQUEST", { message: "A user with that email address already exists." })
              }
            }
          }
        }),
      },
    ],
  },
} satisfies BetterAuthPlugin

export { altchaPlugin }

