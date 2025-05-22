import { Card, Typography } from "antd";
import { LineChart } from "lucide-react";

const { Text } = Typography;

export default function SalesOverview() {
  return (
    <Card title="Sales Overview">
      <Text className="text-green-600">↑ 4% more in 2021</Text>
      <div className="h-60 flex items-center justify-center text-gray-400">
      <LineChart/>
      </div>
    </Card>
  );
}
