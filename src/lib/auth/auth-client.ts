import { shugoPlugin } from "@/lib/auth/shugo-plugin"
import { BetterAuthClientPlugin } from "better-auth"
import { magicLinkClient } from "better-auth/client/plugins"
import { BetterFetchOption, createAuthClient } from "better-auth/react"
import { z } from "zod"

const shugoClientPlugin = {
  id: "shugo",
  $InferServerPlugin: {} as typeof shugoPlugin,
  getActions: $fetch => ({

    // /check-username
    checkUsername: async (username: string, fetchOptions?: BetterFetchOption) => {
      const response = await $fetch("/check-username", {
        method: "POST",
        body: { username },
        ...fetchOptions,
      })
      return {
        ...response,
        available: z.object({ available: z.boolean() }).parse(response.data).available,
      }
    },

    // /change-username
    changeUsername: async (username: string, fetchOptions?: BetterFetchOption) => {
      return await $fetch("/change-username", {
        method: "POST",
        body: { username },
        ...fetchOptions,
      })
    },
  }),
} satisfies BetterAuthClientPlugin

const authClient = createAuthClient({
  appName: "Shugo.moe",
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    shugoClientPlugin,
    magicLinkClient(),
  ],
})

export { authClient }
