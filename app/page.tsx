import { inter } from './fonts'

export default function Home() {
  return (
    <div className={`flex flex-col gap-3 text-3xl ${inter.className}`}>
      <p>hello!</p>
      <p>this is a website with some tools for girlfriend.</p>
      <p>if you find it and need some tools.</p>
      <p>please concat me. I will make it.</p>
      <p>
        <a href="mailto:baymax97@163.com" className="underline">
          email: baymax97@163.com
        </a>
      </p>
    </div>
  )
}
