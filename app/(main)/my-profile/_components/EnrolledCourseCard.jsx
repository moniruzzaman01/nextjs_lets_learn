import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Image from "next/image";

export default async function EnrolledCourseCard({ enrollment }) {
  console.log("---enrollment", enrollment);

  const {
    course: {
      title,
      category: { title: categoryTitle },
      thumbnail,
      modules,
    },
  } = enrollment || {};

  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image src={thumbnail} alt={title} className="object-cover" fill />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
          {title}
        </div>
        <p className="text-xs text-muted-foreground">{categoryTitle}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <BookOpen className="w-4" />
            </div>
            <span>{modules?.length || 0} Chapters</span>
          </div>
        </div>
        <div className=" border-b pb-2 mb-2">
          <div className="flex items-center justify-between">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Total Modules: {modules?.length || 0}
            </p>
            <div className="text-md md:text-sm font-medium text-slate-700">
              Completed Modules <Badge variant="success">05</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Total Quizzes: 10
            </p>

            <div className="text-md md:text-sm font-medium text-slate-700">
              Quiz taken <Badge variant="success">10</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Mark from Quizzes
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">50</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Others
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">50</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-md md:text-sm font-medium text-slate-700">
            Total Marks
          </p>

          <p className="text-md md:text-sm font-medium text-slate-700">100</p>
        </div>
      </div>
    </div>
  );
}
