import { Skeleton, Table } from "antd";
import { useDeviceModel } from "../hooks/useDeviceModel";

const columns = [
   {
      title: "Id",
      dataIndex: "id",
      key: "id",
   },
   {
      title: "Model",
      dataIndex: "name",
      key: "name",
   },
   {
      title: "Brand",
      dataIndex: "deviceBrandId",
      key: "deviceBrandId",
   },
];

const Phone = () => {
   const { Models, isLoading, isError } = useDeviceModel();
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
         <Table columns={columns} dataSource={Models} />
      </div>
   );
};

export default Phone;
