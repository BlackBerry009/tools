import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const songId = searchParams.get('songId')
  const res = await fetch(
    `http://service.5sing.kugou.com/song/getsongurl?jsoncallback=jQuery1705150715562340098_1690810922233&songid=${songId}&songtype=fc&from=web&version=6.6.72&_=1690810922598`
  )
  const result = await res.text()

  return NextResponse.json({ result })
}
