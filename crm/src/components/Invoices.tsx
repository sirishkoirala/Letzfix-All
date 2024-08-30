
import { Table, Typography, Row, Col, Divider, Space } from "antd";

const { Title, Text } = Typography;

const Invoices = () => {
   const columns = [
      {
         title: "Fault",
         dataIndex: "fault",
         key: "fault",
      },
      {
         title: "Amount",
         dataIndex: "amount",
         key: "amount",
         align: "right",
      },
      {
         title: "Tax",
         dataIndex: "tax",
         key: "tax",
         align: "right",
      },
      {
         title: "Total",
         dataIndex: "total",
         key: "total",
         align: "right",
      },
   ];

   const data = [
      {
         key: "1",
         fault: "Engine Tune-up",
         amount: "$99.99",
         tax: "$9.00",
         total: "$108.99",
      },
      {
         key: "2",
         fault: "Brake Inspection",
         amount: "$79.99",
         tax: "$7.20",
         total: "$87.19",
      },
      {
         key: "3",
         fault: "Oil Change",
         amount: "$49.99",
         tax: "$4.50",
         total: "$54.49",
      },
   ];

   return (
      <div className="bg-background p-8 sm:p-12">
         <div className="mx-auto max-w-[800px] rounded-lg border bg-white p-6 sm:p-10">
            <Row gutter={[16, 16]} align="middle" justify="space-between">
               <Col>
                  <Space size="middle">
                     <img
                        src="/placeholder.svg"
                        alt="Company Logo"
                        width={48}
                        height={48}
                        style={{ borderRadius: "4px", objectFit: "cover" }}
                     />
                     <div>
                        <Title level={2}>Acme Inc.</Title>
                        <Text type="secondary">123 Main St, Anytown USA 12345</Text>
                        <br />
                        <Text type="secondary">support@acme.com | (555) 555-5555</Text>
                     </div>
                  </Space>
               </Col>
               <Col>
                  <div style={{ textAlign: "right" }}>
                     <Title level={2}>Invoice #1234</Title>
                     <Text type="secondary">Issued: April 15, 2023</Text>
                     <br />
                     <Text type="secondary">Due: May 15, 2023</Text>
                  </div>
               </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]}>
               <Col span={12}>
                  <Title level={3}>Customer</Title>
                  <Text type="secondary">Liam Johnson</Text>
                  <br />
                  <Text type="secondary">123 Main St, Anytown USA 12345</Text>
                  <br />
                  <Text type="secondary">liam@example.com</Text>
                  <br />
                  <Text type="secondary">(555) 555-5555</Text>
               </Col>
               <Col span={12}>
                  <Title level={3}>Appointment</Title>
                  <Text type="secondary">Date: April 20, 2023</Text>
                  <br />
                  <Text type="secondary">Time: 2:00 PM</Text>
                  <br />
                  <Text type="secondary">Service: Tune-up</Text>
               </Col>
            </Row>
            <Divider />
            <Title level={3}>Invoice Items</Title>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Divider />
            <Row justify="space-between" align="middle">
               <Col>
                  <Title level={3}>Total</Title>
               </Col>
               <Col>
                  <Title level={2}>$250.67</Title>
               </Col>
            </Row>
         </div>
      </div>
   );
};

export default Invoices;
