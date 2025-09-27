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
import { formatHMSToSeconds } from "@/lib/formatTime";
import { updateALesson } from "@/app/action/lesson-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { VideoPlayer } from "@/app/(player)/[course_slug]/[lesson]/_components/VideoPlayer";

const formSchema = z.object({
  video_url: z.string().min(10, {
    message: "Url is required",
  }),
  duration: z.string().regex(/^([01]?\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
});

export default function VideoUrlForm({ initialData = {}, courseId, lessonId }) {
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
      values["duration"] = formatHMSToSeconds(values.duration);
      await updateALesson(lessonId, values);
      setLesson(values);
      toast.success("Lesson's video info updated successfully!!!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-lg p-4">
      <div className="font-medium flex items-center justify-between">
        Video URL
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <Delete />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit URL
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
            {/* url */}
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
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
            {/* duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Duration</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'HH:MM:SS'"
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
        <>
          <p className="text-sm mt-2">{lesson.video_url}</p>
          <div className="mt-6">
            <VideoPlayer lesson={lesson} />
          </div>
        </>
      )}
    </div>
  );
}
