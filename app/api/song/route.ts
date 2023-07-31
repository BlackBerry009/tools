import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    console.log(request.url);
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')!
  const pageNum = searchParams.get('pageNum')
  const res = await fetch(
    `http://search.5sing.kugou.com/home/json?keyword=${encodeURIComponent(
      name
    )}&sort=1&page=1&filter=2&type=0`
  )
  const result = await res.json()

  return NextResponse.json({ ...result })
}
