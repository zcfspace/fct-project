import React from "react";
import Aside from "./aside";
import Navbar from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="overflow-y-hidden w-full xl:h-screen bg-gray-50">
      <Aside />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Navbar />
        <div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
