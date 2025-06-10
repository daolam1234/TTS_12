
import SizeTable from "@/components/admin/size/TableSize";
import { useSizes, useSoftDeleteSize } from "@/hooks/useSizes";
import { Spin } from "antd";

export default function SizeListPage() {
  const { data: sizes, isLoading } = useSizes();
  const { mutate: removeSize, isPending } = useSoftDeleteSize();

  const handleDelete = (id: string | number) => {
    removeSize(id);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Quản lý kích cỡ</h2>
      </div>

      {isLoading || isPending ? (
        <div className="text-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <div className="mt-6 overflow-auto">
          <SizeTable sizes={sizes || []} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
