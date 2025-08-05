"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Delete, Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import LessonModal from "./LessonModal";
import LessonList from "./LessonList";
import { slugify } from "@/lib/convertData";
import { postALesson, reorderLessons } from "@/app/action/lesson-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(5),
});

export default function LessonsForm({ initialData = [], moduleId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [lessons, setLessons] = useState(initialData);
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lessonToBeEdited, setLessonToBeEdited] = useState({});
  const toggleCreating = () => setIsCreating((current) => !current);
  const toggleEditing = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values) => {
    setIsUpdating(true);
    try {
      values["slug"] = slugify(values.title);
      values["order"] = lessons.length;
      const response = await postALesson(values, moduleId);
      if (response) {
        setLessons((lessons) => [
          ...lessons,
          {
            _id: response._id,
            ...values,
          },
        ]);
        toast.success("Lesson created successfully!!!");
        toggleCreating();
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong!!!");
    } finally {
      setIsUpdating(false);
    }
  };
  const onReorder = async (updateData) => {
    try {
      setIsUpdating(true);
      await reorderLessons(updateData);
      const reorderedData = lessons.map((lesson) => {
        updateData.find((item) => {
          if (item._id == lesson._id) {
            lesson.order = item.order;
          }
        });

        return lesson;
      });
      setLessons(reorderedData);
      toast.success("Lesson reordered!!!");
      router.refresh();
    } catch {
      toast.error("Something went wrong!!!");
    } finally {
      setIsUpdating(false);
    }
  };
  const onEdit = (id) => {
    const lesson = lessons.find((lesson) => lesson._id === id);
    setLessonToBeEdited(lesson);
    setIsEditing(true);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-gray-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Module Lessons
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>
              <Delete />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a lesson
            </>
          )}
        </Button>
      </div>

      {isCreating ? (
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
                      placeholder="e.g. 'Introduction to the course...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      ) : (
        <>
          <div
            className={cn(
              "text-sm mt-2",
              !lessons?.length && "text-slate-500 italic"
            )}
          >
            {!lessons?.length && "No module"}
            <LessonList
              onEdit={onEdit}
              onReorder={onReorder}
              items={lessons || []}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Drag & Drop to reorder the lessons
          </p>
        </>
      )}
      <LessonModal
        open={isEditing}
        setOpen={setIsEditing}
        lesson={lessonToBeEdited}
        lessonId={lessonToBeEdited._id}
      />
    </div>
  );
}
