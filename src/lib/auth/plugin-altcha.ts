import { createChallenge, verifySolution } from "altcha-lib"
import { BetterAuthPlugin } from "better-auth"
import { APIError, createAuthEndpoint, createAuthMiddleware } from "better-auth/api"

const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY!
const ALTCHA_PAYLOAD_HEADER = "x-altcha-payload"

const altchaPlugin = {
  id: "altcha",

  rateLimit: [
    {
      pathMatcher: path => path === "/altcha",
      max: 10,
      window: 60, // seconds
    },
  ],

  endpoints: {
    getHelloWorld: createAuthEndpoint(
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
        matcher: ctx => ctx.path === "/sign-up/email",
        handler: createAuthMiddleware(async (ctx) => {
          const altchaPayload = ctx.headers?.get(ALTCHA_PAYLOAD_HEADER)

          if (!altchaPayload) {
            throw new APIError("BAD_REQUEST", { message: "CAPTCHA payload is missing." })
          }

          if (!await verifySolution(altchaPayload, ALTCHA_HMAC_KEY)) {
            throw new APIError("FORBIDDEN", { message: "CAPTCHA verification failed or expired." })
          }
        }),
      },
    ],
  },
} satisfies BetterAuthPlugin

export { altchaPlugin, ALTCHA_PAYLOAD_HEADER }
