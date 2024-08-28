import { Breadcrumb, Descriptions, Table } from "antd";
import { useFaults } from "../hooks/useFaults";

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
   

   if (error) return <div>Failed to load customer</div>;
  

   return (
      <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Faults</Breadcrumb.Item>
            <Breadcrumb.Item>Phones</Breadcrumb.Item>
         </Breadcrumb>
         <Descriptions title="Phone Faults" layout="vertical" bordered></Descriptions>
         <Table columns={columns} dataSource={Faults} loading={isLoading} />
      </>
   );
};

export default FaultPhone;
