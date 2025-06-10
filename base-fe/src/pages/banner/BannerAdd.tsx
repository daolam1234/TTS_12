import FormAddBanner from "@/components/admin/Banner/FormAddbanner";

const BannerAddPage = () => {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-6">Thêm banner mới</h2>
      <FormAddBanner />
    </div>
  );
};

export default BannerAddPage;