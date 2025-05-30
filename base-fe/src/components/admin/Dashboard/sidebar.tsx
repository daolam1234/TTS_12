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
  TagOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Menu mode="vertical" defaultSelectedKeys={["home"]}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/admin/dashboard">Home</Link>
      </Menu.Item>
      <Menu.Item key="products" icon={<AppstoreOutlined />}>
        <Link to="/admin/products">Quản lý sản phẩm</Link>
      </Menu.Item>
      <Menu.Item key="banners" icon={<PictureOutlined />}>
        <Link to="/admin/banners">Quản lý banner</Link>
      </Menu.Item>
      <Menu.Item key="categorys" icon={<BarsOutlined />}>
        <Link to="/admin/categorys">Quản lý danh mục</Link>
      </Menu.Item>
      <Menu.Item key="size" icon={<SlidersOutlined />}>
        <Link to="/admin/size">Quản lý biến thể size</Link>
      </Menu.Item>
      <Menu.Item key="Voucher" icon={<TagOutlined />}>
        <Link to="/admin/Voucher">Quản lý mã giảm giá</Link>
      </Menu.Item>
      <Menu.Item key="billing" icon={<CreditCardOutlined />}>
        <Link to="/admin/billing">Billing</Link>
      </Menu.Item>
      <Menu.Item key="rtl" icon={<GlobalOutlined />}>
        <Link to="/admin/rtl">RTL</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/admin/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="signin" icon={<LoginOutlined />}>
        <Link to="/signin">Sign In</Link>
      </Menu.Item>
    </Menu>
  );
}