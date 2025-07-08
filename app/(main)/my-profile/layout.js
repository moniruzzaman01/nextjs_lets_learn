"use client";

import React from "react";
import Image from "next/image";
import Menu from "./_components/ProfileMenu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

function Layout({ tabs }) {
  return (
    <section className="relative pb-16">
      <div className="container relative mt-10">
        <div className="lg:flex">
          {/* left side content - dynamic */}
          <div className="lg:w-1/4 md:px-3">
            <div className="relative">
              <LogOut
                onClick={signOut}
                className=" absolute right-4 top-4 w-5 h-5 cursor-pointer"
              />
              <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                <div className="profile-pic text-center mb-5">
                  {/* input for image upload */}
                  <input
                    id="pro-img"
                    name="profile-image"
                    type="file"
                    className="hidden"
                    // onChange="loadFile(event)"
                  />
                  <div>
                    <div className="relative size-28 mx-auto">
                      <Image
                        src="/assets/images/profile.jpg"
                        className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                        id="profile-banner"
                        alt="profile-image"
                        width={112}
                        height={112}
                      />
                      <label
                        className="absolute inset-0 cursor-pointer"
                        htmlFor="pro-img"
                      />
                    </div>
                    <div className="mt-4">
                      <h5 className="text-lg font-semibold">Jenny Jimenez</h5>
                      <p className="text-slate-400">jennyhot@hotmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700">
                  <Menu />
                </div>
              </div>
            </div>
          </div>
          {/* right side content - dynamic */}
          <div className="lg:w-3/4 md:px-3 mt-[30px] lg:mt-0">{tabs}</div>
        </div>
      </div>
    </section>
  );
}

export default Layout;
