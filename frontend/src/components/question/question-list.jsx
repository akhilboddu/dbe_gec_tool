import { Link, useMatch, useNavigate } from "@tanstack/react-location";
import clsx from "clsx";
import { isEmpty } from "lodash-es";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Question from "/src/components/question/question";
import Error from "/src/components/shared/error";
import Info from "/src/components/shared/info";
import { QueryKeys } from "/src/constants/query-keys";
import { auth, db } from "/src/firebase";
import { postTestResultsInCourseApi } from "/src/helpers/fetchers";
import CourseContext from "/src/context/courseContext";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";

const NUM_QUESTIONS_EACH_TEST = 10;

export default function QuestionList({
  questions,
  subject,
  attemptData,
  teacherId,
  attemptedResultId,
  gradeId,
  isMarking,
}) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState();
  const [teacherNotes, setTeacherNotes] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [score, setScore] = useState(attemptData?.score);
  const [textAnswers, setTextAnswers] = useState([]);
  const navigate = useNavigate();
  const userData = {};

  const handelSelectedAnswers = (answer) => {
    if (!teacherId) {
      setSelectedAnswers((prev) => {
        let data = prev;
        const i = data.findIndex((o) => o.question === answer.question);
        if (i !== -1) {
          data[i] = answer;
        } else {
          data.push(answer);
        }
        return data;
      });
    } else {
      setTeacherNotes((prev) => {
        let data = prev;
        const i = data.findIndex((o) => o.question === answer.question);
        if (i !== -1) {
          if (answer.teacherNote) {
            data[i].teacherNote = answer.teacherNote;
          }
          if (answer.isCorrect !== undefined) {
            data[i].isCorrect = answer.isCorrect;
          }
          if (answer.marks) {
            data[i].marks = answer.marks;
          }
        } else {
          data.push(answer);
        }
        return data;
      });
    }
  };

  const fetchUserData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.data()) {
      Object.assign(userData, docSnap.data());
    } else {
      console.log("There is no user data");
    }
  };

  const handleRanking = async (score) => {
    fetchUserData().then(async () => {
      const { full_name, school_name, Grade, email } = userData;

      const docRef = doc(db, "ranking", testId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.data()) {
        setDoc(docRef, {
          ranking: [
            {
              full_name: full_name,
              school_name: school_name,
              Grade: Grade,
              email: email,
              test: testId,
              score: score,
            },
          ],
        });
      } else {
        docSnap.data().ranking.map((item, index) => {
          if (item.email == email) {
            console.log("User already on rank");
            updateDoc(docRef, {
              ranking: arrayRemove(docSnap.data().ranking[index]),
            });
          }
        });

        updateDoc(docRef, {
          ranking: arrayUnion({
            full_name: full_name,
            school_name: school_name,
            Grade: Grade,
            email: email,
            test: testId,
            score: score,
          }),
        });
      }
    });
  };
  // location
  const {
    params: { testId },
  } = useMatch();

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // query
  const queryClient = useQueryClient();

  const testResultMutation = useMutation(
    (data) => postTestResultsInCourseApi(courseId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.TEST_RESULTS_BY_COURSE,
          courseId,
        ]);
      },
    }
  );

  const onSubmit = () => {
    if (!teacherId) {
      const correctAnswerIds = selectedAnswers.filter(
        (answer) => answer.type == "mcq" && answer?.isCorrect === true
      );
      setCorrectAnswerIds(correctAnswerIds);
      const textAnswersArr = selectedAnswers.filter(
        (answer) => answer.type == "text"
      );

      setTextAnswers(textAnswersArr);
      const score = correctAnswerIds.length;
      setScore(score);
      openModal();

      handleRanking(score);
      saveTestScore(score, textAnswersArr);
    } else {
      let newCorrectAnswers = 0;
      teacherNotes.forEach((element) => {
        if (element.isCorrect) {
          newCorrectAnswers = Number(newCorrectAnswers) + Number(element.marks);
        }
        attemptData.answers = attemptData.answers.map((a) => {
          if (a.question == element.question) {
            return element;
          }
          return a;
        });
      });
      attemptData.score = Number(attemptData.score) + Number(newCorrectAnswers);
      updateAttemptedTest(attemptData);
    }
  };

  const updateAttemptedTest = async (data) => {
    try {
      const attemptRef = doc(db, "attempted_results", attemptedResultId);
      await updateDoc(attemptRef, {
        answers: data.answers,
        score: data.score,
      });
      const gradeRef = doc(db, "grades", gradeId);
      await updateDoc(gradeRef, {
        status: "evaluated",
        score: data.score,
      });
      navigate({ to: "/grades", replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  const saveTestScore = async (finalScore, textAnswersArr) => {
    fetchUserData().then(async () => {
      const { uid } = userData;
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;

      try {
        const docRef = await addDoc(collection(db, "attempted_results"), {
          student: uid,
          test: testId,
          score: finalScore,
          date: date,
          answers: selectedAnswers,
        });
        saveGrades(finalScore, docRef.id, uid, textAnswersArr);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  };

  const saveGrades = async (finalScore, attemptId, userId, textAnswersArr) => {
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    try {
      const docRef = await addDoc(collection(db, "grades"), {
        student: userId,
        test: testId,
        score: finalScore,
        date: date,
        subject: subject,
        attemptId: attemptId,
        status: textAnswersArr.length > 0 ? "evaluationPending" : "evaluated",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getAttemptedAnswer = (index) => {
    const found = attemptData?.answers.find((o) => o.question === index);
    return found;
  };

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const renderButton = () => {
    if (!attemptData) {
      return score ? (
        <Link to={`/ranking/${testId}`}>
          <button className="btn-mainColor btn">Ranking</button>
        </Link>
      ) : (
        <button className="btn-mainColor btn">Submit</button>
      );
    } else {
      if (teacherId) {
        return <button className="btn-mainColor btn">Submit</button>;
      } else {
        return (
          <Link to={`/ranking/${testId}`}>
            <button className="btn-mainColor btn">Ranking</button>
          </Link>
        );
      }
    }
  };

  return !isEmpty(questions) ? (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="pl-4 space-y-8">
        {!isEmpty(errors) && <Error text="You must answer all questions" />}

        {questions.map((question, index) => (
          <Question
            question={question}
            key={index}
            index={question.index}
            register={register}
            image={question.image}
            heading={question.heading}
            answers={question.answers}
            disabled={score}
            handelSelectedAnswers={handelSelectedAnswers}
            resultCheck={attemptData ? true : false}
            prevSelected={getAttemptedAnswer(question.index)}
            teacher={teacherId}
          />
        ))}

        {renderButton()}
      </form>

      {/* modal */}
      <div>
        <div className={clsx("modal mt-0", { "modal-open": isModal })}>
          <div className="space-y-4 modal-box">
            <h3 className="text-lg font-bold uppercase">{textAnswers.length > 0 ? "Provisional Result": "Test result"}</h3>
            <p>
              You scored <span className="font-bold">{score}</span> points out
              of {questions.length}
            </p>
            {textAnswers.length > 0 ? (
              textAnswers.length == 1 ? (
                <p>{textAnswers.length} question is pending for evaluation.</p>
              ) : (
                <p>
                  {textAnswers.length} questions are pending for evaluation.
                </p>
              )
            ) : null}

            <div className="modal-action">
              <button onClick={closeModal} className="btn-main-Color btn">
                View Results
              </button>
              <Link to={`/ranking/${testId}`}>
                <button className="btn-mainColor btn">Ranking Page</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Info text="No question" />
  );
}
