import "./globals.css"
import { Inter, Hind_Siliguri } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import "leaflet/dist/leaflet.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })
const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
})

export const metadata: Metadata = {
  title: "মা সাথী এআই (MaaSathi AI) - আপনার মাতৃত্বকালীন স্বাস্থ্যসঙ্গী",
  description: "মা সাথী এআই (MaaSathi AI) বাংলাদেশের প্রথম মাতৃত্বকালীন এআই স্বাস্থ্যসঙ্গী। গর্ভাবস্থা থেকে মাতৃত্ব—আমরা আছি আপনার পাশে।",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" suppressHydrationWarning className={hindSiliguri.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MouseMoveEffect />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'