import { Breadcrumb, Descriptions, Table, Alert, Button, Popconfirm, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Invoice } from "../Types/Invoice";
import { Appointment } from "../Types/Appointment";
import { useInvoices } from "../hooks/useInvoice";
import config from "../config";
import axios from "axios";

const Invoices = () => {
   const columns = [
      {
         title: "Invoice Id",
         dataIndex: "id",
         key: "id",
      },
      {
         title: "Appointment Id",
         dataIndex: "appointmentId",
         key: "appointmentId",
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
         title: "Date",
         dataIndex: "createdAt",
         key: "date",
         render: (text: any) => new Date(text).toLocaleDateString(),
      },
      {
         title: "Time",
         dataIndex: "updatedAt",
         key: "time",
         render: (text: any) => new Date(text).toLocaleTimeString(),
      },
      {
         title: "Actions",
         key: "actions",
         render: (_: any, record: any) => (
            <Space>
               <Button type="primary" ghost onClick={() => navigate(`/invoices/${record.id}`)}>
                  Open
               </Button>
               <Popconfirm
                  placement="bottomLeft"
                  title="Delete the invoice"
                  description="Are you sure to delete this invoice?"
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

   const { invoices, isLoading, isError, revalidate } = useInvoices();
   const navigate = useNavigate();

   if (isError) {
      return <Alert message="Error" description="Failed to load invoices" type="error" />;
   }

   const handleDelete = async (record: any) => {
      try {
         await axios.delete(`http://localhost:3000/api/invoices/${record.id}`, config);
         message.success("Invoice deleted successfully");
         revalidate();
      } catch (error) {
         message.error("Failed to delete Invoice");
      }
   };

   const cancel = () => {
      message.error("Operation cancelled");
   };

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Invoices</Breadcrumb.Item>
         </Breadcrumb>
         <Descriptions title="Invoice Details" layout="vertical" bordered />
         <Table<Invoice>
            loading={isLoading}
            columns={columns}
            dataSource={invoices}
            rowKey="id"
            // onRow={(record) => ({
            //    onClick: () => {
            //       navigate(`/invoices/${record.id}`);
            //    },
            // })}
         />
      </>
   );
};

export default Invoices;
