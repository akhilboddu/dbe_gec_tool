import React from "react";
import { useForm } from "react-hook-form";

const TestQuestions = ({addAnswer, register, index})=>{


    return(
        <>
        <div class="col-span-6 sm:col-span-4">
            <label className="block text-md font-medium text-gray-700">Text</label>
            <input type="text" name={index} className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register(`question-text-${index}`, {required: true})}/>
        </div>

        <div class="col-span-6 sm:col-span-4">
            <label className="block text-md font-medium text-gray-700">Upload image</label>
            <input type="file" name={index} className="bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" {...register(`question-image-${index}`, {required: false})}/>
        </div>
        
        <div className="col-span-6 sm:col-span-4">
            <h2 className="block text-md font-medium text-gray-700">Question answers</h2>
        </div>
        
        </>
    )
}

export default TestQuestions