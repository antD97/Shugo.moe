import "server-only"

import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { Card } from "@/components/ui/card"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="p-8">
        <div>
          Dashboard
        </div>

        <div>
          {JSON.stringify(session)}
        </div>
      </Card>
    </div>
  )
}
