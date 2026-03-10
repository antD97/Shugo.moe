import "server-only"

import { Footer } from "@/components/footer"
import { NavButtons } from "@/components/nav-buttons"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Josefin_Slab, Martel_Sans } from "next/font/google"
import Image from "next/image"
import { ReactNode } from "react"
import "./globals.css"

const martelSans = Martel_Sans({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-sans" })
const josefinSlab = Josefin_Slab({ subsets: ["latin"], variable: "--font-serif" })

const metadata: Metadata = {
  title: "Shugo",
  description: "Shugo.moe",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={cn("dark font-sans", martelSans.variable, josefinSlab.variable)}>
      <body className="min-h-screen max-w-screen overflow-scroll-y grid grid-rows-[1fr_auto] antialiased">
        <div className="fixed bottom-0 left-0 -z-100 size-[80%] opacity-10 translate-x-[-20%] translate-y-[20%] rotate-[15deg] select-none">
          <Image src="/icon.svg" fill loading="eager" alt="Shugo background flower" />
        </div>
        <TooltipProvider>
          <NavButtons />
          {children}
          <Footer />
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  )
}

export { metadata }
