import { API_HOST } from "../constants";
import { Invoice } from "../Types/Invoice";
import { fetcher } from "../utils";
import useSWR from "swr";

export function useInvoices() {
   const url = `${API_HOST}/invoices`;
   const { data, error, isLoading, mutate } = useSWR<Invoice[]>(url, fetcher);
   return {
      invoices: data,
      isError: error,
      isLoading,
      revalidate: mutate,
   };
}
