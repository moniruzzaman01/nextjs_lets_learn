import PersonalDetails from "../_components/PersonalDetails";
import Contact from "../_components/Contact";
import ResetPassword from "../_components/ResetPassword";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAUserByEmail } from "@/queries/user-queries";

async function Profile() {
  const { user } = await auth();
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
          <Contact email={user?.email} />
          {/* password change section */}
          <ResetPassword email={user?.email} />
        </div>
      </div>
    </>
  );
}

export default Profile;
