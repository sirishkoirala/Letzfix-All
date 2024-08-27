import { API_HOST } from "./../constants";
import { fetcher } from "./../utils";
import useSWR from 'swr';


export function useCustomer() {
   const url = `${API_HOST}/customers`;
   const { data, isLoading, error } = useSWR(url, fetcher)

   return {
      customer: data,
      isLoading,
      isError: !!error
   }
}