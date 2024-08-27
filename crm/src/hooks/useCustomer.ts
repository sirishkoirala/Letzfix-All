import { API_HOST } from "../constants.js";
import { Customer } from "../Types/Customer.js";
import { fetcher } from "../utils.js";
import useSWR from "swr";



export default function useCustomer() {
   const url = `${API_HOST}/customers`;
   const { data, isLoading, error } = useSWR<Customer[]>(url, fetcher);
   return {
      customers: data,
      isLoading,
      isError: !!error,
   };
}
