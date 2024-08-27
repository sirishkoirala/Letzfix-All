 
import { Skeleton, Table } from "antd";
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

   if (isLoading) {
      return (
         <div className="containers">
            <Skeleton active />
         </div>
      );
   }
   
   if (isError) return <div>Failed to load customer</div>;

   return (
      <div>
         <Table dataSource={customers} columns={columns} />;
      </div>
   );
   
};

export default Customer;
