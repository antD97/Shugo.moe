import { cn } from "@/lib/utils"
import { IconType } from "react-icons/lib"
import {
  TbArrowLeft,
  TbAsterisk,
  TbBrandDiscord,
  TbBrandGithub,
  TbBrandGitlab,
  TbBrandGoogle,
  TbBrandReddit,
  TbInfoCircle,
  TbLabel,
  TbLogin2,
  TbMail,
  TbScale,
  TbUser,
} from "react-icons/tb"

function createIcon(Icon: IconType) {
  const ResultComponent = ({ className }: { className?: string }) => (
    <Icon className={cn("inline size-4 -translate-y-[1px]", className)} />
  )
  ResultComponent.displayName = Icon.name
  return ResultComponent
}

const ArrowLeftIcon = createIcon(TbArrowLeft)
const AsteriskIcon = createIcon(TbAsterisk)
const DiscordIcon = createIcon(TbBrandDiscord)
const GithubIcon = createIcon(TbBrandGithub)
const GitlabIcon = createIcon(TbBrandGitlab)
const GoogleIcon = createIcon(TbBrandGoogle)
const InfoIcon = createIcon(TbInfoCircle)
const LabelIcon = createIcon(TbLabel)
const LoginIcon = createIcon(TbLogin2)
const MailIcon = createIcon(TbMail)
const RedditIcon = createIcon(TbBrandReddit)
const ScaleIcon = createIcon(TbScale)
const UserIcon = createIcon(TbUser)

export {
  ArrowLeftIcon,
  AsteriskIcon,
  DiscordIcon,
  GithubIcon,
  GitlabIcon,
  GoogleIcon,
  InfoIcon,
  LabelIcon,
  LoginIcon,
  MailIcon,
  RedditIcon,
  ScaleIcon,
  UserIcon,
}
