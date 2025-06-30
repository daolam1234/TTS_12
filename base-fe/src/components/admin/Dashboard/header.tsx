import { Button, Layout, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useLogout } from "@/hooks/useAuth";

const { Header } = Layout;
const { Title } = Typography;

interface HeaderProps {
  onToggleMenu: () => void;
  isMobile?: boolean;
}

export default function HeaderComponent({ onToggleMenu, isMobile }: HeaderProps) {
  const logout = useLogout();
  return (
    <Header className="bg-white shadow-sm px-6 flex items-center justify-between">
      <Title level={3} className="m-0">Dashboard</Title>
      <Button danger onClick={logout}>
      Đăng xuất
    </Button>
      {isMobile && (
        <MenuOutlined
          onClick={onToggleMenu}
          className="text-xl cursor-pointer"
        />
      )}
    </Header>
  );
}
