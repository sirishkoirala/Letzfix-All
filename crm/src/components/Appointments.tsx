import { Breadcrumb, Skeleton, Table } from "antd";
import { useNavigate } from "react-router-dom";
import useAppointment from "../hooks/useAppointment";
import { Appointment } from "../Types/Appointment";
import { useEffect } from "react";

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
      title: "Customer Name",
      key: "customerId",
      render: (_: any, data: any) => `${data.customer.firstName} ${data.customer.lastName}`,
   },
   {
      title: "Store Name",
      dataIndex: ["store", "name"],
      key: "storeId",
   },
   {
      title: "Device Model",
      dataIndex: ["deviceModel", "name"],
      key: "deviceModelId",
   },
   {
      title: "Fault Name",
      dataIndex: ["fault", "name"],
      key: "faultName",
   },
];

const Appointments = () => {
   const { appointments, isLoading, isError } = useAppointment();
   const navigate = useNavigate();

   if (isLoading) {
      return (
         <div className="containers">
            <Skeleton active />
         </div>
      );
   }

   if (isError) return <div>Failed to load customer</div>;
   // useEffect(() => {
   //    document.title = "Appointments";
   // }, []);

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Appointment</Breadcrumb.Item>
         </Breadcrumb>
         <Table<Appointment>
            columns={columns}
            dataSource={appointments}
            onRow={(record) => ({
               onClick: () => {
                  navigate(`/appointments/${record.id}`);
               },
            })}
         />
      </>
   );
};

export default Appointments;
