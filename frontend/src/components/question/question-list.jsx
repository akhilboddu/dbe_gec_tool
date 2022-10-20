import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useAtom } from "jotai";
import { forEach, isEmpty, keys, sampleSize } from "lodash-es";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Question from "/src/components/question/question";
import Error from "/src/components/shared/error";
import Info from "/src/components/shared/info";
import { QueryKeys } from "/src/constants/query-keys";

import { postTestResultsInCourseApi } from "/src/helpers/fetchers";
import { userAtom } from "/src/stores/auth.store";
import { setDoc, getDoc, doc} from "firebase/firestore";
import { db } from "/src/firebase";

const NUM_QUESTIONS_EACH_TEST = 10;

export default function QuestionList({ questions, isMarking }) {



const [selectedAnswers, setSelectedAnswers] = useState([])

const handelSelectedAnswers = (answer) =>{
 
   setSelectedAnswers(prev => [...prev,answer])

}

  // location
  const {
    params: { courseId },
  } = useMatch();

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // query
  const queryClient = useQueryClient();

  const testResultMutation = useMutation(
    (data) => postTestResultsInCourseApi(courseId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.TEST_RESULTS_BY_COURSE,
          courseId,
        ]);
      },
    }
  );

  const [isModal, setIsModal] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false)

 

  const onSubmit = (data) => {
    openModal();

    const correctAnswerIds = selectedAnswers.filter((answer) => answer.isCorrect === true);
    setCorrectAnswerIds(correctAnswerIds);

    const score = correctAnswerIds.length;
    setScore(score);

    handleRanking()

  };


  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  return !isEmpty(questions) ? (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pl-4">
        {/* error */}
        {!isEmpty(errors) && <Error text="You must answer all questions" />}

        {/* list */}
        {/* {questionSample.map((question, index) => (
          <Question
            question={question}
            key={question._id}
            index={index + 1}
            register={register}
            disabled={score}
            isCorrect={correctAnswerIds.includes(question._id)}
          />
        ))} */}

        {questions.map((question, index) => (
          <Question
            question={question}
            key={index}
            index={question.index}
            image = {question.image}
            answers = {question.answers}
            disabled={score}
            handelSelectedAnswers={handelSelectedAnswers}
          />
        ))}

        {/* submit */}
        <button className="btn btn-mainColor">Submit</button>
      </form>

      {/* modal */}
      <div>
        <div className={clsx("modal mt-0", { "modal-open": isModal })}>
          <div className="modal-box space-y-4">
            <h3 className="text-lg font-bold uppercase">Test result</h3>
            <p>
              You scored <span className="font-bold">{score}</span> points out
              of {questions.length}
            </p>
            {/* <p>
              You got <span className="font-bold">{mark}</span>
            </p> */}
            <div className="modal-action">
              <button onClick={closeModal} className="btn btn-main-Color">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Info text="No question" />
  );
}
