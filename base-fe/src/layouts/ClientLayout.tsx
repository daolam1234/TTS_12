import CustomerSection from "@/components/layout/CustomerSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export default function ClientLayout() {
  return (
    <div>
        <div><Header/></div>
        <div><Outlet/></div>
        <div><CustomerSection/></div>
        <div><Footer/></div>
    </div>
  );
}
