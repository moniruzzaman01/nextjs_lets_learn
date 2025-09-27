"use client";

export const VideoPlayer = ({ lesson }) => {
  return (
    <div className="relative aspect-video">
      <iframe
        className="w-full h-full rounded-md"
        src={lesson.video_url}
        title={lesson.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};
