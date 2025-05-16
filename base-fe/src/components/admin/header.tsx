
import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderComponent = ({ collapsed, toggle }: { collapsed: boolean; toggle: () => void }) => {
  return (
    <Header
      style={{
        padding: 0,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
      <h2 style={{ marginLeft: 16 }}>Quản lý hệ thống</h2>
    </Header>
  );
};

export default HeaderComponent;
