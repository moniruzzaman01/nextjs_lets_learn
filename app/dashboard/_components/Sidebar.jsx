import { Logo } from "@/components/logo";
import SidebarItems from "./SidebarItems";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarItems />
      </div>
    </div>
  );
};

export default Sidebar;
