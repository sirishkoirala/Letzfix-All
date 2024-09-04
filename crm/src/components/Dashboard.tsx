import React, { useEffect, useState } from "react";
import {
   ExclamationCircleOutlined,
   FieldTimeOutlined,
   FileDoneOutlined,
   LaptopOutlined,
   UserAddOutlined,
   UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, Button, theme, message } from "antd";
import { IconMapPin } from "@tabler/icons-react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Customer from "./Customers";
import Stores from "./Stores";
import FaultPhone from "./FaultPhone";
import Phone from "./Phones";
import AppointmentDescription from "./AppointmentDescription";
import Appointments from "./Appointments";
import InvoiceDescription from "./InvoiceDescription";
import Invoices from "./Invoices";
import Users from "./Users";
import UserDescription from "./UserDescription";

interface DashboardProps {
   logout: () => void;
}

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
   getItem("Customers", "/customers", <UserOutlined />),
   getItem("Stores", "/stores", <IconMapPin size={16} />),
   getItem("Faults", "sub1", <ExclamationCircleOutlined />, [
      getItem("Phones", "/faults/phones"),
      getItem("Laptops", "/faults/laptops"),
   ]),
   getItem("Devices", "sub2", <LaptopOutlined />, [
      getItem("Phones", "/devices/phones"),
      getItem("Laptops", "/devices/laptops"),
      getItem("Tablets", "/devices/tablets"),
   ]),
   getItem("Appointments", "/appointments", <FieldTimeOutlined />),
   getItem("Invoices", "/invoices", <FileDoneOutlined />),
   getItem("Users", "/users", <UserAddOutlined />),
];

const Dashboard = ({ logout }: DashboardProps) => {
   const [collapsed, setCollapsed] = useState(false);
   const navigate = useNavigate();

   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   useEffect(() => {
      document.title = "Dashboard";
   }, []);

   const handleLogout = () => {
      message.success("Log Out Sucessfull !");
      navigate("/login");
      logout();
   };

   return (
      <>
         <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
               <div className="flex justify-center items-center pt-4 mb-2">
                  <div
                     className="demo-logo-vertical h-6 w-24"
                     style={{
                        backgroundImage: "url(/logoDarkMode.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                     }}
                  />
               </div>

               <Menu theme="dark" defaultSelectedKeys={["/customer"]} mode="inline" items={items} />
            </Sider>
            <Layout>
               <Header
                  style={{
                     padding: 0,
                     background: colorBgContainer,
                     display: "flex",
                     justifyContent: "flex-end",
                     alignItems: "center",
                     paddingRight: "16px",
                  }}
               >
                  <Button type="primary" onClick={handleLogout}>
                     Logout
                  </Button>
               </Header>
               <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
                  <div
                     style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                     }}
                  >
                     <Routes>
                        <Route path="/customers" element={<Customer />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/faults/phones" element={<FaultPhone />} />
                        <Route path="/faults/laptops" element={<div>Laptop Fault</div>} />
                        <Route path="/devices/phones" element={<Phone />} />
                        <Route path="/devices/laptops" element={<div>Laptop Device</div>} />
                        <Route path="/devices/tablets" element={<div>Tablet Device</div>} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/appointments/:id" element={<AppointmentDescription />} />
                        <Route path="/invoices" element={<Invoices />} />
                        <Route path="/invoices/:id" element={<InvoiceDescription />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<UserDescription />} />
                     </Routes>
                  </div>
               </Content>
            </Layout>
         </Layout>
      </>
   );
};

export default Dashboard;
