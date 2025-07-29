import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { dbConnect } from "@/service/mongo";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// const poppins = Poppins({
//   variable: "--font-poppins",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
// });
export const metadata = {
  title: "Lets Learn - Best learning platform for youth!",
  description: "Learn || Work || Prosper",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased"
          // poppins.variable
        )}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
