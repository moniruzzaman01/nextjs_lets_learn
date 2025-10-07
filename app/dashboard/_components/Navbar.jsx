"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "@/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function Navbar() {
  const { data: session, error, isPending } = useSession();
  const router = useRouter();

  if (error) {
    router.push("/login");
    toast.error(error.message);
  }
  const handleSignOut = async (event) => {
    event.preventDefault();
    await signOut();
    router.push("/");
    toast.success("Sign Out successfull!!!");
  };

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex items-center justify-end  w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              {isPending ? (
                <Spinner />
              ) : session?.user?.profilePicture ? (
                <Image
                  alt={session?.user?.firstName + " " + session?.user?.lastName}
                  className="w-[40px] h-[40px] rounded-full border border-black"
                  src={session?.user?.profilePicture}
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
              <Link href="#" onClick={handleSignOut}>
                LogOut
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
