import "server-only"

import { LoginCard } from "@/app/login/login-card"

export default async function LoginPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoginCard />
    </div>
  )
}
