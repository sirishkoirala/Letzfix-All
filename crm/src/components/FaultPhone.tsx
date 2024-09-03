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
import { useFaults } from "../hooks/useFaults";
import { Fault } from "../Types/Fault";
import config from "../config";

const FaultPhone = () => {
   const [form] = Form.useForm();
   const { Faults, isLoading, isError, revalidate } = useFaults();
   const [selectedFault, setSelectedFault] = useState<Fault | null>(null);
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
         title: "Actions",
         key: "actions",
         render: (_: any, record: any) => (
            <Space>
               <Button type="primary" ghost onClick={() => handleEdit(record)}>
                  Edit
               </Button>
               <Popconfirm
                  placement="bottomLeft"
                  title="Delete the fault"
                  description="Are you sure to delete this fault?"
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
      setSelectedFault(record);
      setIsModalOpen(true);
      form.setFieldsValue(record);
      revalidate();
   };

   const handleDelete = async (record: any) => {
      try {
         await axios.delete(`http://localhost:3000/api/faults/${record.id}`, config);
         message.success("Fault deleted successfully");
         revalidate();
      } catch (error) {
         message.error("Failed to delete fault");
      }
   };

   const handleAddFault = () => {
      setSelectedFault(null);
      form.resetFields();
      setIsModalOpen(true);
      revalidate();
   };

   const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedFault(null);
   };

   const onFinish = async (values: any) => {
      try {
         if (selectedFault) {
            // Update fault
            await axios.patch(`http://localhost:3000/api/faults/${selectedFault.id}`, values, config);
            message.success("Fault updated successfully");
         } else {
            // Add fault
            await axios.post("http://localhost:3000/api/faults",values,config);
            message.success("Fault added successfully");
         }
         revalidate();
      } catch (error) {
         message.error("Failed to save fault");
      }
      handleModalClose();
   };

   if (isError) return <div>Failed to load faults</div>;

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Faults</Breadcrumb.Item>
            <Breadcrumb.Item>Phones</Breadcrumb.Item>
         </Breadcrumb>
         <div className="flex justify-between items-center mb-3">
            <Descriptions title="Phone Faults" layout="vertical" bordered></Descriptions>
            <Button type="primary" onClick={handleAddFault}>
               Add Fault
            </Button>
         </div>
         <Table columns={columns} dataSource={Faults} loading={isLoading} rowKey="id" />
         <Modal
            title={selectedFault ? `Edit Fault Id: ${selectedFault.id}` : "Add Fault"}
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleModalClose}
            centered
         >
            <Form name="fault_details" onFinish={onFinish} form={form} layout="vertical">
               <Form.Item
                  label="Fault Name"
                  name="name"
                  rules={[{ required: true, message: "Please input the fault name!" }]}
               >
                  <Input placeholder="Fault Name" />
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};

export default FaultPhone;
