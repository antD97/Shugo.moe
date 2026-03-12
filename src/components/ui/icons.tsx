import { cn } from "@/lib/utils"
import { IconType } from "react-icons/lib"
import {
  TbAlertOctagon,
  TbAlertTriangle,
  TbArrowBigDown,
  TbArrowBigLeft,
  TbArrowBigRight,
  TbArrowBigUp,
  TbArrowLeft,
  TbAsterisk,
  TbBrandGithub,
  TbCheck,
  TbCircleCheck,
  TbCircleX,
  TbHome,
  TbInfoCircle,
  TbKey,
  TbLabel,
  TbLogin,
  TbLogout,
  TbMail,
  TbMailExclamation,
  TbMailForward,
  TbScale,
  TbUser,
  TbUserPlus,
  TbX,
} from "react-icons/tb"

function createIcon(Icon: IconType) {
  const ResultComponent = ({ className }: { className?: string }) => (
    <Icon className={cn("inline size-4 -translate-y-px", className)} />
  )
  ResultComponent.displayName = Icon.name
  return ResultComponent
}

const AlertIcon = createIcon(TbAlertOctagon)
const ArrowLeftIcon = createIcon(TbArrowLeft)
const AsteriskIcon = createIcon(TbAsterisk)
const BigDownArrow = createIcon(TbArrowBigDown)
const BigLeftArrow = createIcon(TbArrowBigLeft)
const BigRightArrow = createIcon(TbArrowBigRight)
const BigUpArrow = createIcon(TbArrowBigUp)
const CheckIcon = createIcon(TbCheck)
const CircleCheckIcon = createIcon(TbCircleCheck)
const CircleXIcon = createIcon(TbCircleX)
// const DiscordIcon = createIcon(TbBrandDiscord)
const GithubIcon = createIcon(TbBrandGithub)
// const GitlabIcon = createIcon(TbBrandGitlab)
// const GoogleIcon = createIcon(TbBrandGoogle)
const HomeIcon = createIcon(TbHome)
const InfoIcon = createIcon(TbInfoCircle)
const KeyIcon = createIcon(TbKey)
const LabelIcon = createIcon(TbLabel)
const LoginIcon = createIcon(TbLogin)
const LogoutIcon = createIcon(TbLogout)
const MailSent = createIcon(TbMailExclamation)
const MailSend = createIcon(TbMailForward)
const MailIcon = createIcon(TbMail)
// const RedditIcon = createIcon(TbBrandReddit)
const ScaleIcon = createIcon(TbScale)
const UserIcon = createIcon(TbUser)
const UserPlusIcon = createIcon(TbUserPlus)
const WarnIcon = createIcon(TbAlertTriangle)
const XIcon = createIcon(TbX)

export {
  AlertIcon,
  ArrowLeftIcon,
  AsteriskIcon,
  BigDownArrow,
  BigLeftArrow,
  BigRightArrow,
  BigUpArrow,
  CheckIcon,
  CircleCheckIcon,
  CircleXIcon,
  // DiscordIcon,
  GithubIcon,
  // GitlabIcon,
  // GoogleIcon,
  HomeIcon,
  InfoIcon,
  KeyIcon,
  LabelIcon,
  LoginIcon,
  LogoutIcon,
  MailIcon,
  MailSend,
  MailSent,
  // RedditIcon,
  ScaleIcon,
  UserIcon,
  UserPlusIcon,
  WarnIcon,
  XIcon,
}
