'use client'

import Image from 'next/image'
import { useState } from 'react'
import { saveAs } from 'file-saver'
import { getSong } from '../api/ktv'
import { Button, Input } from 'antd'

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
    <div className='text-xl'>
      <div>
        <div className="flex gap-10">
          <div>
            <div>1. 打开全民 k 歌对应的歌曲页面</div>
            <div>2. 点击右上角的<b>三个点</b></div>
            <div>3. 点击<b>分享</b></div>
            <div>4. 选择<b>复制链接</b></div>
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
        <div className='a w-[800px]'>
          <Input
            placeholder="这里粘贴你的全民 k 歌链接"
            value={value}
            onInput={(e) => setValue(e.currentTarget.value)}
          />
        </div>
        <Button className="mt-5" type='primary' onClick={handleClick}>
          下载
        </Button>
      </div>
    </div>
  )
}
