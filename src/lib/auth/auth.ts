import { altchaPlugin } from "@/lib/auth/plugin-altcha"
import { passwordValidationPlugin } from "@/lib/auth/plugin-password-validation"
import { usernameRequirementsPlugin } from "@/lib/auth/username-requirements"
import { prisma } from "@/lib/prisma-client"
import { validateUsername } from "@/lib/validation"
import { dash } from "@better-auth/infra"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { username } from "better-auth/plugins"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const auth = betterAuth({
  appName: "Shioru.moe",
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: "auth@shioru.moe",
        to: user.email,
        subject: "Shioru.moe Email Verification",
        text: `Click the link to verify your email: ${url}`,
      }).catch(e => console.error("Failed to send verification email", e))
    },
  },

  plugins: [
    dash(),
    username({
      minUsernameLength: 3,
      maxUsernameLength: 32,
      usernameValidator: (username: string) => !validateUsername(username),
    }),
    passwordValidationPlugin,
    altchaPlugin,
    usernameRequirementsPlugin,
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
