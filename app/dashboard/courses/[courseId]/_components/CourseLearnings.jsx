import { ArrowLeft, ArrowRight, Edit, Trash } from "lucide-react";

export default function CourseLearnings({ learning, action, setAction }) {
  return (
    <div className=" flex flex-col gap-1 ">
      {learning.map((item, idx) => (
        <div key={idx}>
          <div className=" bg-slate-200 border-slate-200 border text-slate-700 rounded text-sm px-2 py-3 flex items-center justify-between">
            <div className=" w-full">{item}</div>
            <div className=" flex items-center overflow-hidden justify-end w-32">
              <div
                onClick={() => setAction((prev) => !prev)}
                className={` flex gap-3 transition duration-1000 transform ${action ? "translate-x-5" : "translate-x-32"}`}
              >
                <Edit className="w-4 h-4 cursor-pointer hover:opacity-75 " />
                <Trash className="w-4 h-4 cursor-pointer hover:opacity-75 " />
              </div>
              <ArrowRight
                onClick={() => setAction((prev) => !prev)}
                className={`w-4 h-4 cursor-pointer transition duration-500 mr-2 translate-x-7 ${action ? " opacity-100" : " opacity-0"}`}
              />
              <ArrowLeft
                onClick={() => setAction((prev) => !prev)}
                className={`w-4 h-4 cursor-pointer transition duration-500 mr-2 $${action ? " opacity-0" : " opacity-100"}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
