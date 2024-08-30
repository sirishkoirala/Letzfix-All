import { API_HOST } from "../constants";
import { DeviceModel } from "../Types/DeviceModel";
import { fetcher } from "../utils";
import useSWR from "swr";

export function useDeviceModel() {
   const url = `${API_HOST}/device-models`;

   const { data, error, mutate } = useSWR<DeviceModel[]>(url, fetcher)
   return {
      Models: data,
      isLoading: !error && !data,
      isError: error,
      revalidate: mutate,
   };
}