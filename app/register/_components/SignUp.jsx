"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/auth-client";

export default function SignUp({ role }) {
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const name = firstName + " " + lastName;
    const email = formData.get("email");
    const password = formData.get("password");
    const userRole =
      role === "student" || role === "instructor" ? role : "student";
    const userData = {
      name,
      firstName,
      lastName,
      email,
      password,
      role: userRole,
    };

    try {
      const { data, error } = await authClient.signUp.email(userData);

      if (!error) {
        toast.success("Your registration is successful. Please Login!!!");
        router.push("/login");
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  name="first-name"
                  placeholder="Max"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  name="last-name"
                  placeholder="Robinson"
                  required
                />
              </div>
            </div>
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
              <Input id="password" name="password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
