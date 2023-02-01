import React from "react";
import { useForm } from "react-hook-form";
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
}) => {
  return (
    <>
    <div className="p-6 border rounded shadow">
        <div className="col-span-6 sm:col-span-4">
          <h2 className="block text-lg font-medium text-gray-900">{`Question ${
            index + 1
          }`}</h2>
        </div>

        <div class="col-span-6 sm:col-span-4 mt-4">
          <label className="block font-medium text-gray-700 text-md">
            Text
          </label>
          <input
            type="text"
            name={index}
            className="border block w-full mt-1 bg-gray-100 border-gray-300 rounded-md shadow-sm h-[36px] px-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register(`question-text-${index}`, { required: true })}
          />
        </div>

        <div class="col-span-6 sm:col-span-4 mt-4">
          <label className="block font-medium text-gray-700 text-md">
            Upload image
          </label>
          <input
            type="file"
            name={index}
            className="h-[36px] px-2  block w-full mt-1 rounded-md  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register(`question-image-${index}`, { required: false })}
          />
        </div>

        <div class="col-span-6 sm:col-span-4  mt-4">
          <label className="block font-medium text-gray-700 text-md">
            Question explanation
          </label>
          <input
            type="text"
            name={index}
            className="border h-[36px] px-2  block w-full mt-1 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register(`question-explanation-${index}`, { required: true })}
          />
        </div>

        <div className="col-span-6 mt-4 sm:col-span-4">
          <h2 className="block font-medium text-gray-700 text-md">
            Question answers:
          </h2>
        </div>

        <div class="col-span-6 sm:col-span-4  mt-4 mb-6">
          <label class="text-md block font-medium text-gray-700">
            Type of Question
          </label>
          <select
            name={`question-type-${index}`}
            className="p-2 bg-gray-100 border rounded"
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value={"mcq"}>Multiple Choice Question</option>
            <option value={"text"}>Text</option>
          </select>
        </div>

        {questionType == "mcq" &&
          answers.map((answer, index) => (
            <QuestionAnswer
              key={index}
              addAnswer={addAnswer}
              index={index}
              setAnswerText={setAnswerText}
              setAnswerCorrect={setAnswerCorrect}
              setAnswerExplanation={setAnswerExplanation}
            />
          ))}
          </div>
    </>
  );
};

export default TestQuestions;
