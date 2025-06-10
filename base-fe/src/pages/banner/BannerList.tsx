
import { Link } from "react-router-dom";
import { Button } from "antd";
import TableBanner from "@/components/admin/Banner/BannerTable";
import { useBanners } from "@/hooks/usebanner";

const BannerListPage = () => {
  const { data: banners } = useBanners();

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Danh sách banner</h2>
        <Link to="/admin/banners/add">
          <Button type="primary">Thêm mới</Button>
        </Link>
      </div>
      <TableBanner banners={banners || []} />
    </div>
  );
};

export default BannerListPage;
