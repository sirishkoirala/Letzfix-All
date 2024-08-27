import { Skeleton, Table } from "antd";
import { useStores } from "../hooks/useStores";

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
      key: "address",
   },
   {
      title: "Address2",
      dataIndex: "address2",
      key: "address",
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
];

const Store = () => {
   const { stores, isLoading,isError} =useStores();
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
         <Table dataSource={stores} columns={columns} />;
      </div>
   );
};

export default Store;
