import { API_HOST } from "../constants";
import { Appointment } from "../Types/Appointment";
import useSWR from "swr";
import { fetcher } from "../utils";

export default function useAppointment() {
   const url = `${API_HOST}/appointments`;
   const { data, isLoading, error, mutate } = useSWR<Appointment[]>(url, fetcher);

   return {
      appointments: data,
      isLoading,
      isError: !!error,
      revalidate: mutate,
   };
}
