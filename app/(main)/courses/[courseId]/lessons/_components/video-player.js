"use client";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";
import { postAViewInfo, updateAViewInfo } from "@/app/action/view-action";
import { useRouter } from "next/navigation";
import { updateAReport } from "@/app/action/report-action";

export const VideoPlayer = ({ selectedLesson, courseId }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const handleOnStart = async () => {
    if (isStart) return;
    try {
      await postAViewInfo({
        module: selectedLesson.moduleId,
        lesson: selectedLesson.lessonId,
      });
      setIsStart(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleOnEnded = async () => {
    if (isEnded) return;
    try {
      await updateAViewInfo({
        module: selectedLesson.moduleId,
        lesson: selectedLesson.lessonId,
      });
      await updateAReport({
        courseId,
        lessonId: selectedLesson.lessonId,
        moduleId: selectedLesson.moduleId,
      });
      router.refresh();
      setIsEnded(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleOnDurationChange = async (duration) => {};
  const handleOnProgress = async (progress) => {};

  return (
    <div className=" h-full w-full">
      {hasWindow && (
        <ReactPlayer
          src={selectedLesson?.video_url}
          width="100%"
          height="480px"
          controls
          onStart={handleOnStart}
          onEnded={handleOnEnded}
          onDurationChange={handleOnDurationChange}
          onProgress={handleOnProgress}
        />
      )}
    </div>
  );
};
