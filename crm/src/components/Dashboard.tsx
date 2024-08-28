import React, { useState } from "react";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { IconMapPin } from "@tabler/icons-react";
import { Routes, Route, Link } from "react-router-dom";
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
      label: <Link to={key.toString()}>{label}</Link>,
   } as MenuItem;
}

const items: MenuItem[] = [
   getItem("Customer", "/customer", <UserOutlined />),
   getItem("Store", "/store", <IconMapPin size={16} />),
   getItem("Fault", "sub1", <ExclamationCircleOutlined />, [
      getItem("Phone", "/fault/phone"),
      getItem("Laptop", "/fault/laptop"),
   ]),
   getItem("Device", "sub2", <UserOutlined />, [
      getItem("Phone", "/device/phone"),
      getItem("Laptop", "/device/laptop"),
      getItem("Tablets", "/device/tablets"),
   ]),
   getItem("Appointment", "/appointment", <UserOutlined />),
];

const Dashboard = () => {
   const [collapsed, setCollapsed] = useState(false);

   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   return (
      <Layout style={{ minHeight: "100vh" }}>
         <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={["/customer"]} mode="inline" items={items} />
         </Sider>
         <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: "0 16px" }}>
               <Breadcrumb style={{ margin: "16px 0" }}>
               </Breadcrumb>
               <div
                  style={{
                     padding: 24,
                     minHeight: 360,
                     background: colorBgContainer,
                     borderRadius: borderRadiusLG,
                  }}
               >
                  <Routes>
                     <Route path="/customer" element={<Customer />} />
                     <Route path="/store" element={<Store />} />
                     <Route path="/fault/phone" element={<FaultPhone />} />
                     <Route path="/fault/laptop" element={<div>Laptop Fault</div>} />
                     <Route path="/device/phone" element={<Phone />} />
                     <Route path="/device/laptop" element={<div>Laptop Device</div>} />
                     <Route path="/device/tablets" element={<div>Tablet Device</div>} />
                     <Route path="/appointment" element={<Appointment />} />
                  </Routes>
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};

export default Dashboard;
