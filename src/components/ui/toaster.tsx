"use client"

import { IconAlertOctagon, IconAlertTriangle, IconCircleCheck, IconInfoCircle, IconLoader } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import { CSSProperties } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      visibleToasts={5}
      position="bottom-right"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (<IconCircleCheck className="size-5 text-green-500" />),
        info: (<IconInfoCircle className="size-5" />),
        warning: (<IconAlertTriangle className="size-5 text-yellow-500" />),
        error: (<IconAlertOctagon className="size-5 text-destructive" />),
        loading: (<IconLoader className="size-5 animate-spin" />),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
        duration: 10_000,
      }}
      {...props}
    />
  )
}

export { Toaster }
