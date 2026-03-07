import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import Link, { LinkProps } from "next/link"
import { AnchorHTMLAttributes } from "react"

const linkVariants = cva("underline hover:text-fuchsia-400", {
  variants: {},
  defaultVariants: {},
})

const CustomLink = ({
  className,
  ...props
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link className={cn(linkVariants(), className)} {...props} />
  )
}

export { CustomLink as Link }
