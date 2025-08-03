"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateACourse } from "@/app/action/user-action";

const formSchema = z.object({
  category: z.string().min(1),
});

export default function CategoryForm({ initialData = {}, courseId, options }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialData?.category || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values) => {
    try {
      if (values.category == initialData?.category) {
        toast.warning("This category is already stored in the db!!!");
        return;
      }
      await updateACourse(courseId, values);
      toast.success("Category updated successfully!!!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };
  const selectedOptions = options.find(
    (option) => option.value === initialData.category
  );

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.category && "text-slate-500 italic"
          )}
        >
          {selectedOptions?.label || "No category"}
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
              name="category"
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
}
