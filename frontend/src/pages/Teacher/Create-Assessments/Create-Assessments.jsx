import React, { useEffect, useReducer } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { useState } from "react";
import { render } from "react-dom";
import { set, useForm } from "react-hook-form";
import QuestionAnswer from "../Question-answers";
import TestQuestions from "../Test-questions";
import { db } from "/src/firebase";


const CreateAssessments = ()=>{

  

    const { register, handleSubmit } = useForm();
    const [questionIndex,setQuestionIndex] = useState(0)
    const [answerText,setAnswerText] = useState()
    const [answerCorrect,setAnswerCorrect] = useState(false)
    const [answerExplanation,setAnswerExplanation] = useState("")
    const [answerIndex,setAnswerIndex] = useState(0)

    const addAnswer = (e)=>{
      
      e.preventDefault()

      console.log(answerText, answerExplanation)


      test.questions[questionIndex].answers[answerIndex] =(
        {
          answerId: `answer-${questionIndex}`,
          text: answerText,
          isCorrect: answerCorrect,
          explanation: answerExplanation
        }
      )

      setAnswerIndex((prev)=>prev+1);

      console.log(test.questions[questionIndex].answers)
    }

    const addQuestion = (data)=>{
      
      console.log(data);

      
      const file = data["question-image-0"][0]

      console.log(file.name)
      const storage = getStorage();
      const storageRef = ref(storage, `question-images/${file.name}`);

      

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');

        getDownloadURL(storageRef).then((url)=>{

          console.log("url downloaded: url," + url)

      test.testId = data.titleId
      test.Title = data.title
      test.description= data.description
      test.duration = data.duration
      test.questions[questionIndex]=({

        index: questionIndex +1,
        questionId: questionIndex + 1,
        image: url,
        text: data[`question-text-${questionIndex}`],
        type: "mcq", //mcq
        answers: [...test.questions[questionIndex].answers],
      })

      setQuestionIndex(test.questions.length -1);

      console.log(questionIndex)
      console.log(test)

        })
      });

    }



    const saveTest = async(e)=>{

      e.preventDefault()
        console.log("Test saved")
        console.log(test)

        const testRef = doc(db, "test", "test");

        await updateDoc(testRef, {
          arrTest: arrayUnion(test)
      });


    }


    const [test,setTest] =useState({
        testId: "MathematicsGrade9",
        Title: "Mathematics Grade 9 (2021)",
        duration: "90 min",
        description: "National Assessment, Read the Instruction Carefull",
        instructions: [
          "Read all the instructions and questions carefully.",
          "Choose the letter of the correct answer.",
          "Answer all questions.",
          "The duration of this test is 90 minutes.",
        ],
        questions: [{
            index: "",
            questionId: "",
            image: "",
            text: "data[`question-text-${questionIndex}`]",
            type: "mcq", //mcq
            answers: [
            {
            
          }]
          }
        ],
});


    return(
        <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-medium leading-6 text-gray-900">Create Assessments</h3>
              <p className="mt-1 text-sm text-gray-600">This page allows you to create a Assessments.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" onSubmit={handleSubmit(addQuestion)}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-4">
                      <label  htmlFor="Title-Id" className="block text-md font-medium text-gray-700">Test ID</label>
                      <input type="text" name="Title-Id" id="Title-Id"  className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register("titleId", {required: true})}/>
                  </div>
                    
                    <div className="col-span-6 sm:col-span-4">
                      <label  htmlFor="Title" className="block text-md font-medium text-gray-700">Test Title</label>
                      <input type="text" name="Title" id="Title"  className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register("title", {required: true})}/>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="description" className="block text-md font-medium text-gray-700">Description</label>
                      <input type="text" name="description" id="description" className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register("description", {required: true})}/>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="duration" className="block text-md font-medium text-gray-700">Duration</label>
                      <input type="text" name="duration" id="duration" className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register("duration", {required: true})}/>
                    </div>
                    
                    <div className="col-span-6 sm:col-span-4">
                      <h2 className="block text-lg font-medium text-gray-900">Questions</h2>
                    </div>

                    {test.questions.map((question,index)=>(
                        <TestQuestions addAnswer={addAnswer} register={register} index={index}/>
                    ))}

                    {test.questions[questionIndex].answers.map((answer,index)=>(
                        <QuestionAnswer addAnswer={addAnswer} index={index} setAnswerText={setAnswerText} setAnswerCorrect={setAnswerCorrect} setAnswerExplanation={setAnswerExplanation}/>
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