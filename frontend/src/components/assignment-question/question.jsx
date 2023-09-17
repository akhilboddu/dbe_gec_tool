import { useState } from "react";
import Info from "../shared/info";
import Error from "/src/components/shared/error";
import Success from "/src/components/shared/success";
import {handleIsAnswer} from "/src/helpers";
export default function Question({
  question,
  index,
  disabled,
  answers,
  questionMarks,
  image,
  handelSelectedAnswers,
  resultCheck,
  prevSelected,
  explanation,
  evaluatedResult,
  teacher,
}) {
  const [isCorrect, setIsCorrect] = useState();
  const [teacherRadioButton, setTeacherRadioButton] = useState();
  const checkCorrectAnswer = (answer) => {
    setIsCorrect(answer.answer);
    const finalAnswer = {
      question: index,
      type: "mcq",
      questionMarks: questionMarks,
      ...answer,
    };
    handelSelectedAnswers(finalAnswer);
  };

  const handleInputChange = (e) => {
    const finalAnswer = {
      question: index,
      type: "text",
      questionMarks: questionMarks,
      answer: e.target.value,
    };
    handelSelectedAnswers(finalAnswer);
  };

  const handleTeacherNoteChange = (e) => {
    const finalAnswer = { ...prevSelected, teacherNote: e.target.value };
    handelSelectedAnswers(finalAnswer);
  };

  const handleMarks = (e) => {
    const finalAnswer = {
      ...prevSelected,
      marks:
        e.target.value <= prevSelected.questionMarks
          ? e.target.value
          : prevSelected.questionMarks,
    };
    handelSelectedAnswers(finalAnswer);
  };

  const isChecked = (answer) => {
    if (resultCheck) {
      return answer.answerText == prevSelected?.answerText && resultCheck;
    }
    return;
  };
  const renderMcq = () => {
    if (answers) {
      return answers.map((answer, index) => (
        <div key={index} className="flex items-center gap-2 ">
          <input
            key={answer.index}
            type="radio"
            className={`radio radio-sm`}
            value={answer.answerId}
            name={question?.questionId ?? question.questionText}
            checked={isChecked(answer)}
            disabled={resultCheck}
            onChange={() => checkCorrectAnswer(answer)}
          />
          <label htmlFor={answer.answerText}>
            {answer.image ? (
              <img src={answer.image} alt={answer.index} />
            ) : (
              answer.answerText
            )}
          </label>
        </div>
      ));
    }
  };

  const renderAssignmentInput = (index) => {
    if (!teacher && !resultCheck) {
      return (
        <textarea
          id={index}
          disabled={resultCheck ? true : false}
          onChange={handleInputChange}
          className="input input-bordered h-[auto] w-[100%]"
        />
      );
    }
    if (!teacher || resultCheck) {
      return (
        <textarea
          id={index}
          disabled={resultCheck ? true : false}
          value={prevSelected ? prevSelected.answer : ""}
          onChange={handleInputChange}
          className="input input-bordered h-[auto] w-[100%]"
        />
      );
    }
    if (teacher) {
      return (
        <textarea
          id={index}
          disabled={resultCheck ? true : false}
          value={prevSelected ? prevSelected.answer : ""}
          onChange={handleInputChange}
          className="input input-bordered h-[auto] w-[100%]"
        />
      );
    }
  };

  const teacherAnswerCheck = (choice) => {
    setTeacherRadioButton(choice);
    const finalAnswer = { ...prevSelected, isCorrect: choice };
    handelSelectedAnswers(finalAnswer);
  };

  const renderTeacherInputs = () => {
    return (
      <div>
        <p className="mb-2">Above answer is:</p>
        <div className="mb-3 flex items-center gap-2">
          <input
            key={"yes-" + question.index}
            type="radio"
            className={`radio radio-sm`}
            name={"teacher-" + question.index}
            checked={teacherRadioButton == true}
            onChange={() => teacherAnswerCheck(true)}
          />
          <label htmlFor={"teacher-" + question.index}>Correct</label>
          <input
            key={"no-" + question.index}
            type="radio"
            className={`radio radio-sm`}
            name={"teacher" + question.index}
            checked={teacherRadioButton == false}
            onChange={() => teacherAnswerCheck(false)}
          />
          <label htmlFor={"teacher-" + question.index}>Incorrect</label>
        </div>

        <div className="space-y-2 pl-4">
          <p>Marks</p>
          <input
            className="input input-bordered"
            type="number"
            onChange={handleMarks}
          />
          <p>Remark</p>
          <textarea
            onChange={handleTeacherNoteChange}
            className="input input-bordered h-[auto] w-[100%]"
          />
        </div>
      </div>
    );
  };

  const renderMessage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !evaluatedResult) {
      return null; // Handle the case when user data is not available
    }

    // Extract variables if needed
    const { role } = user;

    if (
      disabled &&
      !resultCheck &&
      (question.questionType || question.type) === "text"
    ) {
      return <Info text={"Pending for evaluation"} />;
    }

    let answer = handleIsAnswer(evaluatedResult?.answer);

    if (
      disabled ||
      (disabled === 0 &&
        !resultCheck &&
        (question.questionType || question.type) !== "text")
    ) {
      if (role === "student" && !evaluatedResult?.teacherNote) {
        if (answer || evaluatedResult?.IsCorrect) {
          return <Success text="Your answer is correct." />;
        } else if (
          !answer || !evaluatedResult?.IsCorrect
        ) {
          return <Error text="Your answer is incorrect." />;
        }
      }
    } else if (resultCheck) {
      if (
        (question.questionType || question.type) === "text" &&
        !evaluatedResult?.IsCorrect &&
        !evaluatedResult?.teacherNote
      ) {
        return <Info text={"Pending for evaluation"} />;
      }

      if (role === "student") {
        if (answer || evaluatedResult?.IsCorrect) {
          return <Success text="Your answer is correct." />;
        } else if (!answer || !evaluatedResult?.IsCorrect) {
          return <Error text="Your answer is incorrect." />;
        }
      }
    }

    return null; // Handle any remaining cases or return a default value
  };

  return (
    <div className="space-y-4" id={`question${index}`}>
      <div className="flex items-center justify-between">
        <p>
          {index}. {question.questionText}
        </p>
        <div className="font-bold">Marks: {question.questionMarks}</div>
      </div>
      {image ? <img src={image} alt="someimage" /> : ""}
      <div className="space-y-2 pl-4">
        {question.questionType == "mcq"
          ? renderMcq()
          : renderAssignmentInput(index)}
      </div>
      {resultCheck && prevSelected?.teacherNote ? (
        <p>
          <span className="text-gray-400">Teacher's Note:</span>{" "}
          {prevSelected?.teacherNote}
        </p>
      ) : (
        ""
      )}
      <div className="py-4">{renderMessage()}</div>
      {teacher && question.type == "text" ? renderTeacherInputs() : null}
    </div>
  );
}
