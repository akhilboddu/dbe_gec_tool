import { useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import QuestionList from "/src/components/question/question-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { QueryKeys } from "/src/constants/query-keys";
import { getQuestionsByCourseApi } from "/src/helpers/fetchers";
import { useContext,useState, useEffect} from "react";
import CourseContext from "../context/courseContext";

export default function UserCourseTest() {
  // location
  const {
    params: { testId },
  } = useMatch();
  

  const ctxQuestions = useContext(CourseContext);
  const {arrTest} = ctxQuestions;

  const testIndex = arrTest.findIndex(object => {
  return object.testId === testId;
});


  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Test</h2>
      <h3 className="text-1xl font-bold lg:text-1xl">Instruction to the learner</h3>

      {arrTest[testIndex].instructions.map((instruction, index)=>
        <li key={index} style={{margin:0}}>{instruction}</li>
      )}
      
      
    <QuestionList questions={arrTest[testIndex].questions} isMarking />

    </div>
  ); 
}
