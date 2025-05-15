import CustomerSection from "@/components/CustomerSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
