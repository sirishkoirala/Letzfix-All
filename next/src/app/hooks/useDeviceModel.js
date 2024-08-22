import { API_HOST } from "../constants";
import { fetcher } from "../utils";
import useSWR from "swr";

export function useDeviceModel() {
   const url = `${API_HOST}/device-models`;

   const { data, error } = useSWR(url, fetcher)

   return {
      Models: data,
      isLoading: !error && !data,
      isError: error,
   }
}