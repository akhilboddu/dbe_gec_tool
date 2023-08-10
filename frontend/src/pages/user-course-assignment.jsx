import { useMatch } from "@tanstack/react-location";

import QuestionList from "../components/assignment-question/question-list";
import Loading from "/src/components/shared/loading";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function UserCourseAssignment() {
  // location
  const { params: { assignmentId, attemptId, gradeId, teacherId } } = useMatch();
  const {
    params: p1,
  } = useMatch();

  const [attemptData, setAttemptData] = useState();
  const [assignmentData, setAssignmentData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const assignmentFetch = async () => {
      setLoading(true);
      const docRef = doc(db, "assignments", assignmentId);
      const docSnap = await getDoc(docRef);
      console.log("docSnap : ", docSnap.data());
      setAssignmentData(docSnap.data());
      if (attemptId) {
        attemptedAnswersFetch();
      }
      setLoading(false);
    };

    const attemptedAnswersFetch = async () => {
      const docRef = doc(db, "attempted_results", attemptId);
      const docSnap = await getDoc(docRef);
      setAttemptData(docSnap.data());
      setLoading(false);
    };

    if (assignmentId) {
      assignmentFetch();
    }

  }, []);

  const handleClickScroll = (index) => {
    const element = document.getElementById(`question${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const numbersRow = () => {
    const linksArray = assignmentData.questions.map((que, index) => {
      return (
        <p
          className="flex items-center justify-center w-10 h-10 m-2 text-white bg-orange-500 rounded-full hover:cursor-pointer hover:shadow-lg"
          key={index + 1}
          onClick={() => handleClickScroll(index + 1)}
        >
          <span>{index + 1}</span>
        </p>
      );
    });
    return linksArray;
  };

  return (
    <div>
      {!loading ? (assignmentData ? (
        <div>
          <div className="fixed top-16 left-0 max-h-[92%] overflow-y-auto rounded-lg px-1 py-5 no-scrollbar">
            {numbersRow()}
          </div>
          <div className="space-y-4 lg:space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold lg:text-3xl">{assignmentData.title}</h2>
              <h3 className="font-bold text-1xl lg:text-1xl">
                Total Marks: {assignmentData.totalMarks}
              </h3>
            </div>
            <h3 className="font-bold text-1xl lg:text-1xl">
              Instruction to the learner
            </h3>

            {assignmentData.instructions.map((instruction, index) => (
              <li key={index} style={{ margin: 0 }}>
                {instruction}
              </li>
            ))}
            <QuestionList
              questions={assignmentData.questions}
              subject={assignmentData.title}
              attemptData={attemptData}
              teacherId={teacherId}
              attemptedResultId={attemptId}
              gradeId={gradeId}
              isMarking
              totalMarks={assignmentData?.totalMarks}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <h3 className="text-2xl lg:text-3xl">
            Assignment not available. It might be deleted by the owner
          </h3>
        </div>
      ))
        : (
          <Loading />
        )}
    </div>
  );
}
