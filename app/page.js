import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/queries/course-queries";

export default async function Home() {
  const courses = await getAllCourses();
  console.log("courses", courses);
  return <Button>Button</Button>;
}
