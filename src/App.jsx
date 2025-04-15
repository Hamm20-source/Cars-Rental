import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SidebarDashboard from "./views/SidebarDashboard";
import { Authetication, Dashboard, routeList } from "./routes/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Semua halaman umum */}
        <Route path="/*" element={<MainLayout />} />

        {/* Semua halaman dashboard */}
        <Route path="/adminDashboard/*" element={<MainDashboards Dashboard={Dashboard}/>} />
      </Routes>
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();

  // Halaman yang tidak menampilkan Navbar & Footer
  const hideNavbarFooter = ["/login", "/signup"];

  return (
    <>
      {!hideNavbarFooter.includes(location.pathname) && <Navbar />}

        <Routes>
          {[...Authetication, ...routeList].map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>

      {!hideNavbarFooter.includes(location.pathname) && <Footer />}
    </>
  );
}

function MainDashboards({Dashboard}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-full overflow-hidden transition-all duration-300 ease-in-out">
    {/* Sidebar */}
    <SidebarDashboard open={open} setOpen={setOpen} />

    {/* Konten Utama */}
    <div className={`flex-1 w-96  md:top-0 px-5 md:p-10 md:ml-0 ml-8 transition-all duration-300 ease-in-out 
        ${open ? "md:ml-44" : ""}`}>
        <Routes>
            {Dashboard && Dashboard.map((route, index) => (
                <Route key={index} path={route.path.replace("/adminDashboard", "")} element={route.element} />
            ))}
        </Routes>

    </div>
  </div>
  );
}
