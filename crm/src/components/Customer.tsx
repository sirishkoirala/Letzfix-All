import { Breadcrumb, Descriptions, Table } from "antd";
import useCustomer from "../hooks/useCustomer";

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
];

const Customer = () => {
   const { customers, isLoading, isError } = useCustomer();

   if (isError) return <div>Failed to load customer</div>;
   
   return (
      <div>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Customers</Breadcrumb.Item>
         </Breadcrumb>
         <Descriptions title="Customer Details" layout="vertical" bordered>
         </Descriptions>
         <Table dataSource={customers} columns={columns} loading={isLoading} />;
      </div>
   );
};

export default Customer;
