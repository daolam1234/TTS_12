export default function Footer() {
    return (
        <div>
            <footer className="bg-gray-100 px-4 py-8 text-sm border-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-40">
                    <div>
                        <h3 className="font-semibold mb-2">GIỚI THIỆU</h3>
                        <p className="text-balance">BG SNEAKER BG SNEAKER mong muốn đem đến những trải nghiệm và dịch vụ tốt nhất cho khách hàng về các sản phẩm CHÍNH HÃNG</p>
                        <div className="flex space-x-2 mt-2">
                            <img src="/facebook.svg"  className="w-5" />
                            <img src="/instagram.svg"  className="w-5" />
                            <img src="/tiktok.svg"  className="w-5" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">LIÊN KẾT</h3>
                        <ul>
                            <li>Chính sách hoàn trả</li>
                            <li>Chính sách bảo mật</li>
                            <li>Chính sách vận chuyển</li>
                            <li>Chính sách đổi size</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">THÔNG TIN LIÊN HỆ</h3>
                        <p>Địa chỉ: Số 128 Đống Đa, Hà Nội</p>
                        <p>Điện thoại: 01299688706</p>
                        <p>Instagram: 12SNEAKER.VN</p>
                        <p>Email: Trungtran0108@gmail.com</p>
                    </div>
                </div>

            </footer>
            <p className="text-center  bg-black text-white">Copyright &copy; 2025 12 Sneaker</p>

        </div>


    );
}