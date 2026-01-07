import NotFound from "@/components/not-found";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselPrevious,
  CarouselNext,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/formatPrice";
import { getCoursesByCategoryId } from "@/queries/course-queries";
import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function RelatedCourses({ courseId, categoryId }) {
  const courses = await getCoursesByCategoryId(courseId, categoryId);

  return (
    <section>
      <div className="container">
        <SectionTitle className="mb-6">Related Courses</SectionTitle>
        {courses.length ? (
          <Carousel
            opts={{
              align: "start",
            }}
            className="max-2xl:w-[90%] w-full mx-auto"
          >
            <CarouselPrevious />
            <CarouselNext />
            <CarouselContent>
              {courses.map((course) => (
                <CarouselItem
                  key={course?.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Link href={`/courses/${course?.id}`}>
                    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                      <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <Image
                          src={course?.thumbnail}
                          alt={"course"}
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div className="flex flex-col pt-2">
                        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
                          {course.title}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {course.category?.title}
                        </p>
                        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                          <div className="flex items-center gap-x-1 text-slate-500">
                            <div>
                              <BookOpen className="w-4" />
                            </div>
                            <span>{course.modules?.length} Chapters</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <p className="text-md md:text-sm font-medium text-slate-700">
                            {formatPrice(course.price)}
                          </p>

                          <Button
                            variant="ghost"
                            className="text-xs text-sky-700 h-7 gap-1"
                          >
                            Enroll
                            <ArrowRight className="w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <section className=" border-b pb-6">
            <div className=" flex items-center justify-center h-full">
              <NotFound title="Related courses not found!!!" />
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
