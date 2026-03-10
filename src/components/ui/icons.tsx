import { cn } from "@/lib/utils"
import { IconType } from "react-icons/lib"
import {
  TbArrowLeft,
  TbAsterisk,
  TbBrandGithub,
  TbHome,
  TbInfoCircle,
  TbLogin,
  TbLogout,
  TbMail,
  TbMailExclamation,
  TbScale,
  TbUser,
  TbUserPlus,
} from "react-icons/tb"

function createIcon(Icon: IconType) {
  const ResultComponent = ({ className }: { className?: string }) => (
    <Icon className={cn("inline size-4 -translate-y-px", className)} />
  )
  ResultComponent.displayName = Icon.name
  return ResultComponent
}

const ArrowLeftIcon = createIcon(TbArrowLeft)
const AsteriskIcon = createIcon(TbAsterisk)
// const DiscordIcon = createIcon(TbBrandDiscord)
const GithubIcon = createIcon(TbBrandGithub)
// const GitlabIcon = createIcon(TbBrandGitlab)
// const GoogleIcon = createIcon(TbBrandGoogle)
const HomeIcon = createIcon(TbHome)
const InfoIcon = createIcon(TbInfoCircle)
// const LabelIcon = createIcon(TbLabel)
const LoginIcon = createIcon(TbLogin)
const LogoutIcon = createIcon(TbLogout)
const MailExclamationIcon = createIcon(TbMailExclamation)
const MailIcon = createIcon(TbMail)
// const RedditIcon = createIcon(TbBrandReddit)
const ScaleIcon = createIcon(TbScale)
const UserIcon = createIcon(TbUser)
const UserPlusIcon = createIcon(TbUserPlus)

export {
  ArrowLeftIcon,
  AsteriskIcon,
  // DiscordIcon,
  GithubIcon,
  // GitlabIcon,
  // GoogleIcon,
  HomeIcon,
  InfoIcon,
  // LabelIcon,
  LoginIcon,
  LogoutIcon,
  MailExclamationIcon,
  MailIcon,
  // RedditIcon,
  ScaleIcon,
  UserIcon,
  UserPlusIcon,
}
