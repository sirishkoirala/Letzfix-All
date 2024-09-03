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
   Checkbox,
   Select,
} from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import config from "../config";
import { useUser } from "../hooks/useUser";
import { User } from "../Types/User";
import { useStores } from "../hooks/useStores";
import { Option } from "antd/es/mentions";

const Users = () => {
   const [form] = Form.useForm();
   const { users = [], isLoading, isError, revalidate } = useUser();
   const [selectedUser, setSelectedUser] = useState<User | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const { stores = [] } = useStores();

   const columns = [
      {
         title: "Id",
         dataIndex: "id",
         key: "id",
      },
      {
         title: "User Name",
         key: "userId",
         render: (_: any, data: User) => `${data.firstName} ${data.lastName}`,
      },
      {
         title: "Store Name",
         key: "storeName",
         render: (_: any, record: User) => {
            return record.store ? record.store.name : "All Stores";
         },
      },

      {
         title: "Is Verified",
         dataIndex: "isVerified",
         key: "isVerified",
         render: (isVerified: boolean) => (isVerified ? "Yes" : "No"),
      },
      {
         title: "Is Active",
         dataIndex: "isActive",
         key: "isActive",
         render: (isActive: boolean) => (isActive ? "Yes" : "No"),
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
                  title="Delete the user"
                  description="Are you sure to delete this user?"
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
      setSelectedUser(record);
      setIsModalOpen(true);
      form.setFieldsValue(record);
      revalidate();
   };

   const handleDelete = async (record: any) => {
      try {
         await axios.delete(`http://localhost:3000/api/users/${record.id}`, config);
         message.success("User deleted successfully");
         revalidate();
      } catch (error) {
         message.error("Failed to delete user");
      }
   };

   const handleAddUser = () => {
      setSelectedUser(null);
      form.resetFields();
      setIsModalOpen(true);
      revalidate();
   };

   const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedUser(null);
   };

   const onFinish = async (values: any) => {
      try {
         let updatedUser;
         if (selectedUser) {
            // Update user
            const response = await axios.patch(`http://localhost:3000/api/users/${selectedUser.id}`, values, config);
            updatedUser = response.data;
            message.success("User updated successfully");
         } else {
            // Add user
            const response = await axios.post("http://localhost:3000/api/users", values, config);
            updatedUser = response.data;
            message.success("User added successfully");
         }

         // Update the local users list with the updated user data
         const newUsers = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
         revalidate(newUsers);
      } catch (error) {
         message.error("Failed to save user");
      }
      handleModalClose();
   };

   if (isError) return <div>Failed to load users</div>;

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
         </Breadcrumb>
         <div className="flex justify-between items-center mb-3">
            <Descriptions title="User Details" layout="vertical" bordered></Descriptions>
            <Button type="primary" onClick={handleAddUser}>
               Add User
            </Button>
         </div>
         <Table dataSource={users} columns={columns} loading={isLoading} rowKey="id" />
         <Modal
            title={selectedUser ? `Edit User Id: ${selectedUser.id}` : "Add User"}
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleModalClose}
            centered
         >
            <Form name="user_details" onFinish={onFinish} form={form} layout="vertical">
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
                        label="Store Name"
                        name="storeId"
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
                     <Form.Item label="Is Active" name="isActive" valuePropName="checked" layout="horizontal">
                        <Checkbox />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item label="Is Verified" name="isVerified" valuePropName="checked" layout="horizontal">
                        <Checkbox />
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </>
   );
};

export default Users;
