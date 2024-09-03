import { useState } from "react";
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
   PopconfirmProps,
} from "antd";
import { useStores } from "../hooks/useStores";
import {
   UserOutlined,
   HomeOutlined,
   EnvironmentOutlined,
   PhoneOutlined,
   MailOutlined,
   GlobalOutlined,
} from "@ant-design/icons";
import { Store } from "../Types/Store";
import axios from "axios";
import config from "../config";

const Stores = () => {
   const [form] = Form.useForm();
   const { stores, isLoading, isError, revalidate } = useStores();
   const [selectedStore, setSelectedStore] = useState<Store | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const columns = [
      {
         title: "Id",
         dataIndex: "id",
         key: "id",
      },
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Address1",
         dataIndex: "address1",
         key: "address1",
      },
      {
         title: "Address2",
         dataIndex: "address2",
         key: "address2",
      },
      {
         title: "City",
         dataIndex: "city",
         key: "city",
      },
      {
         title: "State",
         dataIndex: "state",
         key: "state",
      },
      {
         title: "Country",
         dataIndex: "country",
         key: "country",
      },
      {
         title: "Postcode",
         dataIndex: "postcode",
         key: "postcode",
      },
      {
         title: "Phone",
         dataIndex: "phone",
         key: "phone",
      },
      {
         title: "Actions",
         key: "actions",
         render: (_: any, record: Store) => (
            <Space>
               <Button type="primary" ghost onClick={() => handleEdit(record)}>
                  Edit
               </Button>
               <Popconfirm
                  placement="bottomLeft"
                  title="Delete the store"
                  description="Are you sure you want to delete this store?"
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

   const cancel: PopconfirmProps["onCancel"] = () => {
      message.error("Cancelled");
   };

   const handleEdit = (record: any) => {
      setSelectedStore(record);
      setIsModalOpen(true);
      form.setFieldsValue(record);
   };

   const handleDelete = async (record: any) => {
      try {
         await axios.delete(`http://localhost:3000/api/stores/${record.id}`,config);
         message.success("Store deleted successfully");
         revalidate(); 
      } catch (error) {
         message.error("Failed to delete store");
         console.error("Error deleting store:", error);
      }
   };

   const handleAddStore = () => {
      setSelectedStore(null);
      form.resetFields();
      setIsModalOpen(true);
      revalidate();
   };

   const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedStore(null);
   };

   const onFinish = async (values: any) => {
      try {
         if (selectedStore) {
            // Update store
            await axios.patch(`http://localhost:3000/api/stores/${selectedStore.id}`, values,config);
            message.success("Store updated successfully");
         } else {
            // Add store
            await axios.post("http://localhost:3000/api/stores", values,config);
            message.success("Store added successfully");
         }
         revalidate();
      } catch (error) {
         message.error("Failed to save store");
         console.error("Error saving store:", error);
      }
      handleModalClose();
   };

   if (isError) return <div>Failed to load stores</div>;

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Stores</Breadcrumb.Item>
         </Breadcrumb>
         <div className="flex justify-between items-center mb-3">
            <Descriptions title="Store Details" layout="vertical" bordered></Descriptions>
            <Button type="primary" onClick={handleAddStore}>
               Add Store
            </Button>
         </div>
         <Table dataSource={stores} columns={columns} loading={isLoading} rowKey="id" />
         <Modal
            title={selectedStore ? `Edit Store Id: ${selectedStore.id}` : "Add Store"}
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleModalClose}
            centered
         >
            <Form name="store_details" onFinish={onFinish} form={form} layout="vertical">
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Store Name"
                        name="name"
                        rules={[{ required: true, message: "Please input the store name!" }]}
                     >
                        <Input prefix={<UserOutlined />} placeholder="Store Name" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Address Line 1"
                        name="address1"
                        rules={[{ required: true, message: "Please input the address line 1!" }]}
                     >
                        <Input prefix={<HomeOutlined />} placeholder="Address Line 1" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item label="Address Line 2" name="address2">
                        <Input prefix={<HomeOutlined />} placeholder="Address Line 2" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: "Please input the city!" }]}
                     >
                        <Input prefix={<EnvironmentOutlined />} placeholder="City" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="State"
                        name="state"
                        rules={[{ required: true, message: "Please input the state!" }]}
                     >
                        <Input prefix={<EnvironmentOutlined />} placeholder="State" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Country"
                        name="country"
                        rules={[{ required: true, message: "Please input the country!" }]}
                     >
                        <Input prefix={<GlobalOutlined />} placeholder="Country" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Postcode"
                        name="postcode"
                        rules={[{ required: true, message: "Please input the postcode!" }]}
                     >
                        <Input prefix={<MailOutlined />} placeholder="Postcode" />
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

export default Stores;
