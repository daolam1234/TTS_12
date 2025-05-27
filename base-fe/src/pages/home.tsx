// src/pages/admin/Homeadmin.tsx
import { Row, Col } from "antd";
import SummaryCard from "@/components/admin/Dashboard/SummaryCard";
import DesignTipsCard from "@/components/admin/Dashboard/DesignTipsCard";
import ProductTable from "@/components/admin/Dashboard/ProductTable";
import LineChart from "@/components/admin/Dashboard/LineChart";

import AdminLayout from "@/layouts/AdminLayout";
import {
  DollarOutlined,
  UserOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
export default function Homeadmin() {
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
    <AdminLayout>
      <Row gutter={16}>
        {summaryCards.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <SummaryCard {...card} />
          </Col>
        ))}
      </Row>

      <Row gutter={16} className="mt-6">
        <Col xs={24} lg={16}>
          <LineChart />
        </Col>
        <Col xs={24} lg={8}>
          <DesignTipsCard />
        </Col>
      </Row>

      <div className="mt-6 overflow-auto">
      <h2 className="text-lg font-semibold mb-2 text-red-500">🔥 Sản phẩm bán chạy</h2>
        <ProductTable />
      </div>
    </AdminLayout>
  );
}
