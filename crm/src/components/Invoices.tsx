import { Breadcrumb, Descriptions, Table, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { Invoice } from "../Types/Invoice";
import { Appointment } from "../Types/Appointment";
import { useInvoices } from "../hooks/useInvoice";

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
];

const Invoices = () => {
   const { invoices, isLoading, isError } = useInvoices();
   const navigate = useNavigate();

   if (isError) {
      return <Alert message="Error" description="Failed to load invoices" type="error" />;
   }


   if (!invoices || invoices.length === 0) {
      return <Alert message="No Invoices" description="No invoices available at the moment." type="info" />;
   }

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
            rowKey="invoiceId"
            onRow={(record) => ({
               onClick: () => {
                  navigate(`/invoices/${record.id}`);
               },
            })}
         />
      </>
   );
};

export default Invoices;
