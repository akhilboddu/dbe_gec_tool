import { useState } from "react";
import Info from "../shared/info";
import Error from "/src/components/shared/error";
import Success from "/src/components/shared/success";

export default function Question({
  question,
  index,
  disabled,
  answers,
  questionMarks,
  image,
  handelSelectedAnswers,
  heading,
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
      questionType: "mcq",
      questionMarks: questionMarks,
      ...answer,
    };
    handelSelectedAnswers(finalAnswer);
  };

  const handleInputChange = (e) => {
    const finalAnswer = {
      question: index,
      questionType: "text",
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
      return answer.answerText == prevSelected?.answerText;
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
            name={question.questionId}
            checked={isChecked(answer)}
            disabled={resultCheck}
            onChange={() => checkCorrectAnswer(answer)}
          />

          <label htmlFor={answer.answerText}>
            {answer.image ? (
              <img src={answer.image} alt={answer.answerText} />
            ) : (
              answer.answerText
            )}
          </label>
        </div>
      ));
    }
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
    if (disabled && !resultCheck && question.questionType === "text") {
      return <Info text={"Pending for evaluation"} />;
    }

    if (
      disabled ||
      (disabled === 0 && !resultCheck && question.questionType !== "text")
    ) {
      //To-Do: Currently disabled for future evaluation
     /*  if (isCorrect) {
        return (
          <Success
            text="Your answer is correct."
          />
        );
      } else {
        return <Error text="Your answer is incorrect.1" />;
      } */
    } else if (resultCheck) {
      if (
        question.questionType == "text" &&
        prevSelected?.answer == undefined
      ) {
        return <Info text={"Pending for evaluation"} />;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      if(user?.role == "student" && !evaluatedResult?.teacherNote){
        if (evaluatedResult?.isCorrect) {
          return (
            <Success
              text="Your answer is correct."
            />
          );
        } else {
          return <Error text="Your answer is incorrect." />;
        }
      }
      
    }
  };

  return (
    <div className="space-y-4" id={`question${index}`}>
      {/* {question.questionHeading && (
        <h1 className="font-bold">{question.questionHeading}</h1>
      )}



      {heading ? <h1 className="font-bold">{heading}</h1> : ""}
    */}
      <div className="flex items-center justify-between">
        <p>
          {index}. {question.questionText}
        </p>
        <div className="font-bold">Marks: {question.questionMarks}</div>
      </div>
      {image ? <img src={image} alt="someimage" /> : ""}
      <div className="space-y-2 pl-4">
        {question.questionType == "mcq" ? renderMcq() : renderTestInput(index)}
      </div>
      {resultCheck && prevSelected?.teacherNote ? (
        <p>
          <span className="text-gray-400">Teacher's Note:</span>{" "}
          {prevSelected?.teacherNote}
        </p>
      ) : (
        ""
      )}
      {evaluatedResult?.teacherNote && <div className="py-4">{renderMessage()}</div>}

      {teacher && question.questionType == "text"
        ? renderTeacherInputs()
        : null}
    </div>
  );
}
