import { Breadcrumb, Descriptions, Table } from "antd";
import { useNavigate } from "react-router-dom";
import useAppointment from "../hooks/useAppointment";
import { Appointment } from "../Types/Appointment";

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

  
   if (isError) return <div>Failed to load customer</div>;
   

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Appointment</Breadcrumb.Item>
         </Breadcrumb>
         <Descriptions title="Appointment Details" layout="vertical" bordered></Descriptions>
         <Table<Appointment>
            columns={columns}
            dataSource={appointments}
            loading={isLoading}
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
