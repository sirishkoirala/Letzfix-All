import { useState } from "react";
import axios from "axios";
import {
   Breadcrumb,
   Descriptions,
   Table,
   Modal,
   Form,
   Input,
   Button,
   Space,
   Col,
   Row,
   Popconfirm,
   message,
} from "antd";
import useCustomer from "../hooks/useCustomer";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Customer } from "../Types/Customer";
import config from "../config";

const Customers = () => {
   const [form] = Form.useForm();
   const { customers, isLoading, isError,revalidate } = useCustomer();
   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const columns = [
      {
         title: "Id",
         dataIndex: "id",
         key: "id",
      },
      {
         title: "First Name",
         dataIndex: "firstName",
         key: "firstName",
      },
      {
         title: "Last Name",
         dataIndex: "lastName",
         key: "lastName",
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
      },
      {
         title: "Phone",
         dataIndex: "phone",
         key: "phone",
      },
      {
         title: "Actions",
         key: "actions",
         render: (_: any, record: any) => (
            <Space>
               <Button type="primary" ghost onClick={() => handleEdit(record)}>
                  Edit
               </Button>
               <Popconfirm
                  placement="bottomLeft"
                  title="Delete the customer"
                  description="Are you sure to delete this customer?"
                  onConfirm={() => handleDelete(record)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
               >
                  <Button danger>Delete</Button>
               </Popconfirm>
            </Space>
         ),
      },
   ];

   const cancel = () => {
      message.error("Operation cancelled");
   };

   const handleEdit = (record: any) => {
      setSelectedCustomer(record);
      setIsModalOpen(true);
      form.setFieldsValue(record);
      revalidate();
   };

   const handleDelete = async (record: any) => {
      try {
         await axios.delete(`http://localhost:3000/api/customers/${record.id}`,config);
         message.success("Customer deleted successfully");
         revalidate()
      } catch (error) {
         message.error("Failed to delete customer");
      }
   };

   const handleAddCustomer = () => {
      setSelectedCustomer(null);
      form.resetFields();
      setIsModalOpen(true);
      revalidate()

   };

   const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedCustomer(null);
   };

   const onFinish = async (values: any) => {
      try {

         const token = localStorage.getItem("access_token");
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
         if (selectedCustomer) {
            // Update customer
            await axios.patch(`http://localhost:3000/api/customers/${selectedCustomer.id}`, values,config);
            message.success("Customer updated successfully");
         } else {
            // Add customer
            await axios.post("http://localhost:3000/api/customers", values,config);
            message.success("Customer added successfully");
         }
         revalidate();
      } catch (error) {
         message.error("Failed to save customer");
      }
      handleModalClose();
   };

   if (isError) return <div>Failed to load customers</div>;

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Customers</Breadcrumb.Item>
         </Breadcrumb>
         <div className="flex justify-between items-center mb-3">
            <Descriptions title="Customer Details" layout="vertical" bordered></Descriptions>
            <Button type="primary" onClick={handleAddCustomer}>
               Add Customer
            </Button>
         </div>
         <Table dataSource={customers} columns={columns} loading={isLoading} rowKey="id" />
         <Modal
            title={selectedCustomer ? `Edit Customer Id: ${selectedCustomer.id}` : "Add Customer"}
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleModalClose}
            centered
         >
            <Form name="customer_details" onFinish={onFinish} form={form} layout="vertical">
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: "Please input the first name!" }]}
                     >
                        <Input prefix={<UserOutlined />} placeholder="First Name" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: "Please input the last name!" }]}
                     >
                        <Input prefix={<UserOutlined />} placeholder="Last Name" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please input the email!" }]}
                     >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: "Please input the phone number!" }]}
                     >
                        <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </>
   );
};

export default Customers;
