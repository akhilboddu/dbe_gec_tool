import React from "react";

const AssignmentQuestionAnswers = ({
  questionIndex,
  answer,
  question,
  onChange,
  answerIndex,
  handleSaveAnswer,
  handleEditAnswer,
  answerLength,
  handleDeleteAnswer
}) => {

  return (
    <>
      <div className="col-span-4">
        <label className="block font-medium text-gray-700 text-md">{`Answer ${answerIndex + 1
          } text`}</label>
        <input
          type="text"
          value={answer.answerText}
          onChange={(e) => onChange(e, questionIndex, answerIndex)}
          name={`answerText`}
          className="mt-1  block h-[36px] w-full  rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm"
        />
      </div>

      <div className={"col-span-1"}>
        <label className="block font-medium text-gray-700 text-md">
          True/False
        </label>
        <select
          value={answer.answer}
          onChange={(e) => onChange(e, questionIndex, answerIndex)}
          name={`answer`}
          className="p-2 border rounded bg-gray-50 w-full"
        >
          <option value={true} selected={JSON.parse(answer.answer)}>True</option>
          <option value={false} selected={!JSON.parse(answer.answer)}>False</option>
        </select>
      </div>
      <div className="flex flex-col col-span-1">
        <div className="col-span-1">
          {!question.isSaved ?
            <label className="block font-medium text-gray-700 text-md">
              &nbsp;
            </label> : <></>
          }
          {
            answerLength > 1 && !question.isSaved ?
              <div className="flex justify-start">
                <button
                  disabled={question.isSaved}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-red-600"
                  onClick={() => { handleDeleteAnswer(questionIndex, answerIndex) }}
                >
                  Delete
                </button>
              </div>
              : <></>
          }
        </div>
      </div>
    </>
  );
};

export default AssignmentQuestionAnswers;
