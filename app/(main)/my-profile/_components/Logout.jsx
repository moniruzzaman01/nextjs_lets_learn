"use client";

import { signOut } from "@/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };
  return (
    <LogOut
      onClick={handleSignOut}
      className=" absolute right-4 top-4 cursor-pointer border p-1 rounded-sm hover:bg-slate-100 hover:border-slate-100 transition-all duration-200"
    />
  );
}
