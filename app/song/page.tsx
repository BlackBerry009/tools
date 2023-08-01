'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { use, useState } from 'react'
import './index.css'
import { saveAs } from 'file-saver'
import useSWR from 'swr'
import Loading from '../loading'
import useSWRMutation from 'swr/mutation'
import { triggerReqGET } from '@/lib/utils'

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json())

const useSongList = (name: string) => {
  return useSWR(
    name ? `/api/song?pageNum=1` : null,
    (url) => fetcher(url + `&name=${name}`),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  )
}

const extractJson = (str: string) => {
  const start = str.indexOf('{')
  const end = str.lastIndexOf('}')
  return str.substring(start, end + 1)
}

const useDownloadUrl = async (songId: string) => {
  // const res = await fetch(`/api/song/download?songId=${songId}`)
  // const wrap = await res.json()
  // const jsonStr = extractJson(wrap.result)
  // const data = JSON.parse(jsonStr)
  // return data.data.lqurl
  const { trigger } = useSWRMutation(
    `/api/song/download?songId=${songId}`,
    triggerReqGET
  )
}

export default function Song() {
  const [name, setName] = useState('')
  const { data: list, isValidating, mutate } = useSongList(name)
  const { trigger, isMutating } = useSWRMutation(
    `/api/song/download`,
    triggerReqGET
  )

  const handleDownloadUrl = (str: string) => {
    const jsonStr = extractJson(str)
    const json = JSON.parse(jsonStr)
    return json.data
  }

  const handleDownload = async (l: any) => {
    trigger(
      { songId: l.songId },
      {
        onSuccess(data) {
          const res = handleDownloadUrl(data.result)
          saveAs(res.lqurl, `${res.songName}.mp3`)
        },
      }
    )
  }

  const onNameChange = (name: string) => {
    setName(name)
  }

  const onSearch = async () => {
    mutate()
  }

  return (
    <>
      <div className="flex gap-2 w-full mb-5">
        <Input
          placeholder="歌曲名称"
          value={name}
          onChange={(e) => onNameChange(e.currentTarget.value)}
        />
        <Button
          className="w-[100px]"
          onClick={onSearch}
          disabled={isValidating}
        >
          搜索
        </Button>
      </div>

      <Table>
        <TableCaption>A list of your searched music.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>序号</TableHead>
            <TableHead className="w-[100px]">名称</TableHead>
            <TableHead>原唱</TableHead>
            <TableHead>翻唱</TableHead>
            <TableHead>下载</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isValidating ? (
            <Loading />
          ) : (
            ((list?.list ?? []) as any[]).map((l, i) => (
              <TableRow key={l.songId}>
                <TableCell>{i + 1}</TableCell>
                <TableCell
                  className="font-medium"
                  dangerouslySetInnerHTML={{
                    __html: l.songName,
                  }}
                ></TableCell>
                <TableCell>{l.originSinger}</TableCell>
                <TableCell>{l.singer}</TableCell>
                <TableCell>
                  {
                    <button
                      disabled={isMutating}
                      className="w-5 inline-block cursor-pointer"
                      onClick={() => handleDownload(l)}
                    >
                      <DownloadIcon />
                    </button>
                  }
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  )
}

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {' '}
      <path
        d="M12 7L12 14M12 14L15 11M12 14L9 11"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>{' '}
      <path
        d="M16 17H12H8"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
      ></path>{' '}
      <path
        d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
      ></path>{' '}
    </g>
  </svg>
)
