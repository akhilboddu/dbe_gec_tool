import React from "react";
import { useState } from "react";
import QuestionAnswer from "./Question-answers";


const TestQuestions = ({
  addAnswer,
  register,
  index,
  questionIndex,
  questionType,
  setQuestionType,
  setAnswerText,
  setAnswerCorrect,
  setAnswerExplanation,
  answers,
  answerIndex,
  question
}) => {
  const [currentAnswer, setCurrentAnswer] = useState(0);

  return (
    <>
      <div className="p-6 border rounded shadow">
        <div className="col-span-6 sm:col-span-4">
          <h2 className="block text-lg font-medium text-gray-900">{`Question ${
            index + 1
          }`}</h2>
        </div>

        <div className="col-span-6 mt-4 sm:col-span-4">
          <label className="block font-medium text-gray-700 text-md">
            Text
          </label>
          <input
            type="text"
            name={index}
            disabled={questionIndex == index ? false : true}
            className="mt-1 block h-[36px] w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register(`question-text-${index}`, { required: true })}
          />
        </div>

        <div className="col-span-6 mt-4 sm:col-span-4">
          <label className="block font-medium text-gray-700 text-md">
            Upload image
          </label>
          <input
            type="file"
            disabled={questionIndex == index ? false : true}
            name={index}
            className="mt-1 block  h-[36px] w-full rounded-md px-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register(`question-image-${index}`, { required: false })}
          />
        </div>

        <div className="col-span-6 mt-4 sm:col-span-4">
          <label className="block font-medium text-gray-700 text-md">
            Question explanation
          </label>
          <input
            type="text"
            disabled={questionIndex == index ? false : true}
            name={index}
            className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register(`question-explanation-${index}`, { required: true })}
          />
        </div>

        <div className="col-span-6 mt-4 sm:col-span-4">
          <h2 className="block font-medium text-gray-700 text-md">
            Question answers:
          </h2>
        </div>

        <div className="col-span-6 mt-4 mb-6 sm:col-span-4">
          <label className="block font-medium text-gray-700 text-md">
            Type of Question
          </label>
          <select
            name={`question-type-${index}`}
            disabled={questionIndex == index ? false : true}
            className="p-2 border rounded bg-gray-50"
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value={"mcq"}>Multiple Choice Question</option>
            <option value={"text"}>Text</option>
          </select>
        </div>

        {questionType == "mcq" && questionIndex == index &&
          answers.map((answer, index2) => (
            <QuestionAnswer
              key={index2}
              addAnswer={addAnswer}
              index={index2}
              setAnswerText={setAnswerText}
              setAnswerCorrect={setAnswerCorrect}
              setAnswerExplanation={setAnswerExplanation}
              currentAnswer={currentAnswer}
              answerIndex={answerIndex}
              questionIndex={questionIndex}
              thisQuestionIndex={index}
            />
          ))}

          {questionIndex !== index && 
          question?.answers?.map(((ans, i) => (
            <p key={i}>{"Option "+(i+1) +'-'} {ans.text}: {ans.isCorrect ? "(True)" : "(False)"}</p>
          )))
          }
      </div>
    </>
  );
};

export default TestQuestions;
