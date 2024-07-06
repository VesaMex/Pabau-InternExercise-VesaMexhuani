import type { Metadata } from "next"
import { Syne } from "next/font/google"
import "./globals.css"

const syne = Syne({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={syne.className}>
        <div className="bg-white flex flex-col h-lvh overflow-y-auto text-black">
          {children}
        </div>
      </body>
    </html>
  )
}
