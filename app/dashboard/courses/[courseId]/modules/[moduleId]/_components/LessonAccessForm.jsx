"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Delete, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { updateALesson } from "@/app/action/lesson-action";

const formSchema = z.object({
  isPublic: z.boolean().default(false),
});

export default function LessonAccessForm({ initialData, lessonId }) {
  const router = useRouter();
  const [lesson, setLesson] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: lesson,
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values) => {
    try {
      console.log("---public", values);
      await updateALesson(lessonId, values);
      setLesson(values);
      toast.success("Lesson updated successfully!!!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Lesson access
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <Delete /> Cancel
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit access
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if you want to make this chapter free for
                      preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p
          className={cn(
            "text-sm mt-2",
            !lesson.isPublic && "text-slate-500 italic"
          )}
        >
          {lesson.isPublic ? (
            <>This chapter is free for preview</>
          ) : (
            <>This chapter is not free</>
          )}
        </p>
      )}
    </div>
  );
}
