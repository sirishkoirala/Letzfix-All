import { Skeleton, Table } from "antd";
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
   if (isLoading) {
      return (
         <div className="containers">
            <Skeleton active />
         </div>
      );
   }

   if (error) return <div>Failed to load customer</div>;

   return (
      <div>
         <Table columns={columns} dataSource={Faults} />
      </div>
   );
};

export default FaultPhone;
