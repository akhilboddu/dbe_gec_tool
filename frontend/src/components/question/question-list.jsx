import { Link, useMatch } from "@tanstack/react-location";
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
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


const NUM_QUESTIONS_EACH_TEST = 10;

export default function QuestionList({ questions, isMarking }) {



const [selectedAnswers, setSelectedAnswers] = useState([])
const [correctAnswerIds,setCorrectAnswerIds] = useState()
const userData= {}


useEffect(()=>{
  
},[])

const handelSelectedAnswers = (answer) =>{
  
  setSelectedAnswers(prev => [...prev,answer])

}

const fethUserData = async()=>{
        
  const docRef = doc(db,"users", auth.currentUser.uid)
  const docSnap = await getDoc(docRef)
  
  if(docSnap.data()){
      Object.assign(userData,docSnap.data())
  }
  else{
      console.log("There is no user data")
  }
  
}

const handleRanking= async(score)=>{
  
  fethUserData().then(async()=>{

    const {full_name,school_name,Grade,email,} =userData

  const docRef = doc(db,"ranking",testId)
  const docSnap = await getDoc(docRef)


    
  if(!docSnap.data()){
    setDoc(docRef, {ranking:[{full_name:full_name,school_name:school_name,Grade:Grade,email:email,test:testId,score:score}]})
  }else{
    
    docSnap.data().ranking.map((item,index)=>{

      
      if(item.email == email){
        console.log("User already on rank")
        updateDoc(docRef,{ranking:arrayRemove(docSnap.data().ranking[index])})
      }
    })

    updateDoc(docRef,{ranking:arrayUnion({full_name:full_name,school_name:school_name,Grade:Grade,email:email,test:testId,score:score})})



  }

  })
  
  
} 
  // location
  const {
    params: { testId }
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

  const [isModal, setIsModal] = useState(false);
  const [score, setScore] = useState(null);


  
  const onSubmit = () => {
    
    openModal();

    const correctAnswerIds = selectedAnswers.filter((answer) => answer.isCorrect === true);
    console.log(selectedAnswers)
    setCorrectAnswerIds(correctAnswerIds);

    const score = correctAnswerIds.length;
    setScore(score);

    handleRanking(score);

  };


  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  
  return !isEmpty(questions) ? (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pl-4">

        {!isEmpty(errors) && <Error text="You must answer all questions" />}


        {questions.map((question, index) => (
          <Question
            question={question}
            key={index}
            index={question.index}
            register={register}
            image = {question.image}
            heading= {question.heading}
            answers = {question.answers}
            disabled={score}
            handelSelectedAnswers={handelSelectedAnswers}
          />
        ))}

        

        {score?(
          <Link to={`/ranking/${testId}`}><button className="btn btn-mainColor">Ranking</button></Link>
        ):(
          <button className="btn btn-mainColor">Submit</button>
        )}
        
      </form>

      {/* modal */}
      <div>
        <div className={clsx("modal mt-0", { "modal-open": isModal })}>
          <div className="modal-box space-y-4">
            <h3 className="text-lg font-bold uppercase">Test result</h3>
            <p>
              You scored <span className="font-bold">{score}</span> points out
              of {questions.length}
            </p>
    
            <div className="modal-action">
              <button onClick={closeModal} className="btn btn-main-Color">
              View Results
              </button>
              <Link to={`/ranking/${testId}`} >
              <button className="btn btn-mainColor">
              Ranking Page
              </button>
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
