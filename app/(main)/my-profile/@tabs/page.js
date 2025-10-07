import PersonalDetails from "../_components/PersonalDetails";
import Contact from "../_components/Contact";
import ResetPassword from "../_components/ResetPassword";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAUserByEmail } from "@/queries/user-queries";
import { headers } from "next/headers";

async function Profile() {
  const headerlist = await headers();
  const { user } =
    (await auth.api.getSession({
      headers: {
        cookie: headerlist.get("cookie") || "",
      },
    })) || {};

  if (!user?.email) {
    return redirect("/login");
  }
  const loggedInUser = await getAUserByEmail(user?.email);

  return (
    <>
      {/* personal details section */}
      <PersonalDetails loggedInUser={loggedInUser} />
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          {/* contact section */}
          <Contact loggedInUser={loggedInUser} />
          {/* password change section */}
          {/* <ResetPassword email={user?.email} /> */}
        </div>
      </div>
    </>
  );
}

export default Profile;
