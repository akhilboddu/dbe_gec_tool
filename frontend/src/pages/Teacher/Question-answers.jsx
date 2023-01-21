import React from "react";


const QuestionAnswer =({addAnswer, register,index,setAnswerText,setAnswerCorrect,setAnswerExplanation})=>{


  const handleOnChange=(value)=>{

    if(value=="false"){
      setAnswerCorrect(false)
    }else{
      setAnswerCorrect(true)
    }
      
  }



    return(
        <>
        
        <div class="col-span-6 sm:col-span-4">
        

        <label  class="block text-md font-medium text-gray-700">{`Answer ${index+1} text`}</label>
        <input type="text" name={`answer-text-${index}`} class="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" onChange={(e)=>{setAnswerText(e.target.value)}}/>
      </div>

      <div class="col-span-6 sm:col-span-4">
        <label class="block text-md font-medium text-gray-700">True/False</label>
        <select name={`answer-correct-${index}`} onChange={(e)=>handleOnChange(e.target.value)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>


        <br/>
        <br/>
        <button className ="block bg-mainColor text-white text-sm rounded-md py-2 px-4" onClick={addAnswer}>Add Answer</button>

         
      </div>

      </>
    )
}

export default QuestionAnswer;