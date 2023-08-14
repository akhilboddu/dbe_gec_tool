import {
  Link,
  useMatch,
  useNavigate,
  useLocation,
} from "@tanstack/react-location";
import clsx from "clsx";
import { isEmpty } from "lodash-es";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import Question from "/src/components/question/question";
import Error from "/src/components/shared/error";
import Info from "/src/components/shared/info";
import { QueryKeys } from "/src/constants/query-keys";
import { auth, db } from "/src/firebase";
import { postTestResultsInCourseApi } from "/src/helpers/fetchers";

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


export default function QuestionList({
  questions,
  subject,
  attemptData,
  teacherId,
  attemptedResultId,
  gradeId,
  isMarking,
  totalMarks
}) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState();
  const [teacherNotes, setTeacherNotes] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [score, setScore] = useState(attemptData?.score);
  const [textAnswers, setTextAnswers] = useState([]);
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const currentPath = currentLocation.current.pathname;
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
          if (answer?.teacherNote) {
            data[i].teacherNote = answer?.teacherNote;
          }
          if (answer.answer !== undefined) {
            data[i].answer = answer.answer;
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
      const correctAnswerIds = [];
      const textAnswersArr = [];
      let tempScore = 0;

      for (let index = 0; index < selectedAnswers.length; index++) {
        const selectedAnswer = selectedAnswers[index];
        console.log("selectedAnswer:: :: ", selectedAnswer);
        if (selectedAnswer.questionType == "mcq" && selectedAnswer?.answer === "true") {
          
          correctAnswerIds.push(selectedAnswer)
          tempScore = tempScore + Number(selectedAnswer.questionMarks)
        }
        else if (selectedAnswer.questionType == "text") {
          textAnswersArr.push(selectedAnswer)
        }
      }
      setCorrectAnswerIds(correctAnswerIds);
      setTextAnswers(textAnswersArr);
      setScore(tempScore);
      openModal();

      handleRanking(tempScore);
      saveTestScore(tempScore, textAnswersArr);
    } else {
      let newCorrectAnswers = 0;
      teacherNotes.forEach((element) => {
        if (element.answer == "true") {
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
        percentage:
          Math.floor((data.score / totalMarks) * 100 * 100) / 100,
      });
      navigate({ to: `/grades/${auth.currentUser.uid}`, replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  const saveTestScore = async (finalScore, textAnswersArr) => {
    fetchUserData().then(async () => {
      const { uid } = userData;
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth() + 1
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
    const date = `${current.getDate()}/${current.getMonth() + 1
      }/${current.getFullYear()}`;
    try {
      const docRef = await addDoc(collection(db, "grades"), {
        totalMarks: totalMarks,
        student: userId,
        test: testId,
        score: finalScore,
        date: date,
        subject: subject,
        attemptId: attemptId,
        percentage:
          Math.floor((finalScore / totalMarks) * 100 * 100) / 100,
        status: textAnswersArr.length > 0 ? "evaluationPending" : "evaluated",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getAttemptedAnswer = (index) => {
    const found = attemptData?.answers.find((o) => o.question === index+1);
    return found;
  };

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const renderButton = () => {
    if (!attemptData) {
      return score ? (
        <Link to={`/grades`}>
          <button className="btn-mainColor btn">See Grades</button>
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
            index={index+1}
            register={register}
            image={question.image}
            heading={question.heading}
            answers={question.answers}
            questionMarks={question.questionMarks}
            explanation={question.explanation}
            disabled={score}
            evaluatedResult={attemptData?.answers[index]}
            handelSelectedAnswers={handelSelectedAnswers}
            resultCheck={attemptData ? true : false}
            prevSelected={getAttemptedAnswer(index)}
            teacher={teacherId}
          />
        ))}

       

        {renderButton()}
      </form>

      {/* modal */}
      <div>
        <div className={clsx("modal mt-0", { "modal-open": isModal })}>
          <div className="space-y-4 modal-box">
            <h3 className="text-lg font-bold uppercase">
              {textAnswers.length > 0 ? "Provisional Result" : "Test result"}
            </h3>
            <p>
              You scored <span className="font-bold">{score}</span> marks out
              of {totalMarks}
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
              <Link
                to={
                  currentPath.endsWith(`teacher`)
                    ? `/ranking/${testId}/teacher`
                    : `/ranking/${testId}`
                }
              >
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
