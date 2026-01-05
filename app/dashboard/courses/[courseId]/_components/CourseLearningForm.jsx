"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { slugify } from "@/lib/convertData";
import { postAModule } from "@/app/action/module-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import CourseLearnings from "./CourseLearnings";

const formSchema = z.object({
  title: z.string().min(5),
});

export default function CourseLearningForm({ initialData = [] }) {
  const [learning, setLearning] = useState(initialData);
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [action, setAction] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreating = () => setIsCreating((current) => !current);
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
      values["order"] = learning.length;
      const response = await postAModule(values);
      if (response) {
        setLearning((learning) => [
          ...learning,
          {
            _id: response._id,
            ...values,
          },
        ]);
        toast.success("Module created successfully!!!");
        toggleCreating();
        router.refresh();
        form.reset();
      }
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
    setIsUpdating(false);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Learnings
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a learning
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
              !learning?.length && "text-slate-500 italic"
            )}
          >
            {!learning?.length && "No module"}
            <CourseLearnings
              learning={learning}
              setAction={setAction}
              action={action}
            />
          </div>
        </>
      )}
    </div>
  );
}
