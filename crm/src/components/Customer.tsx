import { Breadcrumb, Skeleton, Table } from "antd";
import useCustomer from "../hooks/useCustomer";
import { useEffect } from "react";

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

   // if (isLoading) {
   //    return (
   //       <div className="containers">
   //          <Skeleton active />
   //       </div>
   //    );
   // }

   if (isError) return <div>Failed to load customer</div>;
   // useEffect(() => {
   //    document.title = "Customers";
   // }, []);
   return (
      <div>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Customers</Breadcrumb.Item>
         </Breadcrumb>
         <h2 className="text-2xl mb-3 font-medium">Customers</h2>
         <Table dataSource={customers} columns={columns} loading={isLoading} />;
      </div>
   );
};

export default Customer;
