'use client'
import { useState } from 'react'
import './index.css'
import { saveAs } from 'file-saver'
import useSWRMutation from 'swr/mutation'
import { MethodProps, sysRequest } from '../api/fetch'
import { Button, Input, Select, Space, Tag, Table, Spin } from 'antd'
import { ColumnsType } from 'antd/es/table'

const extractJson = (str: string) => {
  const start = str.indexOf('{')
  const end = str.lastIndexOf('}')
  return str.substring(start, end + 1)
}

interface DataType {
  createTime: string
  originSinger: string
  songName: string
  status: number
  collectCnt: number
  style: string
  downloadCnt: number
  playCnt: number
  singer: string
  postProduction: string
  popularityCnt: number
  songWriter: string
  composer: string
  songId: number
  optComposer: string
  ext: string
  songSize: number
  nickName: string
  singerId: number
  type: number
  typeName: string
  songurl: string
  downloadurl: string
  typeEname: string
}

export default function Song() {
  const [name, setName] = useState('')
  const [songType, setSongType] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [rowIndex, setRowIndex] = useState(0)

  const {
    data: list,
    isMutating: searchLoading,
    trigger: runSearch,
  } = useSWRMutation(
    name ? `/api/song?pageNum=${pageNum}` : null,
    (_, { arg }: { arg: MethodProps }) => sysRequest.get('/api/song', arg)
  )

  const { trigger, isMutating } = useSWRMutation(
    `/api/song/download`,
    (_, { arg }: { arg: MethodProps }) =>
      sysRequest.get('/api/song/download', arg)
  )

  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'songId',
      render: (_, __, index) => index + 1,
    },
    {
      title: '名称',
      dataIndex: 'songName',
      render: (text) => (
        <span
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        ></span>
      ),
    },
    {
      title: '原唱',
      dataIndex: 'originSinger',
      render: (text) => (
        <span
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        ></span>
      ),
    },
    {
      title: '翻唱',
      dataIndex: 'singer',
      render: (text) => (
        <span
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        ></span>
      ),
    },
    {
      title: '类别',
      dataIndex: 'type',
      render: (_, record) => {
        const tagMap: Record<string, string> = {
          原唱: 'success',
          翻唱: 'warning',
          伴奏: 'default',
        }
        return <Tag color={tagMap[record.typeName]}>{record.typeName}</Tag>
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record, index) => (
        <Button
          loading={index === rowIndex && isMutating}
          onClick={() => handleDownload(record, index)}
        >
          下载
        </Button>
      ),
    },
  ]

  const handleDownloadUrl = (str: string) => {
    const jsonStr = extractJson(str)
    const json = JSON.parse(jsonStr)
    return json.data
  }

  const handleDownload = async (l: DataType, index: number) => {
    setRowIndex(index)
    trigger(
      { params: { songId: l.songId } },
      {
        onSuccess(data: any) {
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
    runSearch({
      params: {
        keyword: name,
        page: 1,
        filter: songType,
      },
    })
  }

  return (
    <>
      <div className="flex justify-between mb-5">
        <div className="flex gap-2">
          <div className="w-[200px]">
            <Input
              placeholder="歌曲名称"
              value={name}
              onChange={(e) => onNameChange(e.currentTarget.value)}
            />
          </div>
          <Select
            placeholder="歌曲类型"
            className="w-[150px]"
            value={songType}
            onChange={(v) => setSongType(v)}
          >
            <Select.Option value={0}>全部</Select.Option>
            <Select.Option value={3}>伴奏</Select.Option>
            <Select.Option value={1}>原唱</Select.Option>
            <Select.Option value={2}>翻唱</Select.Option>
          </Select>
        </div>
        <Button
          type="primary"
          className="w-[100px]"
          onClick={onSearch}
          loading={searchLoading}
        >
          搜索
        </Button>
      </div>

      <Spin spinning={searchLoading}>
        <Table
          caption={<span>旨在下载伴奏，歌曲都无正版版权</span>}
          rowKey="songId"
          columns={columns}
          dataSource={list?.list || []}
          pagination={{
            showSizeChanger: false,
            current: pageNum,
            total: list?.pageInfo?.totalCount || 0,
            onChange: (current, size) => {
              setPageNum(current)
              runSearch({
                params: {
                  keyword: name,
                  page: current,
                  filter: songType,
                },
              })
            },
          }}
        />
      </Spin>
    </>
  )
}
