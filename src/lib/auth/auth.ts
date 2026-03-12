import { shugoPlugin } from "@/lib/auth/shugo-plugin"
import { prisma } from "@/lib/prisma-client"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { magicLink, openAPI } from "better-auth/plugins"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const auth = betterAuth({
  appName: "Shugo.moe",
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  user: {
    additionalFields: {
      username: {
        type: "string",
        required: false,
      },
      displayName: {
        type: "string",
        required: false,
      },
    },
  },

  plugins: [
    shugoPlugin,
    openAPI(),
    magicLink({
      expiresIn: 5 * 60, // 5 minutes; same as the default
      allowedAttempts: 1, // same as default
      disableSignUp: false, // same as default
      sendMagicLink: ({ email, url }) => {
        resend.emails.send({
          from: "login@shugo.moe",
          to: email.toLowerCase(),
          subject: "Shugo.moe Login",
          text: `Click the link below to log in.\n\n${url}`,
        }).catch(e => console.error("Failed to send verification email", e))
      },
    }),
  ],

  disabledPaths: [
    "/sign-in/social",
    "/sign-up/email",
    "/sign-in/email",
    "/reset-password",
    "/verify-password",
    "/verify-email",
    "/send-verification-email",
    "/change-email",
    "/change-password",
    "/update-user",
    "/delete-user",
    "/request-password-reset",
    "/link-social",
    "/link-accounts",
    "/delete-user/callback",
  ],

  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"], // for accurate cloudflare ip rate limiting
      ipv6Subnet: 64, // see ipv6 rate limiting: https://better-auth.com/docs/concepts/rate-limit
    },
  },

  experimental: {
    joins: true,
  },
})

export { auth }
