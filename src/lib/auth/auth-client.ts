import { magicLinkClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

const authClient = createAuthClient({
  appName: "Shugo.moe",
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    magicLinkClient(),
  ],
})

export { authClient }
