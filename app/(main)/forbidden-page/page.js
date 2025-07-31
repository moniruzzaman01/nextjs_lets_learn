import { Button } from "@/components/ui/button";
import { AlertTriangle, Lock } from "lucide-react";
import Link from "next/link";

export default function ForbiddenAccessPage() {
  return (
    <div className="flex flex-col min-h-[60vh] items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {/* Icon Section */}
        <div className="relative">
          <Lock className="w-20 h-20 text-red-500 p-3 bg-red-100 rounded-full border-black border-2" />
          <AlertTriangle className="absolute -top-1 -right-1 w-6 h-6 fill-red-500" />
        </div>

        {/* Message Section */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Access Denied</h1>
          <p className=" text-zinc-500">
            You don&apos;t have permission to view this page. Please check your
            account privileges or contact support if you believe this is an
            error.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <Button asChild variant="default" size="lg">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Support</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/login">Sign In as Different User</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
