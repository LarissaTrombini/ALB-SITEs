import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "ALB Sistemas - Soluções em Software Empresarial",
  description:
    "Revenda de sistemas empresariais e soluções em software. Sistemas de gestão, automação e tecnologia para sua empresa.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} antialiased font-medium`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
