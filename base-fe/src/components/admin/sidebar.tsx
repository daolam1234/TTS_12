// src/components/SidebarComponent.js
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const SidebarComponent = ({ collapsed = false }: { collapsed?: boolean }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className="logo"
        style={{
          height: 64,
          margin: 16,
       
        }}
      ><a href="" className="text-xl text-white font-bold">12 SNEAKER</a></div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Trang chủ
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
          Sản phẩm
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          Tài khoản
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarComponent;
