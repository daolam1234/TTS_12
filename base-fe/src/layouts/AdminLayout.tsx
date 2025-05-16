// src/components/LayoutWithSidebar.js
import React, { useState } from 'react';
import { Layout } from 'antd';
import SidebarComponent from '@/components/admin/sidebar';
import HeaderComponent from '@/components/admin/header';


const { Content } = Layout;

const Layoutadmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <SidebarComponent collapsed={collapsed} />

      {/* Nội dung chính */}
      <Layout>
        <HeaderComponent collapsed={collapsed} toggle={toggle} />
        <Content
          style={{
            margin: '16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          Đây là nội dung chính.
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layoutadmin;
