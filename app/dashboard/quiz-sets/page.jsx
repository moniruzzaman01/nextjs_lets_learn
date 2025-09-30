import { getAllQuizsets } from "@/queries/quiz-queries";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const QuizSets = async () => {
  const quizsets = await getAllQuizsets();
  quizsets.map((qs) => {
    qs["totalQuiz"] = qs?.quizIds?.length || 0;
    return qs;
  });
  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={JSON.parse(JSON.stringify(quizsets))}
      />
    </div>
  );
};

export default QuizSets;
