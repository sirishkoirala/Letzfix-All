import { Breadcrumb, Skeleton, Table } from "antd";
import { useFaults } from "../hooks/useFaults";
import { useEffect } from "react";

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
];

const FaultPhone = () => {
   const { Faults, isLoading, error } = useFaults();
   if (isLoading) {
      return (
         <div className="containers">
            <Skeleton active />
         </div>
      );
   }

   if (error) return <div>Failed to load customer</div>;
   useEffect(() => {
      document.title = "Faults | Phones";
   }, []);

   return (
      <div>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Faults</Breadcrumb.Item>
            <Breadcrumb.Item>Phones</Breadcrumb.Item>
         </Breadcrumb>
         <Table columns={columns} dataSource={Faults} />
      </div>
   );
};

export default FaultPhone;
