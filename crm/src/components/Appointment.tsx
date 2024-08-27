import { Skeleton, Table } from "antd";
import useAppointment from "../hooks/useAppointment";

const columns = [
   {
      title: "Id",
      dataIndex: "id",
      key: "id",
   },
   {
      title: "Date",
      dataIndex: "date",
      key: "date",
   },
   {
      title: "Time",
      dataIndex: "time",
      key: "time",
   },
   {
      title: "Customer Id",
      dataIndex: "customerId",
      key: "customerId",
   },
   {
      title: "Store Id",
      dataIndex: "storeId",
      key: "storeId",
   },
   {
      title: "Device Model",
      dataIndex: "deviceModelId",
      key: "deviceModelId",
   },
   {
      title: "Fault Id",
      dataIndex: "faultId",
      key: "faultId",
   },
];

const Appointment = () => {
   const { appointments, isLoading, isError } = useAppointment();
   if (isLoading) {
      return (
         <div className="containers">
            <Skeleton active />
         </div>
      );
   }

   if (isError) return <div>Failed to load customer</div>;

   return (
      <div>
         <Table columns={columns} dataSource={appointments} />
      </div>
   );
};

export default Appointment;
