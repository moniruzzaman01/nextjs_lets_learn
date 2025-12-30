import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./Overview";
import Instructor from "./Instructor";
import Curriculum from "./Curriculum";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";

export default function Details({ course }) {
  const { title, subtitle, instructor, updatedAt, description, learning } =
    course || {};

  return (
    <section className="py-8 md:py-12 lg:py-24">
      <div className="container">
        <span className="bg-success px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block bg-orange-500">
          Development
        </span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-5xl mt-3">
          {title}
        </h3>
        <p className="mt-3 text-gray-600 text-sm">{subtitle}</p>
        <div className="flex sm:items-center gap-5 flex-col sm:flex-row sm:gap-6 md:gap-20 mt-6">
          <div className="flex items-center gap-2">
            {instructor?.profilePicture ? (
              <Image
                alt={instructor?.firstName + " " + instructor?.lastName}
                className="w-[40px] h-[40px] rounded-full"
                src={instructor?.profilePicture}
                height={40}
                width={40}
              />
            ) : (
              <CircleUserRound className="w-[40px] h-[40px]" />
            )}
            <p className="font-bold">
              {instructor?.firstName} {instructor?.lastName}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-success font-semibold">Last Updated: </span>
            <span>{updatedAt.toString()}</span>
          </div>
        </div>
        {/* tabs start */}
        <div className="my-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 my-6 max-w-[768px] bg-gray-100">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Overview description={description} learning={learning} />
            </TabsContent>
            <TabsContent value="curriculum">
              <Curriculum course={course} />
            </TabsContent>
            <TabsContent value="instructor">
              <Instructor instructor={instructor} />
            </TabsContent>
          </Tabs>
        </div>
        {/* tabs end */}
      </div>
    </section>
  );
}
