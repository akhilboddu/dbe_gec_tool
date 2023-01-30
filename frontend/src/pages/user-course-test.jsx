import { useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import QuestionList from "/src/components/question/question-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { QueryKeys } from "/src/constants/query-keys";
import { getQuestionsByCourseApi } from "/src/helpers/fetchers";
import { useContext, useState, useEffect } from "react";
import CourseContext from "../context/courseContext";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function UserCourseTest() {
  // location
  const {
    params: { testId, attemptId, gradeId, teacherId },
  } = useMatch();
  const {
    params: p1,
  } = useMatch();

  const ctxQuestions = useContext(CourseContext);
  const { arrTest } = ctxQuestions;

  const testIndex = arrTest.findIndex((object) => {
    return object.testId === testId;
  });

  const [attemptData, setAttemptData] = useState();
  const [testData, setTestData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const testFetch = async () => {
      setLoading(true);
      const docRef = doc(db, "test", testId);
      const docSnap = await getDoc(docRef);
      setTestData(docSnap.data());
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

    if (testId) {
      testFetch();
    }

  }, []);

  const handleClickScroll = (index) => {
    const element = document.getElementById(`question${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const numbersRow = () => {
    const linksArray = testData.questions.map((que, index) => {
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
      {testData && !loading ? (
        <div>
          <div className="fixed top-16 left-0 max-h-[92%] overflow-y-auto rounded-lg px-1 py-5 no-scrollbar">
            {numbersRow()}
          </div>
          <div className="space-y-4 lg:space-y-8">
            <h2 className="text-2xl font-bold lg:text-3xl">Test</h2>
            <h3 className="font-bold text-1xl lg:text-1xl">
              Instruction to the learner
            </h3>

            {testData.instructions.map((instruction, index) => (
              <li key={index} style={{ margin: 0 }}>
                {instruction}
              </li>
            ))}

            <QuestionList
              questions={testData.questions}
              subject={testData.Title}
              attemptData={attemptData}
              teacherId={teacherId}
              attemptedResultId={attemptId}
              gradeId={gradeId}
              isMarking
            />
          </div>
        </div>
      ) : (
        <Loading/>
      )}
    </div>
  );
}
