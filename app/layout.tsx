import StyledComponentsRegistry from '@/lib/AntdRegistry'
import theme from '@/theme/themeConfig'
import { ConfigProvider } from 'antd'
import type { Metadata } from 'next'
import './globals.css'
import Nav from './nav'
import {inter} from './fonts'

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
              <div className="z-1 w-full max-w-5xl items-center justify-between text-sm">
                {children}
              </div>
            </main>
          </StyledComponentsRegistry>
        </ConfigProvider>
      </body>
    </html>
  )
}
