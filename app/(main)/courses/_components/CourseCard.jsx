import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import EnrollNow from "@/components/enroll_now";
import { auth } from "@/auth";
import { getAUserByEmail } from "@/queries/user-queries";
import { isAlreadyEnrolled } from "@/queries/enrollment-queries";
import { headers } from "next/headers";

export default async function CourseCard({ course }) {
  const { title, id, price, thumbnail, category, modules } = course || {};
  const headerlist = await headers();
  const { user } =
    (await auth.api.getSession({
      headers: {
        cookie: headerlist.get("cookie") || "",
      },
    })) || {};

  let loggedInUser, isEnrolled;
  if (user) {
    loggedInUser = await getAUserByEmail(user?.email);
    isEnrolled = await isAlreadyEnrolled(id, loggedInUser?.id);
  }

  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <Link key={id} href={`/courses/${id}`}>
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={"course"}
              className="object-cover"
              fill
            />
          ) : (
            "No image found!"
          )}
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category?.title}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <div>
                <BookOpen className="w-4" />
              </div>
              <span>{modules?.length} Chapters</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-4">
        <p className="text-md md:text-sm font-medium text-slate-700">
          {formatPrice(price)}
        </p>
        {isEnrolled ? (
          <Link
            href="#"
            className=" flex items-center text-xs text-sky-700 h-7 gap-1 px-4 rounded-md hover:bg-zinc-100 transition-colors duration-200 hover:text-black"
          >
            Continue
            <ArrowRight className="w-3" />
          </Link>
        ) : (
          <EnrollNow course={{ title, id, price }} />
        )}
      </div>
    </div>
  );
}
