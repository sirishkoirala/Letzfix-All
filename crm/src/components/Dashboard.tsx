import React, { useState } from "react";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { IconMapPin } from "@tabler/icons-react";
import Customer from "./Customer";
import Store from "./Store";
import FaultPhone from "./FaultPhone";
import Phone from "./Phone";
import Appointment from "./Appointment";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
   return {
      key,
      icon,
      children,
      label,
   } as MenuItem;
}

const items: MenuItem[] = [
   getItem("Customer", "1", <UserOutlined />),
   getItem("Store", "2", <IconMapPin size={16} />),
   getItem("Fault", "sub1", <ExclamationCircleOutlined />, [getItem("Phone", "3"), getItem("Laptop", "4")]),
   getItem("Device", "sub2", <UserOutlined />, [
      getItem("Phone", "5"),
      getItem("Laptop", "6"),
      getItem("Tablets", "7"),
   ]),
   getItem("Appointment", "8", <UserOutlined />),
];

const Dashboard = () => {
   const [collapsed, setCollapsed] = useState(false);
   const [selectedKey, setSelectedKey] = useState("1");

   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const onMenuClick: MenuProps["onClick"] = (e) => {
      setSelectedKey(e.key);
   };

   const renderContent = () => {
      switch (selectedKey) {
         case "1":
            return <Customer />;
         case "2":
            return <Store />;
         case "3":
            return <FaultPhone />;
         case "4":
            return "Laptop Fault";
         case "5":
            return <Phone />;
         case "6":
            return "Laptop Device";
         case "7":
            return "Tablet Device ";
         case "8":
            return <Appointment />;
         default:
            return "";
      }
   };

   return (
      <Layout style={{ minHeight: "100vh" }}>
         <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} onClick={onMenuClick} />
         </Sider>
         <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: "0 16px" }}>
               <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>{selectedKey === "1" ? "Customer" : <></>}</Breadcrumb.Item>

                  {/* <Breadcrumb.Item>{}</Breadcrumb.Item> */}
               </Breadcrumb>
               <div
                  style={{
                     padding: 24,
                     minHeight: 360,
                     background: colorBgContainer,
                     borderRadius: borderRadiusLG,
                  }}
               >
                  {renderContent()}
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};

export default Dashboard;
