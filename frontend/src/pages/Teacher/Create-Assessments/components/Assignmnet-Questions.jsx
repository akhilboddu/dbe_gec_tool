import React from "react";
import { useState } from "react";


const AssignmentQuestions = ({
  register,
  index,
  questionIndex,
}) => {
  const [questionMarks, setQuestionMarks] = useState(1);

  return (
    <>
      <div className="grid grid-cols-6 gap-6 p-6 border rounded shadow">
        <div className="col-span-6">
          <h2 className="block text-lg font-medium text-gray-900">{`Question ${index + 1
            }`}</h2>
        </div>

        <div className="col-span-4 mt-4 xs:col-span-6">
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

        <div className="col-span-2 mt-4 xs:col-span-6">
          <label className="block font-medium text-gray-700 text-md">
            Question Marks
          </label>
          <input
            type="number"
            value={questionMarks}
            disabled={questionIndex == index ? false : true}
            name={index}
            className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register(`question-marks-${index}`, { required: true })}
            onChange={event => setQuestionMarks(event.target.value)}
          />
        </div>

        <div className="col-span-4 mt-4">
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

        <div className="col-span-2 mt-4">
          <label className="block font-medium text-gray-700 text-md">
            Upload image
          </label>
          <input
            type="file"
            disabled={questionIndex == index ? false : true}
            name={index}
            className="mt-1 block cursor-pointer h-[36px] w-full rounded-md px-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register(`question-image-${index}`, { required: false })}
          />
        </div>
      </div>
    </>
  );
};

export default AssignmentQuestions;
