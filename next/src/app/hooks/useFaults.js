import { API_HOST } from "../constants"
import { fetcher} from "../utils"
import useSWR from "swr";

export function useFaults() {
   const url = `${API_HOST}/faults`;
   const { data, error, isLoading } = useSWR(url, fetcher)
   return {
      Faults: data,
      error,
      isLoading
   }
}