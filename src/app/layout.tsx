import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Josefin_Slab, Martel_Sans } from "next/font/google"
import "./globals.css"

const martelSans = Martel_Sans({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-sans" })
const josefinSlab = Josefin_Slab({ subsets: ["latin"], variable: "--font-serif" })

const metadata: Metadata = {
  title: "Shugo",
  description: "Shugo.moe",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("dark font-sans", martelSans.variable, josefinSlab.variable)}>
      <body className="min-h-screen grid grid-rows-[1fr_auto] antialiased">
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}

export { metadata }
