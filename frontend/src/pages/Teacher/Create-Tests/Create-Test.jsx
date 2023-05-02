import React, { useEffect, useReducer, useContext } from "react";
import CourseContext from "/src/context/courseContext";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { render } from "react-dom";
import { set, useForm } from "react-hook-form";
import QuestionAnswer from "../Question-answers";
import TestQuestions from "../Test-questions";
import { db } from "/src/firebase";
import { notify } from "react-notify-toast";
import { useNavigate } from "@tanstack/react-location";

const CreateTest = () => {
  const ctxQuestions = useContext(CourseContext);
  const { arrTest } = ctxQuestions;
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionType, setQuestionType] = useState("mcq");
  const [answerText, setAnswerText] = useState();
  const [answerExplanation, setAnswerExplanation] = useState("");
  const [answerIndex, setAnswerIndex] = useState(0);

  const [answers, setAnswers] = useState([{
    answerId: `answer-${0}`,
    text: '',
    isCorrect: false,
  }]);
  const [questions, setQuestions] = useState([{}]);

  const addAnswer = (e) => {
    e.preventDefault();

    if (questionType == "mcq") {
      setAnswers((prev) => [
        ...prev,
        {
          answerId: `answer-${answerIndex + 1}`,
          text: answerText,
          isCorrect: false,
        },
      ]);

      setAnswerIndex((prev) => prev + 1);
    }
  };

  const validateQuestion = () => {
    let isValid = true
    if (questionType == "mcq") {
      let trueValueCounter = 0
      // Checking empty answer if any, and coiunting true options 
      answers.map((element, index) => {
        if (!element.text) {
          isValid = false
          notify.show(`Answer can't be empty`, "error", 5000);
        }
        if (element.isCorrect) {
          trueValueCounter++
        }
      })

      // Validating only 1 true option should be in array  
      if (trueValueCounter == 0) {
        isValid = false
        notify.show(`Need to select atleast 1 'TRUE' value`, "error", 5000);
      } else if (trueValueCounter > 1) {
        isValid = false
        notify.show(`Need to select atmost 1 'TRUE' value`, "error", 5000);
      }

      // There should be atleast 2 options in MCQs  
      if (answers.length < 2) {
        isValid = false
        notify.show(`Need to add Atleast 2 options (answers)`, "error", 5000);
      }
    }

    return isValid
  }

  const addQuestion = (data) => {
    if (validateQuestion()) {
      const file = data["question-image-0"][0] ? data["question-image-0"][0] : "";

      const storage = getStorage();
      const storageRef = ref(storage, `question-images/${file.name}`);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {

        getDownloadURL(storageRef).then((url) => {
          setQuestions((prev) => {
            return [
              ...prev,
              {
                index: questionIndex + 1,
                explanation: data[`question-explanation-${questionIndex}`],
                questionId: questionIndex + 1,
                image: file == "" ? null : url,
                text: data[`question-text-${questionIndex}`],
                type: questionType,
                answers: [...answers],
              },
            ];
          });
          const user = JSON.parse(localStorage.getItem("user"));
          const instArray = test.instructions;
          instArray[3] = `The duration of this test is ${data.duration} minutes.`;
          setTest({
            Title: data.title,
            description: data.description,
            duration: data.duration + " MIN",
            teacherId: user.id,
            totalMarks: data.totalMarks,
            instructions: instArray,
          });

          setQuestionIndex((prev) => prev + 1);
          setAnswerIndex(0);
          setAnswers([{
            answerId: `answer-${0}`,
            text: '',
            isCorrect: false,
          }]);
          setQuestionType("mcq");
          notify.show(`Question ${questionIndex + 1} added`, "success", 5000);
        });
      });
    }
    else {
      notify.show(`Answer can't be empty`, "error", 5000);
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

  const saveTest = async (e) => {

    if (validateForm()) {
      e.preventDefault();
      questions.shift();
      test.questions = [...questions];

      setTest((prev) => ({ ...prev, questions: [...questions] }));
      try {
        const docRef = await addDoc(collection(db, "test"), test);
        await updateDoc(docRef, {
          testId: docRef.id,
        });
        notify.show(`Test Successfully Published`, "success", 5000);
        navigate({ to: `/teacher-dashboard`, replace: true });
      } catch (e) {
        console.error("Error adding document: ", e);
        notify.show(
          "Error occured while publishing test. Please try again.",
          "error",
          5000
        );
      }
    }
  };

  const [test, setTest] = useState({
    Title: "",
    duration: "",
    description: "",
    instructions: [
      "Read all the instructions and questions carefully.",
      "Choose the letter of the correct answer.",
      "Answer all questions.",
      "The duration of this test is 90 minutes.",
    ],
    questions: [],
  });

  useEffect(() => {
  }, [test]);

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-xl font-medium leading-6 text-gray-900">
              Create Test
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              This page allows you to create a test.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" onSubmit={handleSubmit(addQuestion)}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="Title"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Test Title
                    </label>
                    <input
                      type="text"
                      name="Title"
                      id="Title"
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("title", { required: true })}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="description"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Description
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
                      htmlFor="duration"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      id="duration"
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("duration", { required: true })}
                    />
                  </div>


                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="totalMarks"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Total marks
                    </label>
                    <input
                      type="number"
                      name="totalMarks"
                      id="totalMarks"
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      {...register("totalMarks", { required: true })}
                    />
                  </div>
                </div>

                <div className="grid gap-6 mt-10">
                  {questions.map((question, index) => (
                    <TestQuestions
                      key={index}
                      answers={answers}
                      setAnswers={setAnswers}
                      addAnswer={addAnswer}
                      register={register}
                      index={index}
                      questionIndex={questionIndex}
                      questionType={questionType}
                      setQuestionType={setQuestionType}
                      setAnswerText={setAnswerText}
                      setAnswerExplanation={setAnswerExplanation}
                      answerIndex={answerIndex}
                      question={questions[index + 1]}
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
                  onClick={saveTest}
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

export default CreateTest;
