import React from "react";
import Sidebar from "./_components/Sidebar";

function Layout({ tabs }) {
  return (
    <section className="relative pb-16">
      <div className="container relative mt-10">
        <div className="lg:flex">
          {/* left side content - dynamic */}
          <Sidebar />
          {/* right side content - dynamic */}
          <div className="lg:w-3/4 md:px-3 mt-[30px] lg:mt-0">{tabs}</div>
        </div>
      </div>
    </section>
  );
}

export default Layout;
