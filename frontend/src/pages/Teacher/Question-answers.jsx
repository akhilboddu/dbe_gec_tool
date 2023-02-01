import React from "react";

const QuestionAnswer = ({
  addAnswer,
  register,
  index,
  setAnswerText,
  setAnswerCorrect,
  setAnswerExplanation,
}) => {
  const handleOnChange = (value) => {
    if (value == "false") {
      setAnswerCorrect(false);
    } else {
      setAnswerCorrect(true);
    }
  };

  return (
    <>
      <div class="col-span-6 sm:col-span-4">
        <label class="text-md block font-medium text-gray-700">{`Answer ${
          index + 1
        } text`}</label>
        <input
          type="text"
          name={`answer-text-${index}`}
          class="mt-1  block h-[36px] w-full  rounded-md border border-gray-300 bg-gray-100 px-2 shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm"
          onChange={(e) => {
            setAnswerText(e.target.value);
          }}
        />
      </div>

      <div class="col-span-6 mt-4 sm:col-span-4">
        <label class="text-md block font-medium text-gray-700">
          True/False
        </label>
        <select
          name={`answer-correct-${index}`}
          className="p-2 bg-gray-100 border rounded"
          onChange={(e) => handleOnChange(e.target.value)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>

        <br />
        <br />
        <button
          className="block px-4 py-2 text-sm text-white rounded-md bg-mainColor"
          onClick={addAnswer}
        >
          Add Answer
        </button>
      </div>
    </>
  );
};

export default QuestionAnswer;
