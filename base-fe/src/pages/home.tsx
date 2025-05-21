import { Layout, Row, Col, Typography, Drawer, Grid } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import SummaryCard from "@/components/admin/SummaryCard";
import SalesOverview from "@/components/admin/SalesOverview";
import DesignTipsCard from "@/components/admin/DesignTipsCard";
import ProductTable from "@/components/admin/ProductTable";
import Sidebar from "@/components/admin/sidebar";
import { useState, useEffect } from "react";
import HeaderComponent from "@/components/admin/header";
import LineChart from "@/components/admin/LineChart";


const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function Homeadmin() {
  const screens = useBreakpoint();
  const isMobile = !screens.md; // md = 768px
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const summaryCards = [
    {
      title: "TODAY'S MONEY",
      value: "$53,000",
      change: "+55% since yesterday",
      icon: <DollarOutlined style={{ fontSize: 24, color: "white" }} />,
      bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
    },
    {
      title: "TODAY'S USERS",
      value: "2,300",
      change: "+3% since last week",
      icon: <UserOutlined style={{ fontSize: 24, color: "white" }} />,
      bg: "bg-gradient-to-r from-purple-500 to-blue-400",
    },
    {
      title: "NEW CLIENTS",
      value: "+3,462",
      change: "-2% since last quarter",
      icon: <TeamOutlined style={{ fontSize: 24, color: "white" }} />,
      bg: "bg-gradient-to-r from-red-400 to-orange-500",
    },
    {
      title: "SALES",
      value: "$103,430",
      change: "+5% than last month",
      icon: <ShoppingCartOutlined style={{ fontSize: 24, color: "white" }} />,
      bg: "bg-gradient-to-r from-yellow-500 to-orange-400",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile ? (
        <Layout.Sider width={220} className="bg-white shadow-md">
          <div className="text-center text-xl font-bold my-4">Admin</div>
          <Sidebar />
        </Layout.Sider>
      ) : (
        <Drawer
          title="Admin"
          placement="left"
          onClose={toggleDrawer}
          open={drawerVisible}
          bodyStyle={{ padding: 0 }}
        >
          <Sidebar />
        </Drawer>
      )}

      <Layout>
        <HeaderComponent onToggleMenu={toggleDrawer} isMobile={isMobile} />

        <Content className="p-6 bg-gray-100">
          <Row gutter={16}>
            {summaryCards.map((card, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <SummaryCard {...card} />
              </Col>
            ))}
          </Row>

          <Row gutter={16} className="mt-6">
            <Col xs={24} lg={16}>
                <LineChart/>
            </Col>
            <Col xs={24} lg={8}><DesignTipsCard /></Col>
          </Row>

          <div className="mt-6 overflow-auto"><ProductTable /></div>
        </Content>
      </Layout>
    </Layout>
  );
}
