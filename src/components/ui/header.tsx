import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { ReactNode } from "react"

const headerVariants = cva("font-serif", {
  variants: {
    level: {
      1: "text-7xl",
      2: "text-6xl",
      3: "text-5xl",
      4: "text-4xl",
      5: "text-3xl",
      6: "text-2xl",
    },
  },
  defaultVariants: {
    level: 1,
  },
})

type HeaderProps = {
  children: ReactNode
  className?: string
}

const Header = ({ level, children, className }: HeaderProps & { level: 1 | 2 | 3 | 4 | 5 | 6 }) => {
  const classes = cn(headerVariants({ level }), className)
  switch (level) {
    case 1: return (<h1 className={classes}>{children}</h1>)
    case 2: return (<h2 className={classes}>{children}</h2>)
    case 3: return (<h3 className={classes}>{children}</h3>)
    case 4: return (<h4 className={classes}>{children}</h4>)
    case 5: return (<h5 className={classes}>{children}</h5>)
    case 6: return (<h6 className={classes}>{children}</h6>)
  }
}

const H1 = ({ ...props }: HeaderProps) => (<Header level={1} {...props} />)
const H2 = ({ ...props }: HeaderProps) => (<Header level={2} {...props} />)
const H3 = ({ ...props }: HeaderProps) => (<Header level={3} {...props} />)
const H4 = ({ ...props }: HeaderProps) => (<Header level={4} {...props} />)
const H5 = ({ ...props }: HeaderProps) => (<Header level={5} {...props} />)
const H6 = ({ ...props }: HeaderProps) => (<Header level={6} {...props} />)

export { H1, H2, H3, H4, H5, H6 }
