import AlertBanner from "@/components/alert-banner";
import { QuizSetAction } from "./_components/quiz-set-action";
import { TitleForm } from "./_components/title-form";
import { AddQuizForm } from "./_components/add-quiz-form";
import { getQuizzesByQuizsetId } from "@/queries/quiz-queries";
import QuizList from "./_components/QuizList";

const EditQuizSet = async ({ params }) => {
  const { quizSetId } = await params;
  const quizset = await getQuizzesByQuizsetId(quizSetId);

  return (
    <>
      <AlertBanner
        label="This course is unpublished. It will not be visible in the course."
        variant="warning"
      />
      <div className="p-6">
        <div className="flex items-center justify-end">
          <QuizSetAction />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mt-16">
          <div className="max-lg:order-2">
            <h2 className="text-xl mb-6">Quiz List</h2>
            <div className="space-y-6">
              {quizset?.quizIds?.length ? (
                quizset.quizIds.map((quiz, idx) => (
                  <QuizList
                    quiz={JSON.parse(JSON.stringify(quiz))}
                    quizSetId={quizSetId}
                    key={idx}
                  />
                ))
              ) : (
                <AlertBanner
                  label="No Quiz found in this quiz set, add some using the form on right."
                  variant="warning"
                  className="rounded mb-6"
                />
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Customize your quiz set</h2>
            </div>
            <div className="max-w-[800px]">
              <TitleForm
                initialData={{
                  title: quizset?.title,
                  quizsetId: quizset?.id,
                }}
              />
            </div>
            <div className="max-w-[800px]">
              <AddQuizForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditQuizSet;
