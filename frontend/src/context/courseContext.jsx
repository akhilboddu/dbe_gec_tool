import React, {createContext} from "react";






const CourseContext = createContext();

export const CourseContextProvider = (props) =>{
    
  
    const arrTest = [
        {
        testId: "test01",
        Title : "Mathematics Grade 9 (2021)",
        duration: "90 min",
        description:"National Assessment, Read the Instruction Carefull",
        instructions: [
            "Read all the instructions and questions carefully.",
            "Choose the letter of the correct answer.",
            "Answer all questions.",
            "The duration of this test is 90 minutes."
        ],
            questions:[
                {
                    //Question 1
                    index:"1",
                    questionId: 1,
                    image: "https://i.ibb.co/P1vH8MF/Math-Sec1-Qeust1.png",
                    text:"What is the output value?",
                    answers: [
                        //Answers for Question 1
                        {
                            answerId:"q1a1",
                            text:3,
                            isCorrect: false
                        },
                        {
                            answerId:"q1a2",
                            text:7,
                            isCorrect: false
                        },{
                            answerId:"q1a3",
                            text:43,
                            isCorrect: true
                        },{
                            answerId:"q1a4",
                            text:47,
                            isCorrect: false
                        }
                    ]
                },{
                    //Question 2
                    index: "2",
                    questionId: 2,
                    image: "https://i.ibb.co/K00XbM4/math-sect1-quest2.png",
                    text:"Using the rule above, what is the value of m?",
                    correctAnswer: {
                        answerId:"q2a3",
                        text:"5/2",
                        isCorrect: true
                    },
                    answers: [
                        //Answers for Question 1
                        {
                            answerId:"q2a1",
                            text:7,
                            isCorrect: false
                        },
                        {
                            answerId:"q2a2",
                            text:10,
                            isCorrect: false
                        },{
                            answerId:"q2a3",
                            text:"5/2",
                            isCorrect: true
                        },{
                            answerId:"q2a4",
                            text:"3/2",
                            isCorrect: false
                        }
                    ]
                },{
                    //Question 3
                    index: "3",
                    questionId: 3,
                    image: "https://i.ibb.co/P1M7XnV/Math-sect1-quest3.png",
                    text:"What is the rule and the value for 𝑥?",
                    correctAnswer: {
                        answerId:"q2a3",
                        text:"5/2",
                        isCorrect: true
                    },
                    answers: [
                        //Answers for Question 1
                        {
                            answerId:"q3a1",
                            text:"𝑦 = 2𝑥 − 3; 𝑥 = 9",
                            isCorrect: false
                        },
                        {
                            answerId:"q3a2",
                            text:"𝑦 = 2𝑥 + 3; 𝑥 = 6",
                            isCorrect: false
                        },{
                            answerId:"q3a3",
                            text:"𝑦 = 0.5𝑥 + 3; 𝑥 = 24",
                            isCorrect: true
                        },{
                            answerId:"q3a4",
                            text:"𝑦 = 0.5𝑥 − 3; 𝑥 = 36",
                            isCorrect: false
                        }
                    ]
                }
            ]   
    },{
        testId: "test02",
        Title : "English Grade 9 (2021)",
        duration: "90 min",
        instructions: [
            "Read all the instructions and questions carefully.",
            "Choose the letter of the correct answer.",
            "Answer all questions.",
            "The duration of this test is 90 minutes."
        ],
        description:"National Assessment, Read the Instruction Carefull",
        questions:[
                {
                    //Question 1
                    //Question 1.1
                    index:"1.1",
                    questionId: 1,
                    questionHeading: "Question 1: Newspaper article",
                    image: "https://i.ibb.co/hXMD33m/Eng-sect1-quest1.png",
                    text:"Where did Siya Kolisi watch the 2007 rugby world cup final?",
                    answers: [
                        //Answers for Question 1.1
                        {
                            answerId:"q1a1",
                            text:"At a tavern",
                            isCorrect: true
                        },
                        {
                            answerId:"q1a2",
                            text:"At home",
                            isCorrect: false
                        },{
                            answerId:"q1a3",
                            text:"At the neighbour’s",
                            isCorrect: false
                        },{
                            answerId:"q1a4",
                            text:"At a friend’s home",
                            isCorrect: false
                        }
                    ]
                },{
                    //Question 1.2
                    index: "1.2",
                    questionId: 2,
                    image: null,
                    text:"What is the purpose of this text?",
                    answers: [
                        //Answers for Question 1.2
                        {
                            answerId:"q2a1",
                            text:"to encourage young kids to have fun",
                            isCorrect: false
                        },
                        {
                            answerId:"q2a2",
                            text:"to encourage young kids to be tough",
                            isCorrect: true
                        },{
                            answerId:"q2a3",
                            text:"to encourage young kids to play rugby",
                            isCorrect: false
                        },{
                            answerId:"q2a4",
                            text:"to encourage young kids to follow their dreams",
                            isCorrect: false
                        }
                    ]
                },{
                    //Question 1.3
                    index: "1.3",
                    questionId: 3,
                    image: null,
                    text:"Who is Siya Kolisi’s friend? (paragraph 5)",
                    answers: [
                        //Answers for Question 1.3
                        {
                            answerId:"q3a1",
                            text:"Stormers",
                            isCorrect: false
                        },
                        {
                            answerId:"q3a2",
                            text:"African Bombers",
                            isCorrect: false
                        },{
                            answerId:"q3a3",
                            text:"Nicholas Holton",
                            isCorrect: true
                        },{
                            answerId:"q3a4",
                            text:"Allister Coetzee",
                            isCorrect: false
                        }
                    ]
                },{
                    //Question 1.4
                    index: "1.4",
                    questionId: 3,
                    image: null,
                    text:"Which word best suits the meaning of ‘guiding’ in paragraph 1?",
                    answers: [
                        //Answers for Question 1.4
                        {
                            answerId:"q4a1",
                            text:"winning",
                            isCorrect: false
                        },
                        {
                            answerId:"q4a2",
                            text:"leading",
                            isCorrect: true
                        },{
                            answerId:"q4a3",
                            text:"losing",
                            isCorrect: false
                        },{
                            answerId:"q4a4",
                            text:"drawing",
                            isCorrect: false
                        }
                    ]
                }
        ]

    }]
    return(
        <CourseContext.Provider value={{arrTest}}>
            {props.children}
        </CourseContext.Provider>
    )
}

export default CourseContext;