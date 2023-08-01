import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import Nav from './nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tools',
  description: '日常使用的一些工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <Nav />
        </Suspense>
        <main className="flex pt-20 h-full flex-col items-center justify-between p-24">
          <div className="z-1 w-full max-w-5xl items-center justify-between font-mono text-sm">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
