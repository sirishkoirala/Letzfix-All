import useSWR from "swr";
import { API_HOST } from "../constants";
import { fetcher } from "../utils";
import { Store } from "../Types/Store";

export function useStores() {
   const url = `${API_HOST}/stores`;
   const { data, error, isLoading } = useSWR<Store[]>(url, fetcher);
   return {
      stores: data,
      isLoading,
      isError: !!error,
   };
}
