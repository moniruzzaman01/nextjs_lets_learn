"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Delete, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updateALesson } from "@/app/action/lesson-action";

const formSchema = z.object({
  title: z.string().min(1),
});

export default function LessonTitleForm({ initialData = {}, lessonId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [lesson, setLesson] = useState(initialData);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: lesson,
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values) => {
    try {
      await updateALesson(lessonId, values);
      setLesson(values);
      toast.success("Lesson updated successfully!!!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Lesson title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <Delete />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Title
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
        <p className="text-sm mt-2">{lesson.title}</p>
      )}
    </div>
  );
}
