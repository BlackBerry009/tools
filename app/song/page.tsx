'use client'
import { useEffect } from 'react'

const fetchSongList = async () => {
  const res = await fetch('/api/song?song="乡愁&pageNum=1')
  return res.json()
}

export default async function Song() {
  useEffect(() => {
    const fetchData = async () => {
      const a = await fetchSongList()
      console.log('a', a)
    }
    fetchData()
  }, [])
  return <div></div>
}
