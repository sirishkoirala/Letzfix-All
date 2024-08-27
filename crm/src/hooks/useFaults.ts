import { API_HOST } from "../constants";
import { Fault } from "../Types/Fault";
import { fetcher } from "../utils";
import useSWR from "swr";

export function useFaults() {
   const url = `${API_HOST}/faults`;
   const { data, error, isLoading } = useSWR<Fault[]>(url, fetcher);
   return {
      Faults: data,
      error,
      isLoading,
   };
}
