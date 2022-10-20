import { Link } from "@tanstack/react-location";
import { useState } from "react";
import Error from "/src/components/shared/error";
import Success from "/src/components/shared/success";

export default function Question({
  question,
  index,
  // register,
  disabled,
  answers,
  image,
  handelSelectedAnswers,
  isCorrect
})
{ 
  console.log(disabled)
  return (
    <div className="space-y-4">
      {question.questionHeading&& <h1 className="font-bold">{question.questionHeading}</h1>}
      
        {image? <img src={image} alt="someimage" />:""} 

      <p>
        {index}. {question.text}
      </p>
      <div className="space-y-2 pl-4">
        {answers.map((answer, index) => (

          
           <div key={index} className="flex items-center gap-2 ">
            <input
              key={answer.index}
              type="radio" 
              className={`radio radio-sm`} 
              value={answer.text}
              name= {question.questionId}
              onChange={()=>handelSelectedAnswers(answer)}
            /> 
            <label htmlFor={answer.answerId}>{answer.text}</label>

            {disabled || disabled ===0?(
              answer.isCorrect=== true?<Success text={"This is the correct answer."} /> : null
            ):null}
          </div>
         
        
        ))}
      </div>

      
      

      {/* {disabled ? (
         isCorrect? (
          <Success text={question.description} />
        ) : (
          <Error text={question.description} />
        )
      ) : null} */}
    </div>
  );
    }
