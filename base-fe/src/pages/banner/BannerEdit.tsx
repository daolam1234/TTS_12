import FormEditBanner from "@/components/admin/Banner/FormEdit";

const BannerEditPage = () => {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-6">Chỉnh sửa banner</h2>
      <FormEditBanner />
    </div>
  );
};

export default BannerEditPage;
