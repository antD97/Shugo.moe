import { Card, CardContent } from "@/components/ui/card"
import { GithubIcon, InfoIcon, ScaleIcon } from "@/components/ui/icons"
import { Link } from "@/components/ui/link"

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
          |
          <Link href="https://github.com/antD97/Shioru.moe">
            <GithubIcon />
            {" "}
            Source
          </Link>
          |
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

