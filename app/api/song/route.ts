import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    console.log(request.url);
  const { searchParams } = new URL(request.url)
  console.log('searchParams', searchParams.entries())
  const name = searchParams.get('name')!
  const pageNum = searchParams.get('pageNum')
  const res = await fetch(
    `http://search.5sing.kugou.com/home/json?keyword=${encodeURI(
      name
    )}&sort=1&page=${pageNum}&filter=2&type=0`
  )
  const product = await res.json()

  return NextResponse.json({ product })
}
