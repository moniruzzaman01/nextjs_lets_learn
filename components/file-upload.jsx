"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function FileUpload(props) {
  const { isMulti = false, setImageFile, isUploading } = props;
  const [uploadProgress, setUploadProgress] = useState(0);
  const onDrop = useCallback(async (acceptedFiles) => {
    setImageFile(acceptedFiles);
    setUploadProgress(100);
  }, []);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".png"] },
    maxSize: 1 * 1024 * 1024,
    multiple: isMulti,
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      toast.error(fileRejections[0]?.errors[0]?.message);
    }
  }, [fileRejections]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "mt-3 flex cursor-pointer items-center justify-center rounded-md border border-dashed p-3 py-12 hover:bg-muted/30",
        isUploading ? "pointer-events-none !cursor-not-allowed opacity-80" : ""
      )}
    >
      <input multiple={isMulti} {...getInputProps()} disabled={isUploading} />
      <div className="flex flex-col items-center gap-3 text-center !text-[#858585]">
        <CloudUpload size={48} className="text-gray-600" />
        <h4 className="!font-normal  !text-[#858585]">
          <span className="font-semibold text-black underline">
            Click to upload
          </span>{" "}
          or drag and drop <br />
          Maximum file size 5 MB.
        </h4>
        <p>Only *.jpg and *.png images will be accepted</p>
        {isUploading ? (
          <div className="mx-auto mt-4 w-full max-w-xs">
            <Progress
              value={uploadProgress}
              className="h-1 w-full bg-zinc-200"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
