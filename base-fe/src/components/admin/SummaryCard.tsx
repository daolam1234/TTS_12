import { Card, Typography } from "antd";

const { Text } = Typography;

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  bg: string;
}

export default function SummaryCard({ title, value, change, icon, bg }: SummaryCardProps) {
  return (
    <Card className={`text-white ${bg}`}>
      <div className="flex justify-between items-center">
        <div>
          <Text strong>{title}</Text>
          <div className="text-xl font-semibold">{value}</div>
          <div className="text-sm">{change}</div>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </Card>
  );
}
