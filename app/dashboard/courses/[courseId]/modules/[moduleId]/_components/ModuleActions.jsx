"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteAModule, updateAModule } from "@/app/action/module-action";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ModuleActions({
  courseId,
  moduleId,
  isPublished: publish = false,
}) {
  const [isPublished, setIsPublished] = useState(publish);
  const router = useRouter();

  const handlePublish = async () => {
    try {
      await updateAModule(moduleId, { isPublished: !isPublished }, courseId);
      toast.success(
        `Module ${isPublished ? "Unpublished" : "Published"} successfully!!!`
      );
      setIsPublished(!isPublished);
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await deleteAModule(moduleId, courseId);
      if (response.success) toast.success("Module deleted successfully!!!");
      else toast.error("Module not found, Plese refresh the page!!!");
      router.back();
    } catch (error) {
      toast.error(`${error ? error?.message : "Something went wrong!!!"}`);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={handlePublish} variant="outline" size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <div className="relative group">
        <Button onClick={handleDelete} size="sm" disabled={isPublished}>
          <Trash className="h-4 w-4" />
        </Button>

        {isPublished && (
          <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none top-full mt-2 py-1 w-[15vw] rounded right-0 bg-slate-100 duration-200 transition-opacity text-xs text-center">
            Please unpublish the module before delete
          </div>
        )}
      </div>
    </div>
  );
}
