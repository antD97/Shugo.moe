import { ALTCHA_PAYLOAD_HEADER } from "@/lib/constants"
import { prisma } from "@/lib/prisma-client"
import { usernameSchema } from "@/lib/validation"
import { createChallenge, verifySolution } from "altcha-lib"
import { BetterAuthPlugin } from "better-auth"
import { APIError, createAuthEndpoint, createAuthMiddleware, getSessionFromCtx } from "better-auth/api"
import { z } from "zod"

const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY!
const ALTCHA_EXPIRE_TIME = 5 * 60 * 1000 // 5 minutes

const shugoPlugin = {
  id: "shugo",

  rateLimit: [
    {
      pathMatcher: path => path === "/altcha",
      max: 2,
      window: 60, // 2 per minute
    },
    {
      pathMatcher: path => path === "/sign-in/magic-link",
      max: 2,
      window: 60, // 2 per minute
    },
    {
      pathMatcher: path => path === "/sign-in/magic-link",
      max: 5,
      window: 60 * 60, // 5 per hour
    },
    {
      pathMatcher: path => path === "/sign-in/magic-link",
      max: 20,
      window: 24 * 60 * 60, // 20 per day
    },
    {
      pathMatcher: path => path === "/check-username",
      max: 10,
      window: 60, // 10 per minute
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
            expires: new Date(Date.now() + ALTCHA_EXPIRE_TIME), // 5 minutes
          })
          return ctx.json(challenge)
        }
        catch (error) {
          console.error("Failed to generate challenge: ", error)
          return ctx.json({ error: "Failed to generate challenge" }, { status: 500 })
        }
      }),

    checkUsername: createAuthEndpoint(
      "/check-username",
      { method: "POST" },
      async (ctx) => {
        const username = usernameSchema.safeParse(ctx.body?.username)
        if (!username.success) {
          throw new APIError(
            "BAD_REQUEST",
            { message: z.treeifyError(username.error).errors.join("\n") },
          )
        }

        try {
          const existingUser = await prisma.user.findUnique({
            where: { username: username.data },
            select: { id: true },
          })
          return ctx.json({ available: !existingUser })
        }
        catch (e) {
          console.error("Error checking username:", e)
          throw new APIError("INTERNAL_SERVER_ERROR", { message: "Server failed to check username." })
        }
      },
    ),

    changeUsername: createAuthEndpoint(
      "/change-username",
      { method: "POST" },
      async (ctx) => {
        // verify session
        const session = await getSessionFromCtx(ctx)
        if (!session) throw new APIError("FORBIDDEN", { message: "User not logged in." })

        // check username
        const username = usernameSchema.safeParse(ctx.body?.username)
        if (!username.success) {
          throw new APIError(
            "BAD_REQUEST",
            { message: z.treeifyError(username.error).errors.join("\n") },
          )
        }

        // update username
        try {
          await prisma.user.update({
            where: { id: session.user.id },
            data: {
              username: username.data.toLowerCase(),
              displayName: username.data,
            },
          })
        }
        catch (e) {
          console.error("Error while trying to update username.", e)
          throw new APIError("INTERNAL_SERVER_ERROR", { message: "Server failed to update the username." })
        }
      },
    ),
  },

  hooks: {
    before: [{
      matcher: ({ path }) => path === "/sign-in/magic-link", // TODO removed `/change-username`?
      handler: createAuthMiddleware(async (ctx) => {
        // check captcha
        const altchaPayload = ctx.headers?.get(ALTCHA_PAYLOAD_HEADER)
        if (!altchaPayload) throw new APIError("BAD_REQUEST", { message: "Missing CAPTCHA." })

        const { challenge } = parseAltchaPayload(altchaPayload)

        const dbAltchaChallenge = await prisma.usedAltchaChallenge.findUnique({ where: { challenge } })

        if (dbAltchaChallenge) throw new APIError("FORBIDDEN", { message: "This CAPTCHA has already been used." })

        if (!await verifySolution(altchaPayload, ALTCHA_HMAC_KEY)) {
          throw new APIError("FORBIDDEN", { message: "CAPTCHA verification failed or expired." })
        }

        // mark the challenge as used
        try {
          await prisma.usedAltchaChallenge.create({
            data: {
              challenge,
              expiresAt: new Date(Date.now() + ALTCHA_EXPIRE_TIME), // safe to cron delete after expiration time has passed
            },
          })
        }
        catch (e) {
          console.error("Error while trying to save ALTCHA challenge:", e)
          throw new APIError("INTERNAL_SERVER_ERROR", { message: "Server failed to save the CAPTCHA." })
        }
      }),
    }],
  },
} satisfies BetterAuthPlugin

const altchaPayloadSchema = z.object({ challenge: z.string() })

function parseAltchaPayload(altchaPayload: string) {
  let parsedAltchaPayload: z.infer<typeof altchaPayloadSchema>
  try {
    const decoded = Buffer.from(altchaPayload, "base64").toString("utf-8")
    parsedAltchaPayload = altchaPayloadSchema.parse(JSON.parse(decoded))
  }
  catch {
    throw new APIError("BAD_REQUEST", { message: "Malformed CAPTCHA." })
  }
  return parsedAltchaPayload
}

export { shugoPlugin }
