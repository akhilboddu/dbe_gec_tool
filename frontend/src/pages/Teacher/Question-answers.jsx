import React from "react";

const QuestionAnswer = ({
  addAnswer,
  answers,
  setAnswers,
  register,
  index,
  setAnswerText,
  setAnswerExplanation,
  currentAnswer,
  answerIndex,
  questionIndex,
  thisQuestionIndex,
}) => {

  return (
    <>
      <div className="col-span-4">
        <label className="block font-medium text-gray-700 text-md">{`Answer ${index + 1
          } text`}</label>
        <input
          type="text"
          value={answers[index].text}
          disabled={questionIndex == thisQuestionIndex ? false : true}
          name={`answer-text-${index}`}
          className="mt-1  block h-[36px] w-full  rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm"
          onChange={(e) => {
            let tempArray = [...answers];
            tempArray = tempArray.map((element, arrayIndex) => {
              if (arrayIndex === index) {
                return {
                  ...element,
                  text: e.target.value
                }
              }
              return element
            });
            setAnswers([...tempArray]);
          }}
        />
      </div>

      <div className="col-span-2 ">
        <label className="block font-medium text-gray-700 text-md">
          True/False
        </label>
        <select
          name={`answer-correct-${index}`}
          disabled={questionIndex == thisQuestionIndex ? false : true}
          className="p-2 border rounded bg-gray-50 w-full"
          onChange={(e) => {
            let tempArray = [...answers];
            tempArray = tempArray.map((element, arrayIndex) => {
              if (arrayIndex === index) {
                return {
                  ...element,
                  isCorrect: JSON.parse(e.target.value)
                }
              }
              return element
            });
            setAnswers([...tempArray]);
          }}
        >
          <option value={true} selected={answers[index].isCorrect}>True</option>
          <option value={false} selected={!answers[index].isCorrect}>False</option>
        </select>
      </div>
      {answerIndex == index && questionIndex == thisQuestionIndex ? (
        <button
          className="block px-4 py-2 text-sm text-white rounded-md bg-mainColor"
          onClick={addAnswer}
        >
          Add Answer
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default QuestionAnswer;
