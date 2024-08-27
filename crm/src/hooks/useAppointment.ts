import { API_HOST } from "../constants.js";
import { Appointment } from "../Types/Appointment.js";
import { fetcher } from "../utils.js";
import useSWR from "swr";

export default function useAppointment() {
   const url = `${API_HOST}/appointments`;
   const { data, isLoading, error } = useSWR<Appointment[]>(url, fetcher);
   return {
      appointments: data,
      isLoading,
      isError: !!error,
   };
}
