import { useState } from "react";
import Info from "../shared/info";
import Error from "/src/components/shared/error";
import Success from "/src/components/shared/success";

export default function Question({
  question,
  index,
  disabled,
  answers,
  image,
  handelSelectedAnswers,
  heading,
  resultCheck,
  prevSelected,
  teacher,
}) {
  const [isCorrect, setIsCorrect] = useState();
  const [teacherRadioButton, setTeacherRadioButton] = useState();

  const checkCorrectAnswer = (answer) => {
    setIsCorrect(answer.isCorrect);
    const finalAnswer = {
      question: index,
      type: "mcq",
      ...answer,
    };
    handelSelectedAnswers(finalAnswer);
  };

  const handleInputChange = (e) => {
    const finalAnswer = {
      question: index,
      type: "text",
      answer: e.target.value,
    };
    handelSelectedAnswers(finalAnswer);
  };

  const handleTeacherNoteChange = (e) => {
    const finalAnswer = { ...prevSelected, teacherNote: e.target.value };
    handelSelectedAnswers(finalAnswer);
  };

  const handleMarks = (e) => {
    const finalAnswer = { ...prevSelected, marks: e.target.value };
    handelSelectedAnswers(finalAnswer);
  };

  const isChecked = (answer) => {
    if (resultCheck) {
      return answer.answerId == prevSelected?.answerId && resultCheck;
    }
    return;
  };

  const renderMcq = () => {
    return answers.map((answer, index) => (
      <div key={index} className="flex items-center gap-2 ">
        <input
          key={answer.index}
          type="radio"
          className={`radio radio-sm`}
          value={answer.answerId}
          name={question.questionId}
          checked={isChecked(answer)}
          disabled={resultCheck}
          onChange={() => checkCorrectAnswer(answer)}
        />

        <label htmlFor={answer.answerId}>
          {answer.image ? (
            <img src={answer.image} alt={answer.index} />
          ) : (
            answer.text
          )}
        </label>
      </div>
    ));
  };

  const renderTestInput = (index) => {
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
        <div className="flex items-center gap-2 mb-3">
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

        <div className="pl-4 space-y-2">
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
    if (disabled && !resultCheck && question.type === "text") {
      return <Info text={"Pending for evaluation"} />;
    }

    if (
      disabled ||
      (disabled === 0 && !resultCheck && question.type !== "text")
    ) {
      if (isCorrect) {
        return <Success text={"This is the correct answer."} />;
      } else {
        return <Error text={"Wrong Answer"} />;
      }
    } else if (resultCheck) {
      if (question.type == "text" && prevSelected?.isCorrect == undefined) {
        return <Info text={"Pending for evaluation"} />;
      }
      if (prevSelected?.isCorrect) {
        return <Success text={"This is the correct answer."} />;
      } else {
        return <Error text={"Wrong Answer"} />;
      }
    }
  };

  return (
    <div className="space-y-4" id={`question${index}`}>
      {question.questionHeading && (
        <h1 className="font-bold">{question.questionHeading}</h1>
      )}

      {heading ? <h1 className="font-bold">{heading}</h1> : ""}
      {image ? <img src={image} alt="someimage" /> : ""}

      <p>
        {index}. {question.text}
      </p>
      <div className="pl-4 space-y-2">
        {question.type == "text" ? renderTestInput(index) : renderMcq()}
      </div>
      {resultCheck && prevSelected.teacherNote ? (
        <p>
          <span className="text-gray-400">Teacher's Note:</span>{" "}
          {prevSelected.teacherNote}
        </p>
      ) : (
        ""
      )}
      <div className="py-4">{renderMessage()}</div>
      {teacher && question.type == "text" ? renderTeacherInputs() : null}
    </div>
  );
}
