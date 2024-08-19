// import { API_HOST } from '../constants';
import useSWR from 'swr';
import { fetcher } from '../utils';

export function useLogos(){

   const { data , error , isLoading} = useSWR('./data/static.json/logos', fetcher)

   return {
      logos: data,
      isLoading,
      isError : error
   }
}
