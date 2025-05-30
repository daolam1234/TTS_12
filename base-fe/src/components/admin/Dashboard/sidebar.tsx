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
    return "home";
  })();

  return (
    <Menu
      mode="inline"
      theme="light" // ✅ Giao diện màu sáng
      selectedKeys={[selectedKey]} // ✅ Highlight theo trang đang xem
    >
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

      {/* ✅ SubMenu dạng collapsible (mặc định đóng) */}
      <SubMenu key="account" icon={<UserOutlined />} title="Tài khoản">
        <Menu.Item key="admin-account">
          <Link to="/admin/account_admin">Admin</Link>
        </Menu.Item>
        <Menu.Item key="customer-account">
          <Link to="/admin/account_user">Khách hàng</Link>
        </Menu.Item>
      </SubMenu>

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
