// src/components/layouts/AdminLayout.tsx
import { Layout, Drawer, Grid } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/admin/Dashboard/sidebar";
import HeaderComponent from "@/components/admin/Dashboard/header";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

export default function AdminLayout() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile ? (
        <Sider width={220} className="bg-white shadow-md">
          <div className="text-center text-xl font-bold my-4">Admin</div>
          <Sidebar />
        </Sider>
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
