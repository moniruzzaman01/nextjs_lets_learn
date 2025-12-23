"use client";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSearchParams } from "next/navigation";

export const VideoPlayer = ({ modules = [] }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get("lesson");
  const flattenModule = modules.flatMap((module) => module.lessonIds);
  const targetLesson =
    flattenModule.find((lesson) => lesson.slug == lessonSlug) ||
    flattenModule[0] ||
    {};
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <div className=" h-full w-full">
      {hasWindow && (
        <ReactPlayer
          src={targetLesson.video_url}
          width="100%"
          height="480px"
          controls
        />
      )}
    </div>
  );
};
