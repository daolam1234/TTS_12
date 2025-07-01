import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  PictureOutlined,
  BarsOutlined,
  CreditCardOutlined,
  GlobalOutlined,
  UserOutlined,
  CommentOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const selectedKey = (() => {
    if (location.pathname.startsWith("/admin/accounts/admins")) return "admin-account";
    if (location.pathname.startsWith("/admin/accounts/customers")) return "customer-account";
    if (location.pathname.startsWith("/admin/products")) return "products";
    if (location.pathname.startsWith("/admin/banners")) return "banners";
    if (location.pathname.startsWith("/admin/categorys")) return "categorys";
    if (location.pathname.startsWith("/admin/size")) return "size";
    if (location.pathname.startsWith("/admin/coupon")) return "coupon";
    if (location.pathname.startsWith("/admin/shipping")) return "shipping";
    if (location.pathname.startsWith("/admin/comments")) return "comments";
    return "home";
  })();

  return (
    <Menu mode="inline" theme="light" selectedKeys={[selectedKey]}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/admin">Trang chủ</Link>
      </Menu.Item>

      <Menu.Item key="products" icon={<AppstoreOutlined />}>
        <Link to="/admin/products">Quản lý sản phẩm</Link>
      </Menu.Item>

      <Menu.Item key="admin-account" icon={<UserOutlined />}>
        <Link to="/admin/account">Tài khoản</Link>
      </Menu.Item>

      <Menu.Item key="order" icon={<PictureOutlined />}>
        <Link to="/admin/order">Quản lý đơn hàng</Link>
      </Menu.Item>

      <Menu.Item key="banners" icon={<PictureOutlined />}>
        <Link to="/admin/banners">Quản lý banner</Link>
      </Menu.Item>

      <Menu.Item key="categorys" icon={<BarsOutlined />}>
        <Link to="/admin/categorys">Quản lý danh mục</Link>
      </Menu.Item>

      <Menu.Item key="coupon" icon={<CreditCardOutlined />}>
        <Link to="/admin/coupon">Quản lý mã giảm giá</Link>
      </Menu.Item>

      <Menu.Item key="shipping" icon={<GlobalOutlined />}>
        <Link to="/admin/shipping">Phương thức vận chuyển</Link>
      </Menu.Item>

      <Menu.Item key="comments" icon={<CommentOutlined />}>
        <Link to="/admin/comments">Quản lý bình luận</Link>
      </Menu.Item>
    </Menu>
  );
}
