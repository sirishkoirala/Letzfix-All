import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
   Skeleton,
   Alert,
   Descriptions,
   Badge,
   Breadcrumb,
   Button,
   Modal,
   Form,
   Input,
   Space,
   Popconfirm,
   Row,
   Col,
   message,
} from "antd";
import useAppointment from "../hooks/useAppointment";
import axios from "axios";
import { Appointment } from "../Types/Appointment";

const AppointmentDescription = () => {
   const { id } = useParams<{ id: string }>();
   const { appointments = [], isLoading, isError } = useAppointment();
   const [form] = Form.useForm();
   const [isModalOpen, setIsModalOpen] = useState(false);

   const appointment = appointments.find((app) => app.id === Number(id));
   const [isArchived, setIsArchived] = useState<boolean>(false);

   useEffect(() => {
      if (appointment) {
         setIsArchived(appointment.isArchived);
      }
   }, [appointment]);

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

   const handleEdit = () => {
      setIsModalOpen(true);
      form.setFieldsValue(appointment);
   };

   const handleDelete = async () => {
      try {
         await axios.delete(`http://localhost:3000/api/appointments/${id}`);
         message.success("Appointment deleted successfully.");
      } catch (error) {
         message.error("Failed to delete the appointment.");
      }
   };

   const handleModalClose = () => {
      setIsModalOpen(false);
   };

   const onFinish = async (values: Appointment) => {
      try {
         await axios.put(`http://localhost:3000/api/appointments/${id}`, values);
         message.success("Appointment updated successfully.");
         setIsModalOpen(false);
      } catch (error) {
         message.error("Failed to update the appointment.");
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
            <Space>
               <Button onClick={handleEdit}>Edit</Button>
               <Popconfirm
                  title="Delete the appointment"
                  description="Are you sure to delete this appointment?"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
               >
                  <Button danger>Delete</Button>
               </Popconfirm>
               <Button onClick={toggleArchive}>{isArchived ? "Unarchive" : "Archive"}</Button>
            </Space>
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

         <Modal title="Edit Appointment" open={isModalOpen} onOk={form.submit} onCancel={handleModalClose} centered>
            <Form form={form} onFinish={onFinish} layout="vertical">
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item label="Customer Name" name={["customer", "name"]}>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item label="Device Model" name={["deviceModel", "name"]}>
                        <Input />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item label="Fault" name={["fault", "name"]}>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item label="Phone" name={["customer", "phone"]}>
                        <Input />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item label="Email" name={["customer", "email"]}>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item label="Store Name" name={["store", "name"]}>
                        <Input />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item label="Date" name="date">
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item label="Time" name="time">
                        <Input />
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </>
   );
};

export default AppointmentDescription;
