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
  thumbnail,
  onChangeImage,
  handleSaveAnswer,
  handleEditAnswer,
  handleDeleteAnswer,
  addAnswer,
  isEditQuestion1,
}) => {
  const [isEditQuestion, setIsEditQuestion] = useState(false);

  const onEdit = (questionIndex) => {
    handleEditQuestion(questionIndex);
    setIsEditQuestion(true);
  };

  const onSave = (questionIndex) => {
    handleSaveQuestion(questionIndex);
    setIsEditQuestion(false);
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-6 rounded border p-6 shadow">
        <div className="col-span-5">
          <h2 className="block text-lg font-medium text-gray-900">{`Question ${
            questionIndex + 1
          }`}</h2>
        </div>
        {question.isSaved ? (
          <div className="col-span-1 flex justify-between">
            <button
              onClick={() => {
                handleDeleteQuestion(questionIndex);
              }}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm"
            >
              Delete
            </button>
            <button
              onClick={() => {
                onEdit(questionIndex);
              }}
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm"
            >
              Edit
            </button>
          </div>
        ) : (
          <></>
        )}
        {isEditQuestion ? (
          <div className="col-span-1 flex justify-end">
            <button
              onClick={() => {
                onSave(questionIndex);
              }}
              className="btn-mainColor inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm"
            >
              Save
            </button>{" "}
          </div>
        ) : (
          <></>
        )}

        <div className="xs:col-span-6 col-span-4 mt-4">
          <label className="text-md block font-medium text-gray-700">
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

        <div className="xs:col-span-6 col-span-2 mt-4">
          <label className="text-md block font-medium text-gray-700">
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
          <label className="text-md block font-medium text-gray-700">
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
          <label className="text-md block font-medium text-gray-700">
            Type of Question
          </label>
          <select
            name="questionType"
            disabled={question.isSaved}
            className="w-full rounded border bg-gray-50 p-2"
            value={question.questionType}
            onChange={(event) => onChange(event, questionIndex)}
          >
            <option value={"mcq"}>Multiple Choice Question</option>
            <option value={"text"}>Text</option>
          </select>
        </div>
        <div className="col-span-6 mt-4 flex flex-col">
          {question?.image && (
            <img
              className="h-[200px] w-[300px]"
              src={question.image ?? "/placeholder.png"}
              alt="Course image"
            />
          )}
          <div>
              <label className="text-md block font-medium text-gray-700">
                {question?.image ? "Replace" : "Upload"} image
              </label>
              <input
                type="file"
                disabled={question.isSaved}
                name="image"
                className="mt-1 block h-[36px] w-full cursor-pointer rounded-md px-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) =>
                  onChangeImage(event.target.files[0], questionIndex)
                }
              />
            </div>
        </div>
        {question.questionType == "mcq" && (
          <>
            <h2 className="text-md block font-medium text-gray-700"></h2>
            {question.answers.length > 0 &&
              question.answers.map((answer, answerIndex) => {
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
                    answerLength={question.answers.length}
                  />
                );
              })}
          </>
        )}
        {question.questionType == "mcq" && !question.isSaved ? (
          <div className="col-span-6">
            <button
              className="block rounded-md bg-mainColor px-4 py-2 text-sm text-white"
              onClick={() => {
                addAnswer(questionIndex);
              }}
            >
              Add Answer
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default TestQuestions;
