import { Outlet } from "@tanstack/react-location";

import Footer from "/src/components/layouts/footer";
import Header from "/src/components/layouts/header";
import Notifications,{notify} from 'react-notify-toast';
import { useEffect } from "react";


export default function Layout() {


  return (
    
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container flex-1 py-4 mt-16 lg:py-8">
      <Notifications />
        <Outlet />
      </div>
      <Footer />
    </div>
    </>
  );
}
