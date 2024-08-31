import { Table, Typography, Row, Col, Divider, Space } from "antd";
import { useInvoices } from "../hooks/useInvoice";
import { useFaults } from "../hooks/useFaults";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const InvoiceDescription = () => {
   const { id } = useParams<{ id: string }>();

   const { Faults = [] } = useFaults();

   const columns = [
      {
         title: "Fault Name",
         dataIndex: "faultId",
         key: "fault",
         render: (faultId: string) => {
            const fault = Faults.find((f) => f.id === faultId);
            return fault ? fault.name : "Fault not found";
         },
      },
      {
         title: "Amount",
         dataIndex: "amount",
         key: "amount",
         align: "right" as "right",
         render: (text: string) => `$${parseFloat(text).toFixed(2)}`,
      },
      {
         title: "Tax",
         dataIndex: "tax",
         key: "tax",
         align: "right" as "right",
         render: (text: string) => `$${parseFloat(text).toFixed(2)}`,
      },
      {
         title: "Total",
         dataIndex: "total",
         key: "total",
         align: "right" as "right",
         render: (_: string, record: any) => {
            const total = parseFloat(record.amount) + parseFloat(record.tax);
            return `$${total.toFixed(2)}`;
         },
      },
   ];

   const { invoices = [], isLoading, isError } = useInvoices();

   if (isError) return <div>Error loading invoices.</div>;
   const invoice = invoices.find((app) => app.id === Number(id));

   const dataSource = invoice?.invoiceItems?.map((item) => ({
      ...item,
      key: item.id,
      fault: item.fault?.name,
   }));

   const totalAmount =
      dataSource?.reduce((acc: number, item: any) => {
         const amount = parseFloat(item.amount) || 0;
         const tax = parseFloat(item.tax) || 0;
         return acc + amount + tax;
      }, 0) ?? 0;

   return (
      <div className="bg-background p-8 sm:p-12">
         <div className="mx-auto max-w-[800px] rounded-lg border bg-white p-6 sm:p-10">
            <Row gutter={[16, 16]} align="middle" justify="space-between">
               <Col>
                  <Space size="middle">
                     <img
                        src="/logo.jpg"
                        alt="Company Logo"
                        width={100}
                        style={{ borderRadius: "4px", objectFit: "cover" }}
                     />
                     <div>
                        {/* <Title level={3}>Letzfix Inc.</Title> */}
                        <Text type="secondary">123 Main St, Anytown 12345</Text>
                        <br />
                        <Text type="secondary">support@letzfix.com | (555) 555-5555</Text>
                     </div>
                  </Space>
               </Col>
               <Col>
                  <div style={{ textAlign: "right" }}>
                     <Title level={2}>Invoice #{invoice?.id}</Title>
                     <Text type="secondary">
                        Issued: {invoice?.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : "Date not available"}
                     </Text>

                     <br />
                     {/* <Text type="secondary">Due: {new Date(invoice?.invoiceDueDate).toLocaleDateString()}</Text> */}
                  </div>
               </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]}>
               <Col span={12}>
                  <Title level={3}>Customer</Title>
                  <Text type="secondary">
                     {invoice?.customer?.firstName} {invoice?.customer?.lastName}
                  </Text>
                  <br />
                  <Text type="secondary">{invoice?.customer?.email}</Text>
                  <br />
                  <Text type="secondary">{invoice?.customer?.phone}</Text>
               </Col>
               {/* <Col span={12}>
                  <Title level={3}>Appointment</Title>
                  <Text type="secondary">Date: {invoice?.appointment?.date}</Text>
                  <br />
                  <Text type="secondary">Time: {invoice?.appointment?.time}</Text>
                  <br />
                  <Text type="secondary">Store: {invoice?.storeId}</Text>
               </Col> */}
            </Row>
            <Divider />
            <Title level={3}>Invoice Items</Title>
            <Table columns={columns} dataSource={dataSource} pagination={false} loading={isLoading} />
            <Divider />
            <Row justify="space-between" align="middle">
               <Col>
                  <Title level={3}>Total</Title>
               </Col>
               <Col>
                  <Title level={2}>${totalAmount.toFixed(2)}</Title>
               </Col>
            </Row>
         </div>
      </div>
   );
};

export default InvoiceDescription;
