"use client";

import Image from "next/image";
import { redirect } from "next/navigation";

export default function CardHead({
  thumbnail,
  title,
  categoryTitle,
  courseId,
}) {
  const handleRedirect = () => {
    redirect(`/courses/${courseId}/lessons`);
  };

  return (
    <div onClick={handleRedirect} className=" cursor-pointer group">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image src={thumbnail} alt={title} className="object-cover" fill />
      </div>
      <div className="text-lg md:text-base group-hover:text-sky-700 font-medium mt-2">
        {title}
      </div>
      <p className="text-xs text-muted-foreground">{categoryTitle}</p>
    </div>
  );
}
