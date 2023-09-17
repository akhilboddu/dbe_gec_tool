import React, { useMemo } from "react";
import { doc, addDoc, collection, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import { db } from "/src/firebase";
import { notify } from "react-notify-toast";
import { useNavigate, useMatch } from "@tanstack/react-location";
import TestQuestions from "../Test-questions";
import { Mixpanel } from "../../../mixpanel";

const CreateTest = ({ action }) => {

  const { params: { testId } } = useMatch();
  const navigate = useNavigate();
  const [totalMarks, setTotalMarks] = useState(0);
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [isEditAnswer, setIsEditAnswer] = useState(false);
  const [testObject, setTestObject] = useState({
    title: '',
    description: '',
    duration: 0,
    testType: 'school-assessment',
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
    if (testId && action == 'update') {
      testFetch();
    }
  }, [testId])

  useEffect(() => {
    if (testObject.questions.length == 0) {
      const tempQuestions = testObject.questions;
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

      setTestObject(prevTest => {
        return { ...prevTest, questions: tempQuestions }
      })
    }


  }, [])

  const testFetch = async () => {
    const docRef = doc(db, "test", testId);
    const docSnap = await getDoc(docRef);
    let editTest = docSnap.data();
    editTest.questions.forEach((element) => {
      element.isSaved = true
    })
    editTest.questions.push({
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
    setTestObject(editTest);
  };

  const onChange = (event, qIndex, aIndex) => {
    const { name, value } = event.target;
    if (!isNaN(qIndex) && !isNaN(aIndex)) {
      const tempAns = testObject.questions[qIndex].answers.map((answer, answerIndex) => {
        if (answerIndex == aIndex) {
          return { ...answer, [name]: value }
        }
        return answer
      });
      const tempQuestions = testObject.questions.map((question, questionIndex) => {
        if (questionIndex == qIndex) {
          return { ...question, answers: tempAns }
        }
        return question;
      });
      setTestObject(prevTest => {
        return { ...prevTest, questions: tempQuestions }
      })
    }

    else if (!isNaN(qIndex)) {
      const tempQuestions = testObject.questions.map((question, questionIndex) => {
        if (questionIndex == qIndex) {
          return { ...question, [name]: value }
        }
        return question;
      });
      setTestObject(prevTest => {
        return { ...prevTest, questions: tempQuestions }
      })
    }
    else {
      setTestObject(prevTest => {
        return { ...prevTest, [name]: value }
      })
    }
  }
  const onChangeImage = (file, qIndex) => {
    const storage = getStorage();
    const storageRef = ref(storage, `question-images/${file.name}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        const tempQuestions = testObject.questions.map((question, index) => {
          if (index == qIndex) {
            return { ...question, image: url }
          }
          return question;
        });
        setTestObject(prevTest => {
          return { ...prevTest, questions: tempQuestions }
        })
      })
    })

  }

  const addAnswer = (qIndex) => {

    const tempAns = testObject.questions[qIndex].answers;
    tempAns.push({
      answerText: '',
      answer: false,
      isSaved: false,
    })
    const tempQuestions = testObject.questions.map((question, questionIndex) => {
      if (questionIndex == qIndex) {
        return { ...question, answers: tempAns }
      }
      return question;
    });
    setTestObject(prevTest => {
      return { ...prevTest, questions: tempQuestions }
    })
  }


  const validateQuestion = () => {
    let isValid = true
    let length = testObject?.questions.length;

    const { explanation, questionText } = testObject.questions[length - 1];
    if (explanation !== '' && questionText !== '') {
      if (testObject.questions[length - 1].questionType === 'mcq') {
        let trueValueCounter = 0
        testObject.questions[length - 1].answers.map((answer, index) => {
          if (!answer.answerText) {
            isValid = false
            notify.show(`Answer can't be empty`, "error", 5000);
          }
          if (answer.answer) {
            trueValueCounter++
          }
          if (testObject.questions[length - 1].answers.length < 2) {
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

    let testMarks = 0;

    // testObject.questions.map((question, index) => {
    //   testMarks = testMarks + parseInt(question.questionMarks);
    //   setTotalMarks(testMarks);
    // })

    let tempQuestions = testObject.questions.map((question, indexQ) => {
      if (indexQ == (testObject.questions.length - 1)) {
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

    setTestObject(prevTest => {
      return {
        ...prevTest, totalMarks: testMarks, questions: tempQuestions, instructions: [
          "Read all the instructions and questions carefully.",
          "Choose the letter of the correct answer.",
          "Answer all questions.",
          `The duration for this test is ${prevTest.duration}`
        ]
      }
    })

    if (validateQuestion()) {
      const tempQuestions = testObject.questions.map((question, questionIndex) => {
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

      setTestObject(prevTest => {
        return { ...prevTest, questions: tempQuestions }
      })
    }
  }

  const validateSaveQuestion = (qIndex) => {
    let isValid = true
    let trueValueCounter = 0
    const { explanation, questionText } = testObject.questions[qIndex];
    if (explanation !== '' && questionText !== '') {
      if (testObject.questions[qIndex].questionType === 'mcq') {

        testObject.questions[qIndex].answers.map((answer, index) => {
          if (!answer.answerText) {
            isValid = false
            notify.show(`Answer can't be empty`, "error", 5000);
          }
          if (answer.answer === true) {
            trueValueCounter++
          }

          if (testObject.questions[qIndex].answers.length < 2) {
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
    const { duration, description, questions, title } = testObject;
    if (title !== '' && description !== '' && duration != '') {
      /** 
       * Here we have to check the length but as we are adding a blank object in array 
       * so instead on one we are expecting minimum length of array will be 2
       */
      if ((action === 'update' && !questions.length) || questions.length < 2) {
        isValid = false
        notify.show(`Add 1 Question At Least`, "error", 5000);
      }
      else if (questions.at(-1).questionText) {
        isValid = validateQuestion()
      }
    } else {
      isValid = false
      notify.show(`Enter complete test details`, "error", 5000);
    }


    return isValid
  }

  const publishTest = async () => {

    const length = testObject.questions.length;
    if (validateForm()) {
      if (testObject?.questions[length - 1]?.questionText == '') {
        let tempQuestions = testObject.questions;
        tempQuestions.splice(-1)
        setTestObject(prevTest => {
          return { ...prevTest, questions: tempQuestions }
        });
      }
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (action == 'update') {
          const editDoc = doc(db, "test", testId);
          if(!editDoc?.school_name){
            testObject.school_name = user.school_name;
          }
          Mixpanel.track("Test updated",{
            title: testObject.title,
            testId: testId
          });
          await setDoc(editDoc, testObject)
          notify.show(`Test Successfully Updated`, "success", 5000);
          navigate({ to: `/teacher/test-list`, replace: true });
        } else {
          const docRef = await addDoc(collection(db, "test"), testObject);
          Mixpanel.track("Test created",{
            title: testObject.title,
            testId: docRef.id
          });
          await updateDoc(docRef, {
            testId: docRef.id,
            school_name: user.school_name
          });
          notify.show(`test Successfully Published`, "success", 5000);
          setTotalMarks(0)
          navigate({ to: `/teacher/test-list`, replace: true });
        }

      } catch (e) {
        Mixpanel.track("Error occurred while publishing test.");
        console.error("Error adding document: ", e);
        notify.show(
          "Error occurred while publishing test. Please try again.",
          "error",
          5000
        );
        setTotalMarks(0)
      }
    }
  };

  const handleDeleteQuestion = (qIndex) => {
    let tempTest = testObject.questions.filter((o, index) => index !== qIndex);

    setTestObject(prevTest => {
      return { ...prevTest, questions: tempTest }
    })
  }

  const updateMarks = () => {
    let updatedMarks = 0
    testObject.questions.forEach(element => {
      if (element.questionText) {
        updatedMarks += Number(element.questionMarks);
      }
    });
    setTotalMarks(updatedMarks);
    testObject.totalMarks = updatedMarks
  };

  const handleEditQuestion = (qIndex) => {

    let tempTest = testObject.questions.map((question, index) => {
      if (index == qIndex) {
        let tempAns = question.answers.map((answer, answerIndex) => {
          return { ...answer, isSaved: false }
        });
        return { ...question, isSaved: false, answers: tempAns }
      }
      return question;
    });
    setTestObject(prevTest => {
      return { ...prevTest, questions: tempTest }
    })
  }
  const handleSaveQuestion = (qIndex) => {
    if (validateSaveQuestion(qIndex)) {

      let tempAns = testObject.questions[qIndex].answers.map((answer, answerIndex) => {
        return { ...answer, isSaved: true }
      });
      let tempQuestions = testObject.questions.map((question, questionIndex) => {
        if (questionIndex == qIndex) {
          return { ...question, isSaved: true, answers: tempAns };
        }
        return question;
      });
      setTestObject(prevTest => {
        return { ...prevTest, questions: tempQuestions }
      })
    }
  }

  const handleSaveAnswer = (questionIndex, answerIndex) => {

    if (testObject.questions[questionIndex].answers[answerIndex].answerText !== '') {
      let tempQuestion = testObject.questions.map((question, index) => {
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

      console.log("tempQuestion: ",tempQuestion)

      setTestObject(prevTest => {
        return { ...prevTest, questions: tempQuestion }
      })

      setIsEditAnswer(false);
    } else {
      notify.show(`Cannot save empty answer`, "error", 5000);
    }

  }

  const handleDeleteAnswer = (questionIndex, answerIndex) => {

    let tempAnswers = testObject.questions[questionIndex].answers.filter(((o, index) => index !== answerIndex))

    let tempQuestions = testObject.questions.map((question, index) => {
      if (index == questionIndex) {
        return { ...question, answers: tempAnswers }
      }
      return question;
    })

    setTestObject(prevTest => {
      return { ...prevTest, questions: tempQuestions }
    })
  }

  const handleEditAnswer = (questionIndex, answerIndex) => {
    setIsEditAnswer(true);

    let tempQuestion = testObject.questions.map((question, index) => {
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

    if (testObject.questions[questionIndex].answers[answerIndex].answerText !== '') {
      setTestObject(prevTest => {
        return { ...prevTest, questions: tempQuestion }
      })
    } else {
      notify.show(`Cannot save empty answer`, "error", 5000);
    }

  }

  useMemo(() => {
    updateMarks();
  }, [testObject])



  return (
    <div className="mt-10 sm:mt-0">
      <div className="flex flex-col">
        <div className="flex justify-between mb-6">
          <div className="px-4 sm:px-0">
            <h3 className="text-xl font-medium leading-6 text-gray-900">
              Create Test
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              This page allows you to create a Test.
            </p>
          </div>
          <div className="mr-5">
            Total Marks: {totalMarks}
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="title"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Test Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={testObject?.title}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="description"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Test Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={testObject?.description}
                      onChange={onChange}
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      value={testObject?.duration}
                      onChange={onChange}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="testType"
                      className="block font-medium text-gray-700 text-md"
                    >
                      Test Type
                    </label>
                    <select
                      name="testType"
                      id="testType"
                      className="mt-1 block h-[36px]  w-full rounded-md border border-gray-300 bg-gray-50 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={testObject?.testType}
                      onChange={onChange}
                    >
                      <option value={"school-assessment"}>School Based Assessment</option>
                      <option value={"end-term-assessment"}>End of Term Assessment</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-6 mt-10">
                  {
                    testObject.questions.length > 0 && testObject.questions.map((question, questionIndex) => {
                      return (
                        <TestQuestions
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
                      onClick={publishTest}
                      className="px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm btn-mainColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button> : <button
                      onClick={publishTest}
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

export default CreateTest;
