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
   Popconfirm,
   PopconfirmProps,
   message,
} from "antd";
import { useDeviceModel } from "../hooks/useDeviceModel";
import { DeviceModel } from "../Types/DeviceModel";

const Phones = () => {
   const [form] = Form.useForm();
   const { Models, isLoading, isError } = useDeviceModel();
   const [selectedModel, setSelectedModel] = useState<DeviceModel | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const columns = [
      {
         title: "Id",
         dataIndex: "id",
         key: "id",
      },
      {
         title: "Model",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Brand Name",
         dataIndex: ["deviceBrand", "name"],
         key: "BrandName",
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
                  title="Delete the model"
                  description="Are you sure to delete this model?"
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
      message.error("Click on No");
   };

   const handleEdit = (record: any) => {
      setSelectedModel(record);
      setIsModalOpen(true);
      form.setFieldsValue(record);
   };

   const handleDelete = async (record: any) => {
      try {
         await axios.delete(`http://localhost:3000/api/device-models/${record.id}`);
         message.success("Model deleted successfully");
      } catch (error) {
         message.error("Failed to delete model");
      }
   };

   const handleAddModel = () => {
      setSelectedModel(null);
      form.resetFields();
      setIsModalOpen(true);
   };

   const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedModel(null);
   };

   const onFinish = async (values: any) => {
      try {
         if (selectedModel) {
            // Update model
            await axios.patch(`http://localhost:3000/api/device-models/${selectedModel.id}`, values);
            message.success("Model updated successfully");
         } else {
            // Add model
            await axios.post("http://localhost:3000/api/device-models", values);
            message.success("Model added successfully");
         }
      } catch (error) {
         message.error("Failed to save model");
      }
      handleModalClose();
   };

   if (isError) return <div>Failed to load device models</div>;

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Devices</Breadcrumb.Item>
            <Breadcrumb.Item>Phones</Breadcrumb.Item>
         </Breadcrumb>
         <div className="flex justify-between items-center mb-3">
            <Descriptions title="Phone Details" layout="vertical" bordered></Descriptions>
            <Button type="primary" onClick={handleAddModel}>
               Add Model
            </Button>
         </div>
         <Table columns={columns} dataSource={Models} loading={isLoading} rowKey="id" />
         <Modal
            title={selectedModel ? `Edit Model Id: ${selectedModel.id}` : "Add Model"}
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleModalClose}
            centered
         >
            <Form name="model_details" onFinish={onFinish} form={form} layout="vertical">
               <Form.Item
                  label="Model Name"
                  name="name"
                  rules={[{ required: true, message: "Please input the model name!" }]}
               >
                  <Input placeholder="Model Name" />
               </Form.Item>
               <Form.Item
                  label="Brand Name"
                  name={["deviceBrand", "name"]}
                  rules={[{ required: true, message: "Please input the brand name!" }]}
               >
                  <Input placeholder="Brand Name" />
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};

export default Phones;
