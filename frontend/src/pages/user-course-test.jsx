import { useMatch } from "@tanstack/react-location";

import QuestionList from "/src/components/question/question-list";
import Loading from "/src/components/shared/loading";

import { useContext, useState, useEffect } from "react";
import CourseContext from "../context/courseContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

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
      if(docSnap.data()){
        setTestData(docSnap.data());
      }
      else{
        const docRef = doc(db, "assignments", testId);
        const docSnap = await getDoc(docRef);  
        setTestData(docSnap.data());
      }
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
      {!loading ? (testData ? (
        <div>
          <div className="fixed top-16 left-0 max-h-[92%] overflow-y-auto rounded-lg px-1 py-5 no-scrollbar">
            {numbersRow()}
          </div>
          <div className="space-y-4 lg:space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold lg:text-3xl">{testData.title}</h2>
              <h3 className="font-bold text-1xl lg:text-1xl">
                Total Marks: {testData.totalMarks}
              </h3>
            </div>
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
              subject={testData.title}
              attemptData={attemptData}
              teacherId={teacherId}
              attemptedResultId={attemptId}
              gradeId={gradeId}
              isMarking
              totalMarks={testData?.totalMarks}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <h3 className="text-2xl lg:text-3xl">
            Test not available. It might be deleted by the owner
          </h3>
        </div>
      ))
        : (
          <Loading />
        )}
    </div>
  );
}
