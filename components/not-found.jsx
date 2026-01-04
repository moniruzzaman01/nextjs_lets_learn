import { BadgeX } from "lucide-react";

export default function NotFound({
  title = "Data Not Found",
  message = "The data you are searching for is available to show. Please refresh the page or let the author know about it",
  Icon = BadgeX,
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* Icon Section */}
      <div className="relative">
        <Icon className="w-20 h-20 text-red-500 p-3 bg-red-100 rounded-full border-slate-300 border-2" />
      </div>

      {/* Message Section */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <p className=" text-zinc-500">{message}</p>
      </div>
    </div>
  );
}
