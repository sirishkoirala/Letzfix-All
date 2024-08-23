import { fetcher } from "../utils";
import useSWR from 'swr';
import { API_HOST } from '../constants';

export function useDeviceBrand() {
   const url = `${API_HOST}/device-brands`;

   const { data, isLoading, error } = useSWR(url, fetcher)
   // console.log('Smartphones Data:', data);
   return {
      Brands: data,
      isLoading: !error && !data,
      isError: error,
   }
}
