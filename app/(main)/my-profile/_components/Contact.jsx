"use client";

import { updateContactInfo } from "@/app/action/profile-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact({ loggedInUser }) {
  const { email, phone, socialMedia } = loggedInUser || {};
  const [contactInfo, setContactInfo] = useState({
    phone,
    socialMedia,
  });

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setContactInfo({ ...contactInfo, [field]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateContactInfo(email, contactInfo);
      toast.success("Contact Info updated!!!");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Phone No. :</Label>
            <Input
              name="phone"
              id="phone"
              type="text"
              placeholder="+8801XXXXXXXXX"
              value={contactInfo?.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">Social Media :</Label>
            <Input
              name="socialMedia"
              id="socialMedia"
              type="text"
              placeholder="https://www.facebook.com/m.zaman.shakib"
              value={contactInfo?.socialMedia}
              onChange={handleChange}
            />
          </div>
        </div>
        {/*end grid*/}
        <Button className="mt-5" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
