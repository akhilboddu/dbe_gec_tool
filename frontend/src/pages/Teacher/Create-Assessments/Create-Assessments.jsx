import React, { useEffect, useContext } from "react";
import CourseContext from "/src/context/courseContext";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AssignmentQuestions from "./components/Assignmnet-Questions";
import { db } from "/src/firebase";
import { notify } from "react-notify-toast";
import { useNavigate } from "@tanstack/react-location";

const CreateAssignment = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [totalMarks, setTotalMarks] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionType, setQuestionType] = useState("text");
  const [questions, setQuestions] = useState([{}]);

  const validateQuestion = () => {
    let isValid = true

    return isValid
  }

  const addQuestion = (data) => {
    data.deadline = new Date(data.deadline).toUTCString();
    data.deadline = data.deadline.split(' ').slice(0, 4).join(' ');
    if (validateQuestion()) {
      const file = data["question-image-0"][0] ? data["question-image-0"][0] : "";

      const storage = getStorage();
      const storageRef = ref(storage, `question-images/${file.name}`);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {

        getDownloadURL(storageRef).then((url) => {
          setTotalMarks(totalMarks + Number(data[`question-marks-${questionIndex}`]))
          setQuestions((prev) => {
            return [
              ...prev,
              {
                index: questionIndex + 1,
                explanation: data[`question-explanation-${questionIndex}`],
                questionMarks: data[`question-marks-${questionIndex}`],
                questionId: questionIndex + 1,
                image: file == "" ? null : url,
                text: data[`question-text-${questionIndex}`],
                type: questionType,
              },
            ];
          });
          const user = JSON.parse(localStorage.getItem("user"));
          const instArray = assignment.instructions;
          instArray[2] = `The deadline for this assignment is ${data.deadline}.`;
          setAssignment({
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            assignmentType: data.assignmentType,
            teacherId: user.id,
            totalMarks: totalMarks,
            instructions: instArray,
          });

          setQuestionIndex((prev) => prev + 1);
          setQuestionType("text");
          notify.show(`Question ${questionIndex + 1} added`, "success", 5000);
        });
      });
    }
    else {
      notify.show(`Error Message here`, "error", 5000);
    }
  };

  const validateForm = () => {
    let isValid = true
    /** 
     * Here we have to check the length but as we are adding a blank object in array 
     * so instead on one we are expecting minimum length of array will be 2
     */
    if (questions.length < 2) {
      isValid = false
      notify.show(`Atleast add a question`, "error", 5000);
    }

    return isValid
  }

  const saveAssignment = async (e) => {

    if (validateForm()) {
      e.preventDefault();
      questions.shift();
      assignment.totalMarks = totalMarks
      assignment.questions = [...questions];

      setAssignment((prev) => ({ ...prev, questions: [...questions] }));
      try {
        console.log(assignment);
        const docRef = await addDoc(collection(db, "assignments"), assignment);
        await updateDoc(docRef, {
          assignmentId: docRef.id,
        });
        notify.show(`Assignment Successfully Published`, "success", 5000);
        navigate({ to: `/teacher-dashboard`, replace: true });
      } catch (e) {
        console.error("Error adding document: ", e);
        notify.show(
          "Error occured while publishing assignment. Please try again.",
          "error",
          5000
        );
      }
    }
  };

  const [assignment, setAssignment] = useState({
    title: "",
    deadline: "",
    description: "",
    instructions: [
      "Read all the instructions and questions carefully.",
      "Answer all questions.",
      "The deadline for this assignment is May 4, 2023.",
    ],
    questions: [],
  });

  useEffect(() => {
  }, [assignment]);

  return (
    <div className="mt-10 sm:mt-0">
      <div className="flex flex-col">
        <div className="flex justify-between mb-6">
          <div className="px-4 sm:px-0">
            <h3 className="text-xl font-medium leading-6 text-gray-900">
              Create Assignment
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              This page allows you to create a Assignment.
            </p>
          </div>
          <div className="mr-5">
            Total Marks: {totalMarks}
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" onSubmit={handleSubmit(addQuestion)}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="title"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Assignment Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("title", { required: true })}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="description"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Assignment Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("description", { required: true })}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="deadline"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Deadline
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      id="deadline"
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("deadline", { required: true })}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="assignmentType"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Assignment Type
                    </label>
                    <select
                      name="assignmentType"
                      id="assignmentType"
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("assignmentType", { required: true })}
                    >
                      <option value={"school-assessment"}>School Based Assessment</option>
                      <option value={"end-term-assessment"}>End of Term Assessment</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 mt-10">
                  {questions.map((question, index) => (
                    <AssignmentQuestions
                      register={register}
                      index={index}
                      questionIndex={questionIndex}
                    />
                  ))}
                </div>
              </div>

              <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <button
                  type="submit"
                  className="block px-4 py-2 text-sm text-white rounded-md bg-mainColor"
                >
                  Save Question
                </button>
                <button
                  onClick={saveAssignment}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm btn-mainColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Publish
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
