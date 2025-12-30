"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizModal from "./quiz-modal";
import QuizCard from "./QuizCard";
import { useState } from "react";
import NoQuizAvailable from "./NoQuizAvailable";

function VideoDescription({ quizset, moduleId, courseId }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <Tabs defaultValue="details">
        <TabsList className="bg-transparent p-0 border-b pb-4 border-border w-full justify-start h-auto rounded-none">
          <TabsTrigger className="capitalize" value="details">
            Description
          </TabsTrigger>
          <TabsTrigger className="capitalize" value="quiz">
            Quiz
          </TabsTrigger>
        </TabsList>
        <div className="pt-3">
          <TabsContent value="details">
            <div className=" text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
              tempore ut non consectetur magni rem, quos quas ab alias placeat
              distinctio minima. Nemo similique asperiores non, id corporis cum
              odio alias dolores facilis, suscipit et, adipisci tempora nostrum
              optio totam quisquam deleniti distinctio quasi. Facilis iste,
              ratione suscipit harum ipsa qui at? Inventore eum aut natus ab
              tenetur dicta, illum sapiente, maxime voluptate eius nam
              repellendus saepe nostrum est quia earum? Doloremque deserunt amet
              quis veritatis molestias doloribus reprehenderit distinctio
              provident accusamus ratione consequuntur sed placeat cupiditate
              eligendi vero ipsam itaque illum est repudiandae voluptate
              aspernatur, nesciunt rem? Nam enim tempora laborum modi explicabo
              labore assumenda ut natus consectetur, voluptas quaerat dolores.
              Autem sint vel distinctio vitae recusandae fugiat reiciendis nam
              asperiores, fugit blanditiis, aperiam necessitatibus, tempore
              laborum architecto cumque numquam explicabo! Magnam provident
              eligendi tempore iste atque itaque laborum error illo sapiente
              expedita ducimus quae sit omnis assumenda modi porro dignissimos
              earum deserunt optio vitae, officia ipsam qui. Expedita iure rerum
              facilis iste dignissimos dolorem vitae error ex voluptatibus, fuga
              itaque ipsa ab esse aperiam vero aspernatur magni incidunt quaerat
              quia! Eos molestias atque libero possimus, quo quae quia ipsa et
              eius inventore quasi nam, at animi impedit blanditiis quod itaque,
              mollitia omnis nulla nemo non qui adipisci dolores! Laudantium
              eos, hic numquam vel tenetur ipsam officiis tempora quod repellat
              natus minima cum molestias atque nihil, sit dolor pariatur odit
              autem optio ipsum ullam dolorum reiciendis dicta. Sint, assumenda
              voluptatum natus quam laboriosam et nostrum voluptatem harum
              impedit eum accusamus praesentium voluptate delectus voluptatibus
              culpa quos! Quidem a ad, adipisci sunt similique earum nihil
              voluptatibus rerum autem fuga provident officia amet, enim
              voluptates accusantium labore perferendis doloremque ea. Quos
              maiores illum esse tempora saepe recusandae numquam laudantium
              velit fugit cupiditate? Maxime temporibus quis cumque asperiores
              quae veniam libero? Quo!
            </div>
          </TabsContent>
          <TabsContent value="quiz">
            <div className=" flex flex-wrap justify-between">
              {quizset ? (
                <>
                  <QuizCard
                    setOpen={setOpen}
                    title={quizset.title}
                    totalMarks={quizset.quizIds.length * 1}
                  />
                  <QuizModal
                    open={open}
                    setOpen={setOpen}
                    quizzes={quizset.quizIds}
                    moduleId={moduleId}
                    quizSetId={quizset.id}
                    courseId={courseId}
                  />
                </>
              ) : (
                <NoQuizAvailable />
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default VideoDescription;
