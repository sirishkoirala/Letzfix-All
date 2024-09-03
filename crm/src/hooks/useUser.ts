import useSWR from "swr";
import { API_HOST } from "../constants";
import { fetcher } from "../utils";
import { User } from "../Types/User";

export function useUser() {
   const url = `${API_HOST}/users`;
   const { data, error, isLoading, mutate } = useSWR<User[]>(url, fetcher);
   return {
      users: data,
      isLoading,
      isError: !!error,
      revalidate: mutate,
   };
}
