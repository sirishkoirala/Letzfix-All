import { Breadcrumb, Skeleton, Table } from "antd";
import { useDeviceModel } from "../hooks/useDeviceModel";
import { useEffect } from "react";

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
      // title: "Brand",
      // dataIndex: "deviceBrandId",
      // key: "deviceBrandId",
      title: "Brand Name",
      dataIndex: ["deviceBrand", "name"],
      key: "BrandName",
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

   useEffect(() => {
      document.title = "Devices | Phones";
   }, []);
   return (
      <div>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Devices</Breadcrumb.Item>
            <Breadcrumb.Item>Phones</Breadcrumb.Item>
         </Breadcrumb>
         <Table columns={columns} dataSource={Models} />
      </div>
   );
};

export default Phone;
