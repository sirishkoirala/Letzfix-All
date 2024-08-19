import { fetcher } from "../utils";
import useSWR from 'swr';
import { API_HOST } from '../constants';

export function usePhones() {
   const url = `${API_HOST}/phones`;

   const { data, isLoading, error } = useSWR(url, fetcher)
   // console.log('Smartphones Data:', data);
   return {
      Smartphones: data,
      isLoading,
      isError: error
   }

}
