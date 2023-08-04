'use client'

import Image from 'next/image'
import { useState } from 'react'
import { saveAs } from 'file-saver'
import { getSong } from '../api/ktv'
import { Button, Input } from 'antd'
import CircleSvg from '@/public/circle.svg'
import LineSvg from '@/public/line.svg'

export default function Song() {
  const [value, setValue] = useState('')
  const handleClick = async () => {
    if (value) {
      const data = await getSong(value)
      if (data?.url) {
        saveAs(data.url, `${data.songName}.mp3`)
      }
    }
  }
  return (
    <div className="text-lg">
      <div>
        <div className="flex gap-10">
          <div>
            <div>1. 打开全民 k 歌对应的歌曲页面</div>
            <div>
              2. 点击右上角的
              <b className="relative">
                <span>三个点</span>
                <div className="w-[80px] absolute -right-4 -top-5">
                  <CircleSvg />
                </div>
              </b>
            </div>
            <div>
              3. 点击
              <b className="relative">
                <span>分享</span>
                <div className="absolute w-[50px] -right-1 -bottom-1">
                  <LineSvg />
                </div>
              </b>
            </div>
            <div>
              4. 选择
              <b className="relative">
                <span>复制链接</span>
                <div className="absolute w-[90px] -right-2 -bottom-2">
                  <LineSvg />
                </div>
              </b>
            </div>
            <div>5. 粘贴至下面的输入框中</div>
            <div>6. 点击下载</div>
          </div>
          <div>
            <div>Example: </div>
            <div className="w-40">
              <Image
                src="/song.jpg"
                alt="example-song.jpg"
                width={200}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
        <div className="my-8">从这里复制出来链接，然后粘贴到下面的框框去</div>
        <div className="a w-[800px]">
          <Input
            placeholder="这里粘贴你的全民 k 歌链接"
            value={value}
            onInput={(e) => setValue(e.currentTarget.value)}
          />
        </div>
        <Button className="mt-5" type="primary" onClick={handleClick}>
          下载
        </Button>
      </div>
    </div>
  )
}
