import "server-only"

import { Card } from "@/components/ui/card"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="p-8">
        <div>
          Profile
        </div>

        <div>
          {JSON.stringify(session)}
        </div>
      </Card>
    </div>
  )
}
