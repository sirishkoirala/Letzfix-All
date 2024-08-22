import useSWR from 'swr';
import { API_HOST } from "../constants"
import { fetcher } from "../utils"

export function useStores() {
   const url = `${API_HOST}/stores`;
   const { data, error, isLoading } = useSWR(url, fetcher)
   return {
      locations: data,
      isLoading,
      isError: !!error,
   }
}