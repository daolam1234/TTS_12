import { useList } from "@/hooks/useCategory";
import { Button, Image, Table } from "antd"
import { Link } from "react-router-dom"

export default function TableCategory() {
 const { data, isLoading } = useList({ resource: "categories" });
const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Tên", dataIndex: "name" },
    {
        title: "Hinh ảnh",
        dataIndex: "image",
        key: "image",
        render: (imageSrc: string) => <Image src={imageSrc} width={100} />,
    },
    { title: "Mô tả", dataIndex: "description" },
    { title: "Ngày tạo", dataIndex: "createdAt" },
    {
        title: "Thao tác",
        render: (_: any, category: any) => (
            <>
             <Button>
                <Link to={`/edit/${category.id}`}>Edit</Link>
            </Button>
            <Button danger>ẨN </Button>
            
            </>
           
        ),
    },
];

        
    
  return   <Table  dataSource={data}  columns={columns} loading={isLoading} />
}