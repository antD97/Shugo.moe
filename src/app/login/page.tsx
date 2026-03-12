import "server-only"

import { LoginForm } from "@/app/login/login-form"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session) redirect("/profile")
  return (<LoginForm />)
}
