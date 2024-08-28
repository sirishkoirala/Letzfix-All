import { Breadcrumb, Descriptions, Table } from "antd";
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
  
   if (isError) return <div>Failed to load customer</div>;

  
   return (
      <div>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Devices</Breadcrumb.Item>
            <Breadcrumb.Item>Phones</Breadcrumb.Item>
         </Breadcrumb>
         <Descriptions title="Phone Details" layout="vertical" bordered></Descriptions>
         <Table columns={columns} dataSource={Models} loading={isLoading}/>
      </div>
   );
};

export default Phone;
