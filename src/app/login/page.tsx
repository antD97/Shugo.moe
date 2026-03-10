import "server-only"

import { LoginCard } from "@/app/login/login-card"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session) redirect("/profile")

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoginCard />
    </div>
  )
}
