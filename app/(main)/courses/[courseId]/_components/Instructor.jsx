import { getCoursesByInstructorId } from "@/queries/course-queries";
import { MessageSquare, Presentation, Star, UsersRound } from "lucide-react";

export default async function Instructor({ instructor }) {
  const { courses, studentLearned, reviews, avgRatings } =
    (await getCoursesByInstructorId(instructor?._id)) || {};

  return (
    <div className="bg-gray-50 rounded-md p-8">
      <div className="md:flex md:gap-x-5 mb-8">
        <div className="h-[310px] w-[270px] max-w-full  flex-none rounded mb-5 md:mb-0">
          <img
            src={instructor?.profilePicture}
            alt=""
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <div className="max-w-[300px]">
            <h4 className="text-[34px] font-bold leading-[51px]">
              {instructor?.firstName} {instructor?.lastName}
            </h4>
            <div className="text-gray-600 font-medium mb-6">
              {instructor?.role}
            </div>
            <ul className="list space-y-4">
              <li className="flex items-center space-x-3">
                <Presentation className="text-gray-600" />
                <div>{courses} Courses</div>
              </li>
              <li className="flex space-x-3">
                <UsersRound className="text-gray-600" />
                <div>{studentLearned} Students Learned</div>
              </li>
              <li className="flex space-x-3">
                <MessageSquare className="text-gray-600" />
                <div>{reviews} Reviews</div>
              </li>
              <li className="flex space-x-3">
                <Star className="text-gray-600" />
                <div>{avgRatings} Average Rating</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{instructor?.bio}</p>
    </div>
  );
}
