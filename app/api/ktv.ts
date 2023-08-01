import { request } from "./fetch"

export const getSong = (url: string) => {
    return request.get(`/api/song?url=${url}`)
}