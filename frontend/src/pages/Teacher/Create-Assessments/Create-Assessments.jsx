import React, { useEffect, useReducer, useContext} from "react";
import CourseContext from "/src/context/courseContext";
import { doc, updateDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { useState } from "react";
import { render } from "react-dom";
import { set, useForm } from "react-hook-form";
import QuestionAnswer from "../Question-answers";
import TestQuestions from "../Test-questions";
import { db } from "/src/firebase";
import {notify} from "react-notify-toast"

const CreateAssessments = ()=>{

     const ctxQuestions = useContext(CourseContext);
    const {arrTest} = ctxQuestions;

    const { register, handleSubmit } = useForm();
    const [questionIndex,setQuestionIndex] = useState(0)
    const [questionType,setQuestionType] = useState("mcq")
    const [answerText,setAnswerText] = useState()
    const [answerCorrect,setAnswerCorrect] = useState(true)
    const [answerExplanation,setAnswerExplanation] = useState("")
    const [answerIndex,setAnswerIndex] = useState(0)

    const [answers,setAnswers] = useState([{}]);
    const [questions, setQuestions] = useState([{}]);
    

    const addAnswer = (e)=>{
      
      e.preventDefault()

      
      setAnswers(prev=> [...prev,{
         
          answerId: `answer-${questionIndex}`,
          text: answerText,
          isCorrect: answerCorrect,
        }])
      
      
      setAnswerIndex((prev)=>prev+1);
      setAnswerCorrect(true)

      notify.show(`Answer ${answerIndex+1} added`, "success", 2000)

    }




    const addQuestion = (data)=>{
      

      const file = data["question-image-0"][0]? data["question-image-0"][0] : ""

      console.log(file.name)
      const storage = getStorage();
      const storageRef = ref(storage, `question-images/${file.name}`);

      

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');

        getDownloadURL(storageRef).then((url)=>{

          console.log("url downloaded: url," + url)

            answers.shift()

            
            setQuestions(prev => [...prev,{

              index: questionIndex +1,
              explanation: data[`question-explanation-${questionIndex}`],
              questionId: questionIndex + 1,
              image: file==""? null: url,
              text: data[`question-text-${questionIndex}`],
              type: "mcq", //mcq
              answers: [...answers],
            }])

            

            setTest({
              testId : data.titleId,
              title :data.title,
              description :data.description,
              duration :data.duration,
              teacherId :data.teacherId,
              instructions: test.instructions
            })

            console.log(questions, "This is the questions after its set")


            setQuestionIndex(prev => prev + 1);
            setAnswers([{}])
            setQuestionType("mcq")

            notify.show(`Question ${questionIndex+1} added`, "success",2000)


        })
      });

    }



    const saveTest = async(e)=>{

      e.preventDefault()
      
      console.log("Test being saved")

      questions.shift()
      test.questions = [...questions]

      setTest(prev => ({...prev,questions:[...questions]}));

      setDoc(doc(db,'assignments',test.testId),test)


     
      notify.show(`Assignment Successfully Published`, "success", 2000)

    }


    const [test,setTest]=useState({
        testId: "",
        title: "",
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

useEffect(()=>{
  // console.log(test, "Test in useEffect")
},[test])

    return(
        <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-medium leading-6 text-gray-900">Create Assignment</h3>
              <p className="mt-1 text-sm text-gray-600">This page allows you to create an assignment.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" onSubmit={handleSubmit(addQuestion)}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-4">
                      <label  htmlFor="title-Id" className="block text-md font-medium text-gray-700">Assignment ID</label>
                      <input type="text" name="title-Id" id="title-Id"  className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register("titleId", {required: true})}/>
                  </div>
                    
                    <div className="col-span-6 sm:col-span-4">
                      <label  htmlFor="title" className="block text-md font-medium text-gray-700">Assignment Title</label>
                      <input type="text" name="title" id="title"  className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register("title", {required: true})}/>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label  htmlFor="title" className="block text-md font-medium text-gray-700">Teacher's ID</label>
                      <input type="text" name="title" id="title"  className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register("teacherId", {required: true})}/>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="description" className="block text-md font-medium text-gray-700">Description</label>
                      <input type="text" name="description" id="description" className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register("description", {required: true})}/>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="duration" className="block text-md font-medium text-gray-700">Duration</label>
                      <input type="text" name="duration" id="duration" className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register("duration", {required: true})}/>
                    </div>

                    {questions.map((question,index)=>(
                        <TestQuestions answers={answers} addAnswer={addAnswer} register={register} index={index} questionIndex={questionIndex} questionType={questionType} setQuestionType={setQuestionType}  setAnswerText={setAnswerText} setAnswerCorrect={setAnswerCorrect} setAnswerExplanation={setAnswerExplanation}/>
                    ))}

                  
                  </div>
                </div>

                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button type="submit" class="block bg-mainColor text-white text-sm rounded-md py-2 px-4">Save Question</button>
                  <button onClick={saveTest} class="inline-flex justify-center rounded-md border border-transparent btn-mainColor py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Publish</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}

export default CreateAssessments