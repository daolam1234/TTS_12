import { useSoftDeleteBanner } from "@/hooks/usebanner";
import type { Banner } from "@/types/banner/banner";
import { Button, Table, Popconfirm, Space, Image } from "antd";
import { Link } from "react-router-dom";


interface Props {
  banners: Banner[];
}

const TableBanner = ({ banners }: Props) => {
  const { mutate: deleteBanner } = useSoftDeleteBanner();

  const columns = [
    {
      title: "STT",
      render: (_: unknown, __: Banner, index: number) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (url: string) => <Image src={url} alt="banner" width={100} />,
    },
    {
      title: "Tên banner",
      dataIndex: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
    },
    {
      title: "Thao tác",
      render: (_: unknown, record: Banner) => (
        <Space>
          <Link to={`/admin/banners/edit/${record.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc muốn xoá?"
            onConfirm={() => deleteBanner(record.id)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table rowKey="id" dataSource={banners} columns={columns} pagination={{ pageSize: 5 }} />;
};

export default TableBanner;
