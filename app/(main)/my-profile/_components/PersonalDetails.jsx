"use client";

import { updateAUserByEmail } from "@/app/action/profile-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function PersonalDetails({ loggedInUser }) {
  const [userInfo, setUserInfo] = useState({
    firstName: loggedInUser?.firstName || "",
    lastName: loggedInUser?.lastName || "",
    email: loggedInUser?.email || "",
    bio: loggedInUser?.bio || "",
    designation: loggedInUser?.designation || "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setUserInfo({
      ...userInfo,
      [property]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateAUserByEmail(userInfo);
      toast.success("Personal Details updated successfully!!!");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
      <h5 className="text-lg font-semibold mb-4">Personal Details :</h5>
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">
              First Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              id="firstname"
              name="firstName"
              required
              value={userInfo?.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Last Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              name="lastName"
              required
              value={userInfo?.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Your Email : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              required
              value={userInfo?.email}
              readOnly
              disabled
            />
          </div>
          <div>
            <Label className="mb-2 block">Designation :</Label>
            <Input
              name="designation"
              id="designation"
              type="text"
              value={userInfo?.designation}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="mt-5">
            <Label className="mb-2 block">Bio :</Label>
            <Textarea
              id="bio"
              name="bio"
              value={userInfo?.bio}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button className="mt-5 cursor-pointer" asChild>
          <input type="submit" name="send" value="Save Changes" />
        </Button>
      </form>
    </div>
  );
}
