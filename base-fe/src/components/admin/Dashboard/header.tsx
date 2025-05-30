import { Layout, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

interface HeaderProps {
  onToggleMenu: () => void;
  isMobile?: boolean;
}

export default function HeaderComponent({ onToggleMenu, isMobile }: HeaderProps) {
  return (
    <Header className="bg-white shadow-sm px-6 flex items-center justify-between">
      <Title level={3} className="m-0">Dashboard</Title>
      {isMobile && (
        <MenuOutlined
          onClick={onToggleMenu}
          className="text-xl cursor-pointer"
        />
      )}
    </Header>
  );
}
