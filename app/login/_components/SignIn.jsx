"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ManualLogin } from "@/app/action";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await ManualLogin(formData);
    if (response) router.push("/");
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {/* <Link href="#" className="ml-auto inline-block text-xs underline">
                Forgot your password?
              </Link> */}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <DropdownMenu>
              <DropdownMenuTrigger className=" underline">
                Register
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/register/student">Student</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register/instructor">Instructor</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
