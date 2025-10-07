import Image from "next/image";
import { CircleUserRound, LogOut } from "lucide-react";
// import { signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAUserByEmail } from "@/queries/user-queries";

export default async function Sidebar() {
  const { user } = await auth();
  if (!user?.email) {
    return redirect("/login");
  }
  const loggedInUser = await getAUserByEmail(user?.email);

  return (
    <div className="lg:w-1/4 md:px-3">
      <div className="relative">
        <LogOut
          // onClick={signOut}
          className=" absolute right-4 top-4 cursor-pointer border p-1 rounded-sm hover:bg-slate-100 hover:border-slate-100 transition-all duration-200"
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
                {loggedInUser?.profilePicture ? (
                  <Image
                    src={loggedInUser?.profilePicture}
                    className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                    id="profile-banner"
                    alt={loggedInUser?.firstName + " " + loggedInUser?.lastName}
                    width={112}
                    height={112}
                  />
                ) : (
                  <CircleUserRound className="w-[112px] h-[112px]" />
                )}
                <label
                  className="absolute inset-0 cursor-pointer"
                  htmlFor="pro-img"
                />
              </div>
              <div className="mt-4">
                <h5 className="text-lg font-semibold">{`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}</h5>
                <p className="text-slate-400">{loggedInUser?.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
