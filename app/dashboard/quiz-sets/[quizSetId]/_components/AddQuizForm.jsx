"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addAQuiz } from "@/app/action/quiz-action";
const formSchema = z.object({
  question: z.string().min(1, {
    message: "Question is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  optionA: z.object({
    text: z.string().min(1, {
      message: "Option text is required",
    }),
    is_correct: z.boolean().default(false),
  }),
  optionB: z.object({
    text: z.string().min(1, {
      message: "Option text is required",
    }),
    is_correct: z.boolean().default(false),
  }),
  optionC: z.object({
    text: z.string().min(1, {
      message: "Option text is required",
    }),
    is_correct: z.boolean().default(false),
  }),
  optionD: z.object({
    text: z.string().min(1, {
      message: "Option text is required",
    }),
    is_correct: z.boolean().default(false),
  }),
});

export const AddQuizForm = () => {
  const router = useRouter();
  const { quizSetId } = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      question: "",
      description: "",
      optionA: {
        text: "",
        is_correct: false,
      },
      optionB: {
        text: "",
        is_correct: false,
      },
      optionC: {
        text: "",
        is_correct: false,
      },
      optionD: {
        text: "",
        is_correct: false,
      },
    },
  });
  const { isSubmitting, isValid, errors } = form.formState;
  const onSubmit = async (values) => {
    try {
      const structuredQuiz = {
        question: values.question,
        description: values.description,
        options: [
          values.optionA,
          values.optionB,
          values.optionC,
          values.optionD,
        ],
      };
      form.reset({
        question: "",
        description: "",
        optionA: {
          text: "",
          is_correct: false,
        },
        optionB: {
          text: "",
          is_correct: false,
        },
        optionC: {
          text: "",
          is_correct: false,
        },
        optionD: {
          text: "",
          is_correct: false,
        },
      });
      await addAQuiz(structuredQuiz, quizSetId);
      toast.success("Quiz added successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Add New Quiz
      </div>
      {
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Question</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter quiz question"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Enter quiz description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-3">
              <FormLabel>Option A</FormLabel>
              <div className="flex items-start gap-3">
                <FormField
                  control={form.control}
                  name="optionA.is_correct"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="optionA.text"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Enter quiz option"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <FormLabel>Option B</FormLabel>
              <div className="flex items-start gap-3">
                <FormField
                  control={form.control}
                  name="optionB.is_correct"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="optionB.text"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Enter quiz option"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <FormLabel>Option C</FormLabel>
              <div className="flex items-start gap-3">
                <FormField
                  control={form.control}
                  name="optionC.is_correct"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="optionC.text"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Enter quiz option"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <FormLabel>Option D</FormLabel>
              <div className="flex items-start gap-3">
                <FormField
                  control={form.control}
                  name="optionD.is_correct"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="optionD.text"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Enter quiz option"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      }
    </div>
  );
};
