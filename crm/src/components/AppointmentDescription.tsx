import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
   Select,
   Space,
   Popconfirm,
   Row,
   Col,
   message,
   Card,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import useAppointment from "../hooks/useAppointment";
import { useFaults } from "../hooks/useFaults";
import { useStores } from "../hooks/useStores";
import { useDeviceModel } from "../hooks/useDeviceModel";
import AppointmentBreadcrumb from "./AppointmentBreadcrumb";

const { Option } = Select;

const AppointmentDescription = () => {
   const { id } = useParams<{ id: string }>();
   const {
      appointments = [],
      isLoading: isLoadingAppointment,
      isError: isErrorAppointment,
      revalidate: revalidateAppointment,
   } = useAppointment();
   const { Models = [], isLoading: isLoadingModels, isError: isErrorModels } = useDeviceModel();
   const { Faults = [], isLoading: isLoadingFaults, isError: isErrorFaults } = useFaults();
   const { stores = [], isLoading: isLoadingStores, isError: isErrorStores } = useStores();

   const [form] = Form.useForm();
   const [invoiceForm] = Form.useForm();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
   const [isArchived, setIsArchived] = useState<boolean>(false);

   const appointment = appointments.find((app) => app.id === Number(id));

   useEffect(() => {
      if (appointment) {
         setIsArchived(appointment.isArchived);
         form.setFieldsValue({
            ...appointment,
            customer: { ...appointment.customer },
            store: { ...appointment.store },
            deviceModel: { ...appointment.deviceModel },
            fault: { ...appointment.fault },
         });

         invoiceForm.setFieldsValue({
            appointmentId: appointment.id,
            customer: `${appointment.customer.firstName} ${appointment.customer.lastName}`,
            store: appointment.store.name,
            date: appointment.date,
            time: appointment.time,
            fault: appointment.fault.name,
         });
      }
   }, [appointment, form, invoiceForm]);

   const getTimeOptions = () => {
      return Array.from({ length: 10 }, (_, i) => {
         const startTime = dayjs()
            .hour(i + 9)
            .minute(0);
         const endTime = dayjs()
            .hour(i + 10)
            .minute(0);
         const timeSlot = `${startTime.format("ha")}-${endTime.format("ha")}`;
         return (
            <Option key={i} value={timeSlot}>
               {timeSlot}
            </Option>
         );
      });
   };

   const getDateOptions = () => {
      return Array.from({ length: 7 }, (_, i) => {
         const date = dayjs().add(i, "day");
         return (
            <Option key={i} value={date.format("ddd, MMM D, YYYY")}>
               {date.format("ddd, MMM D, YYYY")}
            </Option>
         );
      });
   };

   if (isLoadingAppointment || isLoadingFaults || isLoadingStores || isLoadingModels) {
      return <Skeleton active />;
   }

   if (isErrorAppointment || isErrorFaults || isErrorStores || isErrorModels) {
      return (
         <Alert
            message="Error"
            description="Failed to load appointment, faults, stores, or device models details."
            type="error"
         />
      );
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
         revalidateAppointment();
      } catch (error) {
         message.error("Failed to update the archive status.");
      }
   };

   const handleEdit = () => {
      setIsModalOpen(true);
   };

   const handleDelete = async () => {
      try {
         await axios.delete(`http://localhost:3000/api/appointments/${id}`);
         message.success("Appointment deleted successfully.");
         revalidateAppointment();
      } catch (error) {
         message.error("Failed to delete the appointment.");
      }
   };

   const handleModalClose = () => {
      setIsModalOpen(false);
   };

   const handleInvoiceModalClose = () => {
      setIsInvoiceModalOpen(false);
   };

   const onFinish = async (values: any) => {
      try {
         const updatedAppointment = {
            firstName: values.customer.firstName,
            lastName: values.customer.lastName,
            deviceModelName: Models.find((model) => model.id === values.deviceModel.id)?.name,
            faultName: Faults.find((fault) => fault.id === values.fault.id)?.name,
            storeName: stores.find((store) => store.id === values.store.id)?.name,
            isArchived,
         };

         await axios.patch(`http://localhost:3000/api/appointments/${id}`, updatedAppointment);

         message.success("Appointment updated successfully.");
         setIsModalOpen(false);
         revalidateAppointment();
      } catch (error) {
         message.error("Failed to update the appointment.");
      }
   };

const onInvoiceFinish = async (values: any) => {
   try {
      // Prepare the invoice data
      const { customer, store, date, time, fault, items } = values;
      console.log(values)
      console.log(items)
      const amount = items.reduce((acc: number, item: any) => acc + item.amount, 0);
      const tax = (amount * 10) / 100;

      const newInvoice = {
         invoiceNumber: `INV-${Date.now()}`, // Generate a unique invoice number
         invoiceDate: dayjs().format("YYYY-MM-DD"),
         invoiceDueDate: dayjs().add(30, "day").format("YYYY-MM-DD"), // Assuming 30 days payment term
         appointmentId: appointment.id, // Associated appointment ID
         customerId: appointment.customer.id, // Associated customer ID
         storeId: appointment.store.id, // Associated store ID
         amount,
         tax,
         totalAmount: amount + tax,
      };

      // Post the invoice data
      const invoiceResponse = await axios.post(`http://localhost:3000/api/invoices`, newInvoice);
      const createdInvoice = invoiceResponse.data;

      // Prepare and post the invoice items data
      const invoiceItems = items.map((item: any) => ({
         invoiceId: createdInvoice.id,
         faultId: item.fault,
         amount: item.amount,
         tax: (item.amount * 10) / 100,
      }));

      await Promise.all(
         invoiceItems.map(async (item) => {
            await axios.post(`http://localhost:3000/api/invoice-items`, item);
         })
      );

      message.success("Invoice and items created successfully.");
      setIsInvoiceModalOpen(false);
      revalidateAppointment();
   } catch (error) {
      message.error("Failed to create the invoice or invoice items.");
   }
};


   // const navigate = useNavigate();
   const handleInvoiceClick = () => {
      setIsInvoiceModalOpen(true);
   };

   return (
      <>
         <AppointmentBreadcrumb />
         <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-base">{`Appointment Details for ID: ${id}`}</h2>
            <Space>
               <Button onClick={handleInvoiceClick}>Invoice</Button>
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
               {`${appointment.customer?.firstName} ${appointment.customer?.lastName}`}
            </Descriptions.Item>
            <Descriptions.Item label="Device Model">{appointment.deviceModel?.name}</Descriptions.Item>
            <Descriptions.Item label="Fault">{appointment.fault?.name}</Descriptions.Item>
            <Descriptions.Item label="Phone">{appointment.customer?.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{appointment.customer?.email}</Descriptions.Item>
            <Descriptions.Item label="Store Name">{appointment.store?.name}</Descriptions.Item>
            <Descriptions.Item label="Date">{appointment.date}</Descriptions.Item>
            <Descriptions.Item label="Time">{appointment.time}</Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
               <Badge status={isArchived ? "default" : "processing"} text={isArchived ? "Archived" : "Scheduled"} />
            </Descriptions.Item>
         </Descriptions>

         <Modal title="Edit Appointment" open={isModalOpen} onOk={form.submit} onCancel={handleModalClose} centered>
            <Form form={form} onFinish={onFinish} layout="vertical">
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="First Name"
                        name={["customer", "firstName"]}
                        rules={[{ required: true, message: "Please input the first name" }]}
                     >
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Last Name"
                        name={["customer", "lastName"]}
                        rules={[{ required: true, message: "Please input the last name" }]}
                     >
                        <Input />
                     </Form.Item>
                  </Col>
               </Row>

               <Form.Item name={["customer", "id"]} hidden>
                  <Input />
               </Form.Item>

               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Device Model"
                        name={["deviceModel", "id"]}
                        rules={[{ required: true, message: "Please select a device model" }]}
                     >
                        <Select placeholder="Select a device model">
                           {Models.map((model) => (
                              <Option key={model.id} value={model.id}>
                                 {model.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Store"
                        name={["store", "id"]}
                        rules={[{ required: true, message: "Please select a store" }]}
                     >
                        <Select placeholder="Select a store">
                           {stores.map((store) => (
                              <Option key={store.id} value={store.id}>
                                 {store.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>

               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select a date" }]}>
                        <Select placeholder="Select a date">{getDateOptions()}</Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item label="Time" name="time" rules={[{ required: true, message: "Please select a time" }]}>
                        <Select placeholder="Select a time">{getTimeOptions()}</Select>
                     </Form.Item>
                  </Col>
               </Row>

               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Fault"
                        name={["fault", "id"]}
                        rules={[{ required: true, message: "Please select a fault" }]}
                     >
                        <Select placeholder="Select a fault">
                           {Faults.map((fault) => (
                              <Option key={fault.id} value={fault.id}>
                                 {fault.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.List name="optionalFaults">
                        {(fields, { add, remove }) => (
                           <div className="items-center">
                              {fields.map(({ key, name, fieldKey, ...restField }) => (
                                 <Row key={key} gutter={8}>
                                    <Col span={20}>
                                       <Form.Item
                                          {...restField}
                                          name={[name, "fault"]}
                                          fieldKey={[fieldKey, "fault"]}
                                          label="Fault"
                                          rules={[{ required: true, message: "Please select a fault" }]}
                                       >
                                          <Select placeholder="Select a fault">
                                             {Faults.map((fault) => (
                                                <Option key={fault.id} value={fault.id}>
                                                   {fault.name}
                                                </Option>
                                             ))}
                                          </Select>
                                       </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                       <Form.Item label=" ">
                                          <Button type="dashed" onClick={() => remove(name)} icon={<CloseOutlined />} />
                                       </Form.Item>
                                    </Col>
                                 </Row>
                              ))}
                              <Form.Item label=" ">
                                 <Button type="dashed" onClick={() => add()} block>
                                    Add Fault
                                 </Button>
                              </Form.Item>
                           </div>
                        )}
                     </Form.List>
                  </Col>
               </Row>
            </Form>
         </Modal>

         <Modal
            title="Create Invoice"
            open={isInvoiceModalOpen}
            onOk={invoiceForm.submit}
            onCancel={handleInvoiceModalClose}
            centered
         >
            <Form form={invoiceForm} onFinish={onInvoiceFinish} layout="vertical">
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item name="customer" label="Customer Name">
                        <Input disabled />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item name="store" label="Store">
                        <Input disabled />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item name="date" label="Date">
                        <Input disabled />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item name="time" label="Time">
                        <Input disabled />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Fault"
                        name={["items", 0, "fault"]} 
                        rules={[{ required: true, message: "Please select a fault" }]}
                     >
                        <Select placeholder="Select a fault">
                           {Faults.map((fault) => (
                              <Option key={fault.id} value={fault.id}>
                                 {fault.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Amount"
                        name={["items", 0, "amount"]} // Specify the path for the first item
                        rules={[{ required: true, message: "Please enter the amount" }]}
                     >
                        <Input prefix="$" />
                     </Form.Item>
                  </Col>
               </Row>

               <Form.List name="items">
                  {/* Ensure that this is within the parent form structure */}
                  {(fields, { add, remove }) => (
                     <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                        {fields.map((field) => (
                           <Card
                              size="small"
                              title={`Fault ${field.name + 2}`}
                              key={field.key}
                              extra={
                                 <CloseOutlined
                                    onClick={() => {
                                       remove(field.name);
                                    }}
                                 />
                              }
                           >
                              <Row gutter={16}>
                                 <Col span={12}>
                                    <Form.Item
                                       label="Fault"
                                       name={[field.name, "fault"]}
                                       fieldKey={[field.fieldKey, "fault"]}
                                       rules={[{ required: true, message: "Please select a fault" }]}
                                    >
                                       <Select placeholder="Select a fault" loading={isLoadingFaults}>
                                          {Faults.map((fault) => (
                                             <Option key={fault.id} value={fault.id}>
                                                {fault.name}
                                             </Option>
                                          ))}
                                       </Select>
                                    </Form.Item>
                                 </Col>
                                 <Col span={12}>
                                    <Form.Item
                                       label="Amount"
                                       name={[field.name, "amount"]}
                                       fieldKey={[field.fieldKey, "amount"]}
                                       rules={[{ required: true, message: "Please enter the amount" }]}
                                    >
                                       <Input prefix="$" />
                                    </Form.Item>
                                 </Col>
                              </Row>
                           </Card>
                        ))}

                        <Button type="dashed" onClick={() => add()} block>
                           + Add Fault
                        </Button>
                     </div>
                  )}
               </Form.List>
            </Form>
         </Modal>
      </>
   );
};

export default AppointmentDescription;
