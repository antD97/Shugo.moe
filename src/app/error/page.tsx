import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { H1 } from "@/components/ui/header"
import { HomeIcon } from "@/components/ui/icons"
import { Link } from "@/components/ui/link"
import { Separator } from "@/components/ui/separator"
import "server-only"

const ERROR_MAP: Partial<Record<string, string>> = {
  INVALID_TOKEN: "Invalid login link.",
  ATTEMPTS_EXCEEDED: "This login link has already been used.",
}

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { error } = await searchParams
  const errorDescription = ERROR_MAP[typeof error === "string" ? error : ""]
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="space-y-3">
        <Link href="/" variant="no-style" className={buttonVariants()}>
          <HomeIcon />
          Home
        </Link>
        <Card className="w-screen max-w-sm">
          <CardHeader className="gap-0">
            <CardTitle>
              <H1 className="text-3xl text-primary-text">
                Error
              </H1>
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-4">
            {errorDescription ? errorDescription : "Unknown error."}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
