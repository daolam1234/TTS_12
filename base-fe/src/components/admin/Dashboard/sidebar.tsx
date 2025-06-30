

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
  CommentOutlined, // 👈 THÊM ICON CHO BÌNH LUẬN
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { SubMenu } = Menu;

export default function Sidebar() {
  const location = useLocation();

  // Xác định key đang chọn dựa trên đường dẫn hiện tại
  const selectedKey = (() => {
    if (location.pathname.startsWith("/admin/accounts/admins")) return "admin-account";
    if (location.pathname.startsWith("/admin/accounts/customers")) return "customer-account";
    if (location.pathname.startsWith("/admin/products")) return "products";
    if (location.pathname.startsWith("/admin/banners")) return "banners";
    if (location.pathname.startsWith("/admin/categorys")) return "categorys";
    if (location.pathname.startsWith("/admin/size")) return "size";
    if (location.pathname.startsWith("/admin/Voucher")) return "Voucher";
    if (location.pathname.startsWith("/admin/billing")) return "billing";
    if (location.pathname.startsWith("/admin/rtl")) return "rtl";
    if (location.pathname.startsWith("/admin/profile")) return "profile";
    if (location.pathname.startsWith("/admin/comments")) return "comments";
    return "home";
  })();

  return (
    <Menu
      mode="inline"
      theme="light" // ✅ Giao diện màu sáng
      selectedKeys={[selectedKey]} // ✅ Highlight theo trang đang xem

    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/admin">Home</Link>
      </Menu.Item>

      <Menu.Item key="products" icon={<AppstoreOutlined />}>
        <Link to="/admin/products">Quản lý sản phẩm</Link>
      </Menu.Item>

        <Menu.Item key="admin-account" icon={<UserOutlined />}>
          <Link to="/admin/account">tài khoản </Link>
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

     

      <Menu.Item key="Voucher" icon={<TagOutlined />}>
        <Link to="/admin/shipping">Quản lý phương thức vận chuyển</Link>
      </Menu.Item>

      

     
    </Menu>
  );
}
