import { Table, Tag, Space, Image, Button } from 'antd';
import VariantActions from './VariantActions';
import React from 'react';

type Variant = {
  id: number;
  image: string;
  size: string;
  color: string;
  colorCode: string;
  quantity: number;
  status: 'Mở bán' | 'Dừng bán';
};

type Props = {
  variants: Variant[];
  onEdit: (id: number) => void;
  onStop: (id: number) => void;
};

const VariantTable: React.FC<Props> = ({ variants, onEdit, onStop }) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      render: (src: string) => <Image src={src} width={50} height={60} />,
    },
    {
      title: 'Kích cỡ',
      dataIndex: 'size',
    },
   
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string) =>
        status === 'Mở bán' ? (
          <Tag color="green">Mở bán</Tag>
        ) : (
          <Tag color="red">Dừng bán</Tag>
        ),
    },
    {
      title: 'Chức năng',
      render: (_: any, record: Variant) => (
        <VariantActions
          variantId={record.id}
          onEdit={onEdit}
          onStop={onStop}
        />
      ),
    },
  ];

  return (
    <>
      <Button type="primary" style={{ backgroundColor: '#1890ff', color: '#ffffff', marginBottom: 16 }}>
        Thêm biến thể mới
      </Button>
      <Table
        dataSource={variants}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default VariantTable;
