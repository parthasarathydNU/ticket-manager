import useSWR from 'swr'

interface IResponse {
  data: any
  error: any
}

export function useFetch<Data = any, Error = any>(url: string): IResponse {
  const { data, error } = useSWR<Data, Error>(url, async url => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  })

  return { data, error }
}