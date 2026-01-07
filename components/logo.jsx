// import Image from "next/image";
// import logo from "@/assets/next.svg";
// import { cn } from "@/lib/utils";
import { Italianno } from "next/font/google";
const italianno = Italianno({
  weight: ["400"],
  subsets: ["latin"],
});
export const Logo = ({ className = "" }) => {
  return (
    // <Image className={cn("max-w-[100px]", className)} src={logo} alt="logo" />
    <div className={`capitalize text-5xl ${italianno.className}`}>
      let's learn
    </div>
  );
};
