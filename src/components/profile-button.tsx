import { UserIcon } from "@/components/ui/icons"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const ProfileButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger className="absolute top-4 right-4">
        <Link href="/login" variant="no-style" className={cn(buttonVariants(), "p-2")}>
          <UserIcon className="size-5" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        Login/Register
      </TooltipContent>
    </Tooltip>
  )
}

export { ProfileButton }
