"use client"

import { buttonVariants } from "@/components/ui/button"
import { HomeIcon, LoginIcon, LogoutIcon, UserIcon } from "@/components/ui/icons"
import { Link } from "@/components/ui/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { authClient } from "@/lib/auth/auth-client"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons/lib"
import { toast } from "sonner"

const RESTRICTED_PATHNAMES = ["/profile"]

const NavButtons = () => {
  const { data: session } = authClient.useSession()
  const pathname = usePathname()
  const router = useRouter()

  const logout = useCallback(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          if (RESTRICTED_PATHNAMES.includes(pathname)) router.push("/")
          toast.success("Logged out successfully.")
        },
        onError: () => { toast.error("There was a problem logging out.") },
      },
    })
  }, [pathname, router])

  return (
    <div className="absolute top-4 right-4 space-x-2">
      {pathname !== "/" && (<NavLink href="/" Icon={HomeIcon} tooltip="Home" />)}
      {session
        ? (
            <>
              {pathname !== "/profile" && (<NavLink href="/profile" Icon={UserIcon} tooltip="Profile" text={session.user.displayUsername || session.user.username} />)}
              <NavButton onClick={logout} Icon={LogoutIcon} tooltip="Logout" />
            </>
          )
        : (<NavLink href="/login" Icon={LoginIcon} tooltip="Login/Register" />)}
    </div>
  )
}

const NavButton = ({ onClick, Icon, tooltip }: { onClick: () => void, Icon: IconType, tooltip: string }) => (
  <Tooltip>
    <TooltipTrigger onClick={onClick} className={cn(buttonVariants(), "p-2")}>
      <Icon className="size-5" />
    </TooltipTrigger>
    <TooltipContent>{tooltip}</TooltipContent>
  </Tooltip>
)

const NavLink = ({
  href,
  Icon,
  tooltip,
  text,
}: {
  href: string
  Icon: IconType
  tooltip: string
  text?: string
}) => (
  <Tooltip>
    <TooltipTrigger>
      <Link href={href} variant="no-style" className={cn(buttonVariants(), "p-2")}>
        <Icon className="size-5" />
        {text && (<span className="pr-2">{text}</span>)}
      </Link>
    </TooltipTrigger>
    <TooltipContent>{tooltip}</TooltipContent>
  </Tooltip>
)

export { NavButtons }
