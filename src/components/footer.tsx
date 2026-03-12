import { Card, CardContent } from "@/components/ui/card"
import { GithubIcon, InfoIcon, ScaleIcon } from "@/components/ui/icons"
import { Link } from "@/components/ui/link"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <footer className="w-full">
      <Card className="w-full p-2 rounded-none">
        <CardContent className="flex justify-center gap-4">
          <Link href="/about">
            <InfoIcon />
            {" "}
            About
          </Link>
          <Separator orientation="vertical" className="bg-foreground" />
          <Link href="https://github.com/antD97/Shugo.moe">
            <GithubIcon />
            {" "}
            Source
          </Link>
          <Separator orientation="vertical" className="bg-foreground" />
          <Link href="/legal">
            <ScaleIcon />
            {" "}
            Legal
          </Link>
        </CardContent>
      </Card>
    </footer>
  )
}

export { Footer }
