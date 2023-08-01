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
import { useState } from 'react'
import './index.css'
import { saveAs } from 'file-saver'
import useSWR from 'swr'
import Loading from '../loading'
import useSWRMutation from 'swr/mutation'
import { MethodProps, sysRequest } from '../api/fetch'
import { Download, Loader2 } from 'lucide-react'

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json())

const useSongList = (name: string) => {
  return useSWR(
    name ? `/api/song?pageNum=1` : null,
    (url: string) => fetcher(url + `&name=${name}`),
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

export default function Song() {
  const [name, setName] = useState('')
  const [clickIndex, setClickIndex] = useState(0)

  const { data: list, isValidating, mutate } = useSongList(name)
  const { trigger, isMutating } = useSWRMutation(
    `/api/song/download`,
    (_, { arg }: { arg: MethodProps }) =>
      sysRequest.get('/api/song/download', arg)
  )

  const handleDownloadUrl = (str: string) => {
    const jsonStr = extractJson(str)
    const json = JSON.parse(jsonStr)
    return json.data
  }

  const handleDownload = async (l: any, i: number) => {
    trigger(
      { params: { songId: l.songId } },
      {
        onSuccess(data: any) {
          const res = handleDownloadUrl(data.result)
          saveAs(res.lqurl, `${res.songName}.mp3`)
        },
      }
    )
    setClickIndex(i)
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
                    <Button
                      disabled={isMutating}
                      onClick={() => handleDownload(l, i)}
                    >
                      {isMutating && i === clickIndex && (
                        <Loader2 className="text-white mr-2 h-4 w-4 animate-spin" />
                      )}
                      {!isMutating && <Download className="w-4 mr-2" />}
                      下载
                    </Button>
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
