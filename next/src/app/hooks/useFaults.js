import { API_HOST, fetcher } from "../constants"

export function useFaults() {
   const url = `${API_HOST}/faults`;
   const { data, error, isLoading } = useSWR(url, fetcher)
   return {
      Faults: data,
      error,
      isLoading
   }
}