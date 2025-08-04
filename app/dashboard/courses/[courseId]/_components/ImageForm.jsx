"use client";

import { useState } from "react";
import { Delete, ImageIcon, Pencil, PlusCircle, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/file-upload";
import { uploadAnImage } from "@/lib/uploadAnImage";
import { updateACourse } from "@/app/action/user-action";

export default function ImageForm({ initialData = {}, courseId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const toggleEdit = () => {
    setIsEditing((current) => !current);
    setImageFile("");
  };
  const onSubmit = async () => {
    setIsUploading(true);
    try {
      const response = await uploadAnImage(imageFile);
      if (response?.success) {
        try {
          await updateACourse(courseId, { thumbnail: response?.data?.url });
          setUploadedUrl(response?.data?.url);
          toast.success("Course thumbnail updated successfully!!!");
          toggleEdit();
          router.refresh();
        } catch (error) {
          toast.error("Something went wrong!!!");
        }
      }
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
    setIsUploading(false);
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <div className=" flex items-center gap-2 ">
          {imageFile && (
            <Button onClick={onSubmit} variant="ghost">
              <Upload
                className={`h-4 w-4 mr-2 ${isUploading && "animate-bounce"}`}
              />
              Upload image
            </Button>
          )}
          <Button variant="ghost" onClick={toggleEdit}>
            {isEditing && (
              <>
                <Delete />
                Cancel
              </>
            )}
            {!isEditing && !initialData.thumbnail && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an image
              </>
            )}
            {!isEditing && initialData.thumbnail && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit image
              </>
            )}
          </Button>
        </div>
      </div>
      {!isEditing ? (
        initialData.thumbnail ? (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={uploadedUrl ? uploadedUrl : initialData.thumbnail}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        )
      ) : (
        <div>
          <FileUpload setImageFile={setImageFile} isUploading={isUploading} />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
}
