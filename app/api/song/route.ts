import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword')!
  const pageNum = searchParams.get('page')
  const filter = searchParams.get('filter')
  const res = await fetch(
    `http://search.5sing.kugou.com/home/json?keyword=${encodeURIComponent(
      keyword
    )}&sort=1&page=${pageNum}&filter=${filter}&type=0`
  )
  const result = await res.json()

  return NextResponse.json({ ...result })
}
