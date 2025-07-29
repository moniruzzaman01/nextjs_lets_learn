"use client";

import { updatePassword } from "@/app/action/profile-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetPassword({ email }) {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setPasswords({ ...passwords, [field]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updatePassword(email, passwords);
      toast.success("Password Reseted successfully!!!");
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password :</h5>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
              type="password"
              placeholder="Old password"
              name="oldPassword"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
              type="password"
              placeholder="New password"
              name="newPassword"
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <Label className="mb-2 block">Re-type New password :</Label>
            <Input
              type="password"
              placeholder="Re-type New password"
              required=""
            />
          </div> */}
        </div>
        {/*end grid*/}
        <Button className="mt-5" type="submit">
          Save password
        </Button>
      </form>
    </div>
  );
}
