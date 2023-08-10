import React, { useEffect, useMemo } from "react";
import { doc, addDoc, collection, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { db } from "/src/firebase";
import { notify } from "react-notify-toast";
import { useNavigate, useMatch } from "@tanstack/react-location";
import AssignmentQuestions from "./components/Assignmnet-Questions";
import moment from 'moment';

const CreateAssignment = ({ action }) => {

  const { params: { assignmentId } } = useMatch();
  const navigate = useNavigate();
  const [totalMarks, setTotalMarks] = useState(0);
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [isEditAnswer, setIsEditAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assignmentObject, setAssignmentObject] = useState({
    title: '',
    description: '',
    deadline: null,
    assignmentType: 'school-assessment',
    totalMarks: 0,
    instructions: null,
    questions: [{
      questionText: '',
      questionMarks: 1,
      explanation: '',
      questionType: 'mcq',
      image: null,
      isSaved: false,
      answers: [{
        answerText: '',
        answer: false,
        isSaved: false,
      }]
    }],
  })

  useEffect(() => {
    if (assignmentId && action == 'update') {
      assignmentFetch();
    }
  }, [assignmentId])

  useEffect(() => {
    if (assignmentObject.questions.length == 0) {
      const tempQuestions = assignmentObject.questions;
      tempQuestions.push({
        questionText: '',
        questionMarks: 1,
        explanation: '',
        questionType: 'mcq',
        image: null,
        isSaved: false,
        answers: [{
          answerText: '',
          answer: false,
          isSaved: false,

        }]
      });

      setAssignmentObject(prevAssignment => {
        return { ...prevAssignment, questions: tempQuestions }
      })
    }
  })

  const assignmentFetch = async () => {
    setLoading(true);
    const docRef = doc(db, "assignments", assignmentId);
    const docSnap = await getDoc(docRef);
    let editAssignment = docSnap.data();
    editAssignment.questions.forEach((element) => {
      element.isSaved = true
    })
    editAssignment.questions.push({
      questionText: '',
      questionMarks: 1,
      explanation: '',
      questionType: 'mcq',
      image: null,
      isSaved: false,
      answers: [{
        answerText: '',
        answer: false,
        isSaved: false,
      }]
    });

    setAssignmentObject(editAssignment);
    setLoading(false);
  };

  const onChange = (event, qIndex, aIndex) => {
    const { name, value } = event.target;
    if (!isNaN(qIndex) && !isNaN(aIndex)) {
      const tempAns = assignmentObject.questions[qIndex].answers.map((answer, answerIndex) => {
        if (answerIndex == aIndex) {
          return { ...answer, [name]: value }
        }
        return answer;
      });
      const tempQuestions = assignmentObject.questions.map((question, questionIndex) => {
        if (questionIndex == qIndex) {
          return { ...question, answers: tempAns }
        }
        return question;
      });
      setAssignmentObject(prevAssignment => {
        return { ...prevAssignment, questions: tempQuestions }
      })
    }
    else if (!isNaN(qIndex)) {
      const tempQuestions = assignmentObject.questions.map((question, questionIndex) => {
        if (questionIndex == qIndex) {
          return { ...question, [name]: value }
        }
        return question;
      });
      setAssignmentObject(prevAssignment => {
        return { ...prevAssignment, questions: tempQuestions }
      })
    }
    else {
      setAssignmentObject(prevAssignment => {
        return { ...prevAssignment, [name]: value }
      })
    }
  }
  const onChangeImage = (file, qIndex) => {
    const storage = getStorage();
    const storageRef = ref(storage, `question-images/${file.name}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        const tempQuestions = assignmentObject.questions.map((question, index) => {
          if (index == qIndex) {
            return { ...question, image: url }
          }
          return question;
        });
        setAssignmentObject(prevAssignment => {
          return { ...prevAssignment, questions: tempQuestions }
        })
      })
    })

  }

  const addAnswer = (qIndex) => {

    const tempAns = assignmentObject.questions[qIndex].answers;
    tempAns.push({
      answerText: '',
      answer: false,
      isSaved: false,
    })
    const tempQuestions = assignmentObject.questions.map((question, questionIndex) => {
      if (questionIndex == qIndex) {
        return { ...question, answers: tempAns }
      }
      return question;
    });
    setAssignmentObject(prevAssignment => {
      return { ...prevAssignment, questions: tempQuestions }
    })
  }


  const validateQuestion = () => {
    let isValid = true
    let length = assignmentObject?.questions.length;

    const { explanation, questionText } = assignmentObject.questions[length - 1];
    if (explanation !== '' && questionText !== '') {
      if (assignmentObject.questions[length - 1].questionType === 'mcq') {
        let trueValueCounter = 0
        assignmentObject.questions[length - 1].answers.map((answer, index) => {
          if (!answer.answerText) {
            isValid = false
            notify.show(`Answer can't be empty`, "error", 5000);
          }
          if (answer.answer) {
            trueValueCounter++
          }
          if (assignmentObject.questions[length - 1].answers.length < 2) {
            isValid = false
            notify.show(`Need to add At least 2 options (answers)`, "error", 5000);
          }
        })
        if (trueValueCounter == 0) {
          isValid = false
          notify.show(`Need to select at least 1 'TRUE' value`, "error", 5000);
        } else if (trueValueCounter > 1) {
          isValid = false
          notify.show(`Need to select at most 1 'TRUE' value`, "error", 5000);
        }
      }
    } else {
      isValid = false;
      notify.show(`Enter complete question details`, "error", 5000);
    }

    return isValid
  }

  const saveQuestion = () => {

    let deadline = new Date(assignmentObject.deadline).toUTCString().split(' ').slice(0, 4).join(' ');
    let assignmentMarks = 0;

    // assignmentObject.questions.map((question, questionIndex) => {
    //   assignmentMarks = assignmentMarks + parseInt(question.questionMarks);
    //   setTotalMarks(assignmentMarks);
    // })

    let tempQuestions = assignmentObject.questions.map((question, indexQ) => {
      if (indexQ == (assignmentObject.questions.length - 1)) {
        let tempAnswers = question.answers.map((answer, indexA) => {
          if (indexA == (question.answers.length - 1)) {
            return { ...answer, isSaved: true }
          }
          return answer;
        })
        return { ...question, answers: tempAnswers }
      }
      return question;
    })

    setAssignmentObject(prevAssignment => {
      return {
        ...prevAssignment, totalMarks: assignmentMarks, deadline: deadline, questions: tempQuestions, instructions: [
          "Read all the instructions and questions carefully.",
          "Answer all questions.",
          `The deadline for this assignment is ${deadline}`,
        ]
      }
    })

    if (validateQuestion()) {
      const tempQuestions = assignmentObject.questions.map((question, questionIndex) => {
        return { ...question, isSaved: true };
      });
      tempQuestions.push({
        questionText: '',
        questionMarks: 1,
        explanation: '',
        questionType: 'mcq',
        image: null,
        isSaved: false,
        answers: [{
          answerText: '',
          answer: false,
          isSaved: false,
        }]
      });

      setAssignmentObject(prevAssignment => {
        return { ...prevAssignment, questions: tempQuestions }
      })
    }
  }

  const validateSaveQuestion = (qIndex) => {
    let isValid = true
    let trueValueCounter = 0
    const { explanation, questionText } = assignmentObject.questions[qIndex];
    if (explanation !== '' && questionText !== '') {
      if (assignmentObject.questions[qIndex].questionType === 'mcq') {
        assignmentObject.questions[qIndex].answers.map((answer, index) => {
          if (!answer.answerText) {
            isValid = false
            notify.show(`Answer can't be empty`, "error", 5000);
          }
          if (answer.answer == "true") {
            trueValueCounter++
          }

          if (assignmentObject.questions[qIndex].answers.length < 2) {
            isValid = false
            notify.show(`Need to add At least 2 options (answers)`, "error", 5000);
          }
        })
        if (trueValueCounter == 0) {
          isValid = false
          notify.show(`Need to select at least 1 'TRUE' value`, "error", 5000);
        } else if (trueValueCounter > 1) {
          isValid = false
          notify.show(`Need to select at most 1 'TRUE' value`, "error", 5000);
        } else {
          isValid = true;
        }
      }
    } else {
      isValid = false;
      notify.show(`Enter complete question details`, "error", 5000);
    }

    return isValid
  }

  const validateForm = () => {

    let isValid = true
    const { deadline, description, questions, title } = assignmentObject;
    if (title !== '' && description !== '' && deadline != null) {
      /** 
       * Here we have to check the length but as we are adding a blank object in array 
       * so instead on one we are expecting minimum length of array will be 2
       */
      if ((action === 'update' && !questions.length) || questions.length < 2) {
        isValid = false
        notify.show(`Add 1 question at least`, "error", 5000);
      }
      else if (questions.at(-1).questionText) {
        isValid = validateQuestion()
      }

    } else {
      isValid = false
      notify.show(`Enter complete assignment details`, "error", 5000);
    }
    return isValid
  }

  const publishAssignment = async () => {
    const length = assignmentObject.questions.length;
    if (validateForm()) {
      if (assignmentObject?.questions[length - 1]?.questionText == '') {
        let tempQuestions = assignmentObject.questions;
        tempQuestions.splice(-1)
        setAssignmentObject(prevAssignment => {
          return { ...prevAssignment, questions: tempQuestions }
        });
      }
      try {
        if (action == 'update') {
          const editDoc = doc(db, "assignments", assignmentId);
          await setDoc(editDoc, assignmentObject)
          notify.show(`Assignment Successfully Updated`, "success", 5000);
          navigate({ to: `/teacher-dashboard`, replace: true });
        } else {
          const docRef = await addDoc(collection(db, "assignments"), assignmentObject);
          await updateDoc(docRef, {
            assignmentId: docRef.id,
          });
          notify.show(`Assignment Successfully Published`, "success", 5000);
          setTotalMarks(0)
          navigate({ to: `/teacher-dashboard`, replace: true });
        }

      } catch (e) {
        console.error("Error adding document: ", e);
        notify.show(
          "Error occurred while publishing assignment. Please try again.",
          "error",
          5000
        );
        setTotalMarks(0)
      }
    }
  };

  const handleDeleteQuestion = (qIndex) => {
    let updatedMarks = totalMarks - assignmentObject.questions[qIndex].questionMarks;
    let tempAssignment = assignmentObject.questions.filter((o, index) => index !== qIndex);

    setTotalMarks(updatedMarks)

    setAssignmentObject(prevAssignment => {
      return { ...prevAssignment, questions: tempAssignment, totalMarks: updatedMarks }
    })
  }

  const updateMarks = () => {
    let updatedMarks = 0
    assignmentObject.questions.forEach(element => {
      if (element.questionText) {
        updatedMarks += Number(element.questionMarks);
      }
    });
    setTotalMarks(updatedMarks);
    assignmentObject.totalMarks = updatedMarks
  };



  const handleEditQuestion = (qIndex) => {

    let tempAssignment = assignmentObject.questions.map((question, index) => {
      if (index == qIndex) {
        let tempAns = question.answers.map((answer, answerIndex) => {
          return { ...answer, isSaved: false }
        });
        return { ...question, isSaved: false, answers: tempAns }
      }
      return question;
    });
    setAssignmentObject(prevAssignment => {
      return { ...prevAssignment, questions: tempAssignment }
    })
    setIsEditQuestion(true);
  }
  const handleSaveQuestion = (qIndex) => {
    if (validateSaveQuestion(qIndex)) {

      let tempAns = assignmentObject.questions[qIndex].answers.map((answer, answerIndex) => {
        return { ...answer, isSaved: true }
      });
      let tempQuestions = assignmentObject.questions.map((question, questionIndex) => {
        if (questionIndex == qIndex) {
          return { ...question, isSaved: true, answers: tempAns };
        }
        return question;
      });
      setAssignmentObject(prevAssignment => {
        return { ...prevAssignment, questions: tempQuestions }
      })
      setIsEditQuestion(false);
    }
  }

  const handleSaveAnswer = (questionIndex, answerIndex) => {

    if (assignmentObject.questions[questionIndex].answers[answerIndex].answerText !== '') {
      let tempQuestion = assignmentObject.questions.map((question, index) => {
        if (index == questionIndex) {
          let tempAnswer = question.answers.map((answer, index) => {
            if (index == answerIndex) {
              return { ...answer, isSaved: true }
            }
            return answer;
          })
          return { ...question, answers: tempAnswer }
        }
        return question;
      });

      setAssignmentObject(prevAssignment => {
        return { ...prevAssignment, questions: tempQuestion }
      })
      setIsEditAnswer(false);
    } else {
      notify.show(`Cannot save empty answer`, "error", 5000);
    }


  }

  const handleDeleteAnswer = (questionIndex, answerIndex) => {

    let tempAnswers = assignmentObject.questions[questionIndex].answers.filter(((o, index) => index !== answerIndex))

    let tempQuestions = assignmentObject.questions.map((question, index) => {
      if (index == questionIndex) {
        return { ...question, answers: tempAnswers }
      }
      return question;
    })

    setAssignmentObject(prevAssignment => {
      return { ...prevAssignment, questions: tempQuestions }
    })
  }

  const handleEditAnswer = (questionIndex, answerIndex) => {

    setIsEditAnswer(true);

    let tempQuestion = assignmentObject.questions.map((question, index) => {
      if (index == questionIndex) {
        let tempAnswer = question.answers.map((answer, index) => {
          if (index == answerIndex) {
            return { ...answer, isSaved: false }
          };
          return answer;
        })
        return { ...question, answers: tempAnswer }
      }
      return question;
    });
    if (assignmentObject.questions[questionIndex].answers[answerIndex].answerText !== '') {
      setAssignmentObject(prevAssignment => {
        return { ...prevAssignment, questions: tempQuestion }
      })
    } else {
      notify.show(`Cannot save empty answer`, "error", 5000);
    }

  }

  useMemo(() => {
    updateMarks();
  }, [assignmentObject])

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
          <form onSubmit={(e) => e.preventDefault()}>
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
                      value={assignmentObject.title}
                      onChange={onChange}
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
                      value={assignmentObject.description}
                      onChange={onChange}
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      value={assignmentObject.deadline}
                      onChange={onChange}
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
                      value={assignmentObject.assignmentType}
                      onChange={onChange}
                    >
                      <option value={"school-assessment"}>School Based Assessment</option>
                      <option value={"end-term-assessment"}>End of Term Assessment</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-6 mt-10">
                  {
                    assignmentObject.questions.length > 0 && assignmentObject.questions.map((question, questionIndex) => {
                      return (
                        <AssignmentQuestions
                          question={question}
                          questionIndex={questionIndex}
                          handleDeleteQuestion={handleDeleteQuestion}
                          handleEditQuestion={handleEditQuestion}
                          handleSaveQuestion={handleSaveQuestion}
                          onChange={onChange}
                          onChangeImage={onChangeImage}
                          handleSaveAnswer={handleSaveAnswer}
                          handleEditAnswer={handleEditAnswer}
                          handleDeleteAnswer={handleDeleteAnswer}
                          addAnswer={addAnswer}
                          isEditQuestion={isEditQuestion}
                        />
                      )
                    })
                  }
                </div>

              </div>

              <div className="grid grid-cols-6 gap-6 px-4 py-3 text-right bg-gray-50 sm:px-6">
                <div className="flex justify-start col-span-6 sm:col-span-3 ">
                  <button
                    onClick={saveQuestion}
                    className="block px-4 py-2 text-sm text-white rounded-md bg-mainColor"
                  >
                    Save Question
                  </button>
                </div>
                <div className="flex justify-end col-span-6 sm:col-span-3 ">
                  {
                    action == 'update' ? <button
                      onClick={publishAssignment}
                      className="px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm btn-mainColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button> : <button
                      onClick={publishAssignment}
                      className="px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm btn-mainColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Publish
                    </button>
                  }
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
