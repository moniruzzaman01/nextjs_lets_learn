"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/me");
      const data = await res.json();
      setLoggedInUser(data);
    })();
  }, []);

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex items-center justify-end  w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              {loggedInUser?.profilePicture ? (
                <Image
                  alt={loggedInUser?.firstName + " " + loggedInUser?.lastName}
                  className="w-[40px] h-[40px] rounded-full border border-black"
                  src={loggedInUser?.profilePicture}
                  height={40}
                  width={40}
                />
              ) : (
                <CircleUserRound className="w-[40px] h-[40px]" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-4">
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="#" onClick={signOut}>
                LogOut
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
