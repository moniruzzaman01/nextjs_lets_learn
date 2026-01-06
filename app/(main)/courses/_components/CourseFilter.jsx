"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";

export default function CourseFilter({ categories }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategories = searchParams.get("categories")?.split(",") ?? [];

  const applyArrayFilter = ({ type, value }) => {
    const params = new URLSearchParams(searchParams);
    const currentValues = params.get(type)?.split(",") ?? [];

    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    if (updatedValues.length) {
      params.set(type, updatedValues.join(","));
    } else {
      params.delete(type);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };
  const category_options = categories.map((item) => ({
    id: item.id,
    label: item.title,
    value: item.title,
  }));

  return (
    <div className="hidden lg:block">
      <Accordion defaultValue={["categories"]} type="multiple">
        <AccordionItem value="categories">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Categories</span>
          </AccordionTrigger>
          <AccordionContent className="pt-6 animate-none">
            <ul className="space-y-4">
              {category_options?.map((option, optionIdx) => (
                <li key={option.value} className="flex items-center">
                  <Checkbox
                    type="checkbox"
                    id={`category-${optionIdx}`}
                    onCheckedChange={() => {
                      applyArrayFilter({
                        type: "categories",
                        value: option.value,
                      });
                    }}
                    checked={selectedCategories.includes(option.value)}
                  />
                  <label
                    htmlFor={`category-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
