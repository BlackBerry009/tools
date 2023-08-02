import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from './nav'
import StyledComponentsRegistry from '@/lib/AntdRegistry'
import { ConfigProvider } from 'antd'
import theme from '@/theme/themeConfig'

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
        <ConfigProvider theme={theme}>
          <StyledComponentsRegistry>
            <Nav />
            <main className="flex pt-20 h-full flex-col items-center justify-between p-24">
              <div className="z-1 w-full max-w-5xl items-center justify-between font-mono text-sm">
                {children}
              </div>
            </main>
          </StyledComponentsRegistry>
        </ConfigProvider>
      </body>
    </html>
  )
}
