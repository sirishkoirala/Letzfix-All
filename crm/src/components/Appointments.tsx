import { Breadcrumb, Descriptions, Table, Spin, Alert } from "antd";
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
      render: (_: any, data: Appointment) => `${data.customer.firstName} ${data.customer.lastName}`,
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

   if (isError) {
      return <Alert message="Error" description="Failed to load appointments" type="error" />;
   }

   if (isLoading) {
      return <Spin tip="Loading appointments..." />;
   }

   if (!appointments || appointments.length === 0) {
      return <Alert message="No Appointments" description="No appointments available at the moment." type="info" />;
   }

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Appointments</Breadcrumb.Item>
         </Breadcrumb>
         <Descriptions title="Appointment Details" layout="vertical" bordered />
         <Table<Appointment>
            columns={columns}
            dataSource={appointments}
            rowKey="id"
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
