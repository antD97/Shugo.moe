import "server-only"

import { NewUserForm } from "@/app/profile/new-user-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { H1 } from "@/components/ui/header"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) redirect("/")
  if (!session.user.username) return (<NewUserForm />)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-screen max-w-xl">
        <CardHeader className="gap-0">
          <CardTitle>
            <H1 className="text-3xl">
              <span className="text-primary-text">User:</span>
              {` ${session.user.displayName}`}
            </H1>
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4 overflow-scroll">
          <ul className="list-disc *:ml-4">
            <li>
              ID:
              {" "}
              <span className="bg-muted text-muted-foreground px-1 rounded font-mono">
                {session.user.id}
              </span>
            </li>
            <li>
              Created At:
              {" "}
              <span className="bg-muted text-muted-foreground px-1 rounded font-mono">
                {session.user.createdAt.toLocaleString()}
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
