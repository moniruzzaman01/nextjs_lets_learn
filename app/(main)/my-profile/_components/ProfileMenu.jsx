"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MENU = [
  { label: "My Profile", href: "/my-profile" },
  { label: "Enrolled Courses", href: "/my-profile/enrolled-courses" },
];

function ProfileMenu() {
  const pathname = usePathname();

  return (
    <ul className="mt-3 text-sm">
      {MENU.map((item, i) => (
        <li key={i}>
          <Link
            href={item.href}
            className={`flex items-center py-1 rounded ${
              pathname === item.href
                ? "text-primary underline"
                : "text-slate-400"
            }`}
          >
            <h6 className="font-semibold">{item?.label}</h6>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ProfileMenu;
