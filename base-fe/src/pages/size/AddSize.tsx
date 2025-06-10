
import FormAddSize from "@/components/admin/size/FormAdd";
import { useCreateSize } from "@/hooks/useSizes";

export default function SizeAddPage() {
  const { mutate: createSize, isPending } = useCreateSize();

  const handleAdd = (values: { name: string }) => {
    createSize(values);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-6">Thêm kích cỡ mới</h2>
      <FormAddSize onSubmit={handleAdd} loading={isPending} />
    </div>
  );
}
