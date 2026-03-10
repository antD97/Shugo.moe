import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import Link, { LinkProps } from "next/link"
import { AnchorHTMLAttributes } from "react"

const linkVariants = cva(
  "text-nowrap",
  {
    variants: {
      variant: {
        "no-style": "",
        default: "text-primary-text hover:text-primary-text/80 hover:cursor-pointer transition-colors",
        secondary: "text-secondary-foreground hover:text-secondary-foreground/50 hover:cursor-pointer transition-colors",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const CustomLink = ({
  className,
  variant = "default",
  ...props
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof linkVariants>) => {
  return (
    <Link className={cn(linkVariants({ variant }), className)} {...props} />
  )
}

export { CustomLink as Link, linkVariants }
