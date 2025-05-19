export default function Header() {
    return (
        <div>
            <div className="bg-black h-10 flex items-center justify-center">
                <p className="font-Jaini Purva text-white">
                    12 SNEAKER AUTHENTIC 100% - 128 Đống Đa, Hà Nội
                </p>
            </div>

            <header className="flex items-center justify-between px-4 py-3 border-b">
                <a href="" className="text-xl font-bold">12 SNEAKER</a>
                <nav className="space-x-4 hidden md:flex gap-[0.313rem]">
                    <a href="#" className="hover:text-blue-600">SNEAKER</a>
                    <a href="#" className="hover:text-blue-600">SLIDE</a>
                    <a href="#" className="hover:text-blue-600">BAG</a>
                    <a href="#" className="hover:text-blue-600">KHUYẾN MÃI</a>
                    <a href="#" className="hover:text-blue-600">LIÊN HỆ</a>
                </nav>
                <div className="flex space-x-3">
                    <a href="">🔍</a>
                    <a href="">❤️</a>
                    <a href="">👤</a>
                </div>
            </header>
            <div className="h-56 w-full overflow-hidden">
                <img
                    src="https://theme.hstatic.net/1000383440/1001166005/14/slideshow_1.jpg?v=227"
                    alt="Banner Sneaker"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>


    );
}