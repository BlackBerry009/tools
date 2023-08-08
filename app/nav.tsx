'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AvatarSvg from '@/public/avatar.svg'

const navigation = [
  { name: '全民 k 歌', href: '/ktv' },
  { name: '歌曲搜索', href: '/song' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="bg-white shadow-sm fixed w-full z-10">
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link className="flex flex-shrink-0 items-center w-[50px] hover:scale-150 transition-all" href="/">
              <AvatarSvg />
            </Link>
            <div className="-my-px ml-6 flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'border-slate-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
