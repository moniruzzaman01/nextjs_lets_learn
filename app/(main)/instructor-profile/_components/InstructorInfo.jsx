import { getCoursesByInstructorId } from "@/queries/course-queries";
import {
  CircleUserRound,
  MessageSquare,
  Presentation,
  Star,
  UsersRound,
} from "lucide-react";

export default async function InstructorInfo({ loggedInUser }) {
  const { firstName, lastName, designation, bio, id, profilePicture } =
    loggedInUser || {};
  const { avgRatings, courses, reviews, studentLearned } =
    await getCoursesByInstructorId(id);

  return (
    <div className="col-span-12 lg:col-span-4 ">
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="mb-6">
          <div className="w-36 h-36 rounded-full  mb-5 mx-auto overflow-hidden">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={firstName + " " + lastName}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <CircleUserRound className=" w-full h-full font-thin" />
            )}
          </div>

          <div>
            <h4 className="text-xl lg:text-2xl text-center">
              {firstName + " " + lastName}
            </h4>
            <div className="text-gray-600 font-medium mb-6 text-sm text-center">
              {designation}
            </div>
            <ul className=" items-center gap-3 flex-wrap text-sm text-gray-600 font-medium grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 md:grid-cols-4">
              <li className="flex items-center space-x-3">
                <Presentation className="text-gray-600 w-4" />
                <div>{courses} Courses</div>
              </li>
              <li className="flex items-center space-x-3">
                <UsersRound className="text-gray-600 w-4" />
                <div>{studentLearned} Students</div>
              </li>
              <li className="flex items-center space-x-3">
                <MessageSquare className="text-gray-600 w-4" />
                <div>{reviews} Reviews</div>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="text-gray-600 w-4" />
                <div>{avgRatings} Average Rating</div>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-gray-600 text-xs leading-[1.8]">{bio}</p>
      </div>
    </div>
  );
}
