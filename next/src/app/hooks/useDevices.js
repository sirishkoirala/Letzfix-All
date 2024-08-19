import useSWR from 'swr';
import { API_HOST } from '../constants';
import { fetcher } from '../utils';

export function useDevices() {
   const url = `${API_HOST}/devices`;
   const { data, error, isLoading } = useSWR(url, fetcher)


   return {
      devices: data,
      isLoading,
      isError: !!error,
   }
}