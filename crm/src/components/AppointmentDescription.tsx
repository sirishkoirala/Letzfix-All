import { useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Alert, Descriptions, Badge, Breadcrumb, Button, message } from "antd";
import useAppointment from "../hooks/useAppointment";
import axios from "axios";

const AppointmentDescription = () => {
   const { id } = useParams<{ id: string }>();
   const { appointments = [], isLoading, isError } = useAppointment();

   const appointment = appointments.find((app) => app.id === Number(id));
   const [isArchived, setIsArchived] = useState<boolean>(appointment?.isArchived || false);

   if (isLoading) {
      return <Skeleton active />;
   }

   if (isError) {
      return <Alert message="Error" description="Failed to load appointment details." type="error" />;
   }

   if (!appointment) {
      return <Alert message="Error" description="Appointment not found." type="error" />;
   }

   const toggleArchive = async () => {
      try {
         await axios.patch(`http://localhost:3000/api/appointments/${id}`, {
            isArchived: !isArchived,
         });
         setIsArchived(!isArchived);
         message.success(`Appointment ${!isArchived ? "archived" : "unarchived"} successfully.`);
      } catch (error) {
         message.error("Failed to update the archive status.");
      }
   };

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Appointments</Breadcrumb.Item>
            <Breadcrumb.Item>Details</Breadcrumb.Item>
         </Breadcrumb>
         <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-base">{`Appointment Details for ID: ${id}`}</h2>
            <Button onClick={toggleArchive}>{isArchived ? "Unarchive" : "Archive"}</Button>
         </div>
         <Descriptions layout="vertical" bordered>
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
