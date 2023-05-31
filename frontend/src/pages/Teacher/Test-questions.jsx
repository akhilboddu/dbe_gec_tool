import React from "react";
import { useState } from "react";
import QuestionAnswer from "./Question-answers";


const TestQuestions = ({
   question,
  questionIndex,
  handleDeleteQuestion,
  handleEditQuestion,
  handleSaveQuestion,
  onChange,
  onChangeImage,
  handleSaveAnswer,
  handleEditAnswer,
  handleDeleteAnswer,
  addAnswer,
  isEditQuestion,
}) => {
  return (
    <>
      <div className="grid grid-cols-6 gap-6 p-6 border rounded shadow">
        <div className="col-span-5">
          <h2 className="block text-lg font-medium text-gray-900">{`Question ${questionIndex + 1}`}</h2>
        </div>
        {
          question.isSaved ? <div className="flex justify-between col-span-1">
            <button
              onClick={() => { handleDeleteQuestion(questionIndex) }}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => { handleEditQuestion(questionIndex) }}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-green-600"
            >
              Edit
            </button>
          </div> : <></>
        }
        {
          isEditQuestion ? <div className="flex justify-end col-span-1">
            <button
              onClick={() => { handleSaveQuestion(questionIndex) }}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm btn-mainColor"
            >
              Save
            </button> </div> : <></>
        }


        <div className="col-span-4 mt-4 xs:col-span-6">
          <label className="block font-medium text-gray-700 text-md">
            Text
          </label>
          <input
            type="text"
            name="questionText"
            disabled={question.isSaved}
            className="mt-1 block h-[36px] w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={question.questionText}
            onChange={(event) => onChange(event, questionIndex)}
          />
        </div>

        <div className="col-span-2 mt-4 xs:col-span-6">
          <label className="block font-medium text-gray-700 text-md">
            Question Marks
          </label>
          <input
            type="number"
            disabled={question.isSaved}
            name="questionMarks"
            className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={question.questionMarks}
            onChange={(event) => onChange(event, questionIndex)}
          />
        </div>

        <div className="col-span-4 mt-4">
          <label className="block font-medium text-gray-700 text-md">
            Question explanation
          </label>
          <input
            type="text"
            disabled={question.isSaved}
            name="explanation"
            className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={question.explanation}
            onChange={(event) => onChange(event, questionIndex)}
          />
        </div>

        <div className="col-span-2 mt-4">
          <label className="block font-medium text-gray-700 text-md">
            Type of Question
          </label>
          <select
            name="questionType"
            disabled={question.isSaved}
            className="p-2 w-full border rounded bg-gray-50"
            value={question.questionType}
            onChange={(event) => onChange(event, questionIndex)}
          >
            <option value={"mcq"}>Multiple Choice Question</option>
            <option value={"text"}>Text</option>
          </select>
        </div>
        <div className="flex flex-col col-span-2 mt-4">
          <label className="block font-medium text-gray-700 text-md">
            Upload image
          </label>
          <input
            type="file"
            disabled={question.isSaved}
            name="image"
            className="mt-1 block cursor-pointer h-[36px] w-full rounded-md px-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => onChangeImage(event.target.files[0], questionIndex)}
          />
        </div>
        {question.questionType == "mcq" &&
          <>
            <h2 className="block font-medium text-gray-700 text-md"></h2>
            {question.answers.length > 0 && question.answers.map((answer, answerIndex) => {
              return (
                <QuestionAnswer
                  answer={answer}
                  question={question}
                  answerIndex={answerIndex}
                  questionIndex={questionIndex}
                  handleSaveAnswer={handleSaveAnswer}
                  handleEditAnswer={handleEditAnswer}
                  handleDeleteAnswer={handleDeleteAnswer}
                  onChange={onChange}
                />
              )
            })}
          </>

        }
        {question.questionType == "mcq" && !question.isSaved ? (
          <div className="col-span-6">
            <button
              className="block px-4 py-2 text-sm text-white rounded-md bg-mainColor"
              onClick={() => { addAnswer(questionIndex) }}
            >
              Add Answer
            </button>
          </div>
        ) : <></>}
      </div>
    </>
  );
};

export default TestQuestions;
