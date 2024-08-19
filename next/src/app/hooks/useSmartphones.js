import { API_HOST } from "../constants";
import { fetcher } from "../utils";
import useSWR from "swr";

export function useSmartphones() {
   const url = `${API_HOST}/smart-phones`;

   const { data, isLoading, errorm } = useSWR(url, fetcher)

   return {
      smartPhones: data,
      isLoading,
      isError: errorm
   }
}