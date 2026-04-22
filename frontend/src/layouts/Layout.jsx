import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Layout = ({ children }) => {
  return (
    <div className="h-screen w-screen  overflow-x-hidden mt-16">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
// bg-[#1f2124]  text-white