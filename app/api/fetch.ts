abstract class BaseApi {
  protected abstract baseUrl: string
  public static async request<T = unknown>(
    options: RequestInit & { url: string }
  ) {
    const defaultOptions: Record<string, any> = {
    }
    if (['POST' || 'PUT'].includes(options.method || '')) {
      defaultOptions.headers['Content-type'] = 'application/json; charset=utf-8'
    }
    const newOptions: RequestInit = {
      ...defaultOptions,
      ...options,
    }
    if (options.body) {
      newOptions.body = JSON.stringify(options.body)
    }
    console.log('newOptions', newOptions)
    const res = await fetch(`${options.url}`, newOptions)
    const { status } = res
    if (status >= 200 && status < 300) {
      return res.json()
    }
    throw new Error('请求失败')
  }

  public async request<T = unknown>(
    method: 'GET' | 'POST' | 'PUT',
    path: string,
    options: RequestInit
  ) {
    const url = `${this.baseUrl}${path}`
    return BaseApi.request<T>({
      method,
      url,
      body: JSON.stringify(options.body),
    })
  }

  public post(path: string, option?: RequestInit) {
    const options = Object.assign({ method: 'POST' }, option)
    return this.request('POST', path, options)
  }

  public put(path: string, option?: RequestInit) {
    const options = Object.assign({ method: 'PUT' }, option)
    return this.request('PUT', path, options)
  }

  public get(path: string, option?: RequestInit) {
    const options = Object.assign({ method: 'GET' }, option)
    return this.request('GET', path, options)
  }
}

class Api extends BaseApi {
  protected baseUrl = 'https://song-beryl.vercel.app'
}

export const request = new Api()
