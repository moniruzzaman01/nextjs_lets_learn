"use client";

export const VideoPlayer = ({
  src = "https://www.youtube.com/embed/gCKwgLgb2Z4?si=ABI-EgbD_2lCi6W0",
}) => {
  return (
    <div className="relative aspect-video">
      <iframe
        className="w-full h-full"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};
