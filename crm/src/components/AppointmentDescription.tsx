import { useParams } from "react-router-dom";
import { Skeleton, Alert, Descriptions, Badge, Breadcrumb } from "antd";
import useAppointment from "../hooks/useAppointment";

const AppointmentDescription = () => {
   const { id } = useParams<{ id: string }>();
   const { appointments = [], isLoading, isError } = useAppointment();

   if (isLoading) {
      return <Skeleton active />;
   }

   if (isError) {
      return <Alert message="Error" description="Failed to load appointment details." type="error" />;
   }
   // useEffect(() => {
   //    document.title = `Appointment${id ? ` Id: ${id}` : ""}`;
   // }, [id]);

   const appointment = appointments.find((app) => app.id === Number(id));

   if (!appointment) {
      return <Alert message="Error" description="Appointment not found." type="error" />;
   }

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Appointments</Breadcrumb.Item>
            <Breadcrumb.Item>Details</Breadcrumb.Item>
         </Breadcrumb>
         <Descriptions title={`Appointment Details for ID: ${id}`} layout="vertical" bordered>
            <Descriptions.Item label="Customer Name">
               {`${appointment.customer.firstName} ${appointment.customer.lastName}`}
            </Descriptions.Item>
            <Descriptions.Item label="Device Model">{appointment.deviceModel.name}</Descriptions.Item>
            <Descriptions.Item label="Fault">{appointment.fault.name}</Descriptions.Item>
            <Descriptions.Item label="Phone">{appointment.customer.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{appointment.customer.email}</Descriptions.Item>
            <Descriptions.Item label="Store Name">{appointment.store.name}</Descriptions.Item>
            <Descriptions.Item label="Date">{appointment.date}</Descriptions.Item>
            <Descriptions.Item label="Time">{appointment.time}</Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
               <Badge status="processing" text="Scheduled" />
            </Descriptions.Item>
         </Descriptions>
      </>
   );
};

export default AppointmentDescription;
