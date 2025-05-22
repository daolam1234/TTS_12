import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  PictureOutlined,
  BarsOutlined,
  CreditCardOutlined,
  GlobalOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";

export default function Sidebar() {
  return (
    <Menu mode="vertical" defaultSelectedKeys={["home"]}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="products" icon={<AppstoreOutlined />}>
        Quản lý sản phẩm
      </Menu.Item>
      <Menu.Item key="banners" icon={<PictureOutlined />}>
        Quản lý banner
      </Menu.Item>
      <Menu.Item key="categories" icon={<BarsOutlined />}>
        Quản lý danh mục
      </Menu.Item>
      <Menu.Item key="billing" icon={<CreditCardOutlined />}>
        Billing
      </Menu.Item>
      <Menu.Item key="rtl" icon={<GlobalOutlined />}>
        RTL
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="signin" icon={<LoginOutlined />}>
        Sign In
      </Menu.Item>
    </Menu>
  );
}
