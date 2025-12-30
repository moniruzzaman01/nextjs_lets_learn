"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";
import { Delete, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateAModule } from "@/app/action/module-action";
const formSchema = z.object({
  quizset: z.string().min(1),
});

export const QuizForm = ({
  courseId,
  moduleId,
  initialData,
  options = [
    {
      value: "id_1",
      label: "Quiz Set 1",
    },
    {
      value: "id_2",
      label: "Quiz Set 2",
    },
  ],
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const quizset = options.find((opt) => opt.value == initialData.quizset);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quizset: initialData?.quizset || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values) => {
    try {
      await updateAModule(moduleId, values, courseId);
      toast.success("Module updated!!!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Quiz Set
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>
              <Delete />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Quiz Set
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.quizset && "text-slate-500 italic"
          )}
        >
          {quizset ? quizset.label : "No quiz set selected"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="quizset"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
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
      )}
    </div>
  );
};
