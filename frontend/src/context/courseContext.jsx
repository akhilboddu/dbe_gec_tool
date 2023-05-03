import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase";

const CourseContext = createContext();

export const CourseContextProvider = (props) => {


  const arrTest = [
    {
      testId: "MathematicsGrade9",
      title: "Mathematics Grade 9 (2021)",
      duration: "90 min",
      description: "National Assessment, Read the Instruction Carefull",
      instructions: [
        "Read all the instructions and questions carefully.",
        "Choose the letter of the correct answer.",
        "Answer all questions.",
        "The duration of this test is 90 minutes.",
      ],
      questions: [
        {
          //Question 1
          index: "1",
          questionId: 1,
          image: "https://i.ibb.co/P1vH8MF/Math-Sec1-Qeust1.png",
          text: "What is the output value?",
          type: "text", //mcq
          answers: [
            //Answers for Question 1
            {
              answerId: "q1a1",
              text: 3,
              isCorrect: false,
            },
            {
              answerId: "q1a2",
              text: 7,
              isCorrect: false,
            },
            {
              answerId: "q1a3",
              text: 43,
              isCorrect: true,
            },
            {
              answerId: "q1a4",
              text: 47,
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2
          index: "2",
          questionId: 2,
          image: "https://i.ibb.co/K00XbM4/math-sect1-quest2.png",
          text: "Using the rule above, what is the value of m?",
          correctAnswer: {
            answerId: "q2a3",
            text: "5/2",
            isCorrect: true,
          },
          answers: [
            //Answers for Question 1
            {
              answerId: "q2a1",
              text: 7,
              isCorrect: false,
            },
            {
              answerId: "q2a2",
              text: 10,
              isCorrect: false,
            },
            {
              answerId: "q2a3",
              text: "5/2",
              isCorrect: true,
            },
            {
              answerId: "q2a4",
              text: "3/2",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 3
          index: "3",
          questionId: 3,
          image: "https://i.ibb.co/P1M7XnV/Math-sect1-quest3.png",
          text: "What is the rule and the value for 𝑥?",
          answers: [
            //Answers for Question 1
            {
              answerId: "q3a1",
              text: "𝑦 = 2𝑥 − 3; 𝑥 = 9",
              isCorrect: false,
            },
            {
              answerId: "q3a2",
              text: "𝑦 = 2𝑥 + 3; 𝑥 = 6",
              isCorrect: false,
            },
            {
              answerId: "q3a3",
              text: "𝑦 = 0.5𝑥 + 3; 𝑥 = 24",
              isCorrect: true,
            },
            {
              answerId: "q3a4",
              text: "𝑦 = 0.5𝑥 − 3; 𝑥 = 36",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 4
          index: "4",
          questionId: 4,
          image: null,
          text: "Volume of a cylinder is 𝑉 = 𝜋𝑟 2 ℎ, ℎ = 2 50 cm, 𝜋 = 3,14 and 𝑟 = 15 cm. What is the volume the cylinder, in cm³?",
          answers: [
            //Answers for Question 4
            {
              answerId: "q4a1",
              text: "17 66,25",
              isCorrect: false,
            },
            {
              answerId: "q4a2",
              text: "11 775",
              isCorrect: false,
            },
            {
              answerId: "q4a3",
              text: "176 625",
              isCorrect: true,
            },
            {
              answerId: "q4a4",
              text: "17 662 500",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 5
          index: "5",
          questionId: 5,
          image: "https://i.ibb.co/VHbk42C/maths-qeust5.png",
          text: "Which formula best represents the given 𝑥 and 𝑦 values?",
          answers: [
            //Answers for Question 5
            {
              answerId: "q5a1",
              text: "𝑦 = 3𝑥 − 5",
              isCorrect: false,
            },
            {
              answerId: "q5a2",
              text: "𝑦 = −3𝑥 − 1",
              isCorrect: false,
            },
            {
              answerId: "q5a3",
              text: "𝑦 = 3𝑥 2 − 7",
              isCorrect: true,
            },
            {
              answerId: "q5a4",
              text: "𝑦 = 𝑥2 − 5",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 6
          index: "6",
          questionId: 6,
          image: "https://i.ibb.co/VHbk42C/maths-qeust5.png",
          text: "Which formula best represents the given 𝑥 and 𝑦 values?",
          answers: [
            //Answers for Question 6
            {
              answerId: "q6a1",
              text: "𝑦 = 2𝑥 + 8",
              isCorrect: false,
            },
            {
              answerId: "q6a2",
              text: "𝑦 = −3𝑥 − 1",
              image: "https://i.ibb.co/xgMycM1/Maths-quest6-ans2.png",
              isCorrect: false,
            },
            {
              answerId: "q6a3",
              text: "Input 𝑥 × 2 − 4 = output 𝑦",
              isCorrect: true,
            },
            {
              answerId: "q6a4",
              text: "",
              image: "https://i.ibb.co/j6CCnvn/maths-quest6-ans4.png",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 7
          index: "7",
          questionId: 7,
          image: "https://i.ibb.co/tYV0LN9/maths-quest7.png",
          text: "Which one of the following equations represents the line which passes through the above points?",
          correctAnswer: {
            answerId: "q7a3",
            text: "5/2",
            isCorrect: true,
          },
          answers: [
            //Answers for Question 7
            {
              answerId: "q7a1",
              text: "4𝑥 + 6𝑦 − 10 = 0",
              isCorrect: false,
            },
            {
              answerId: "q7a2",
              text: "3𝑥 − 2𝑦 − 24 = 0",
              isCorrect: false,
            },
            {
              answerId: "q7a3",
              text: "−6𝑥 − 4𝑦 = 0",
              isCorrect: true,
            },
            {
              answerId: "q7a4",
              text: "2𝑦 + 3𝑥 + 2 = 0",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 8
          index: "8",
          questionId: 8,
          image: "https://i.ibb.co/hg4LJm0/maths-quest8.png",
          text: "Which of the following graphs is represented by the given graphs?",
          answers: [
            //Answers for Question 8
            {
              answerId: "q8a1",
              text: "",
              image: "https://i.ibb.co/stBJrhb/maths-quest8-ans1.png",
              isCorrect: false,
            },
            {
              answerId: "q8a2",
              image: "https://i.ibb.co/Wf6GsTL/maths-quest8-ans2.png",
              isCorrect: false,
            },
            {
              answerId: "q8a3",
              image: "",
              isCorrect: true,
            },
            {
              answerId: "q8a4",
              image: "https://i.ibb.co/zPvHFKm/maths-quest8-ans4.png",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 8
          index: "9",
          questionId: 9,
          text: "Which one of the following phrases best describes the gradient of graph 𝑓?",
          answers: [
            //Answers for Question 9
            {
              answerId: "q9a1",
              text: "Gradient is undefined.",
              isCorrect: false,
            },
            {
              answerId: "q9a2",
              text: "Gradient is zero.",
              isCorrect: false,
            },
            {
              answerId: "q9a3",
              text: "Gradient is negative.",
              isCorrect: true,
            },
            {
              answerId: "q9a4",
              text: "Gradient is positive",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 10
          index: "10",
          questionId: 10,
          text: "Which one of the following graphs best describes an undefined gradient?",
          answers: [
            //Answers for Question 10
            {
              answerId: "q10a1",
              image: "https://i.ibb.co/QkV0VRg/maths-quest10-ans1.png",
              isCorrect: false,
            },
            {
              answerId: "q10a2",
              image: "https://i.ibb.co/MPYvYtT/maths-quest10-ans2.png",
              isCorrect: false,
            },
            {
              answerId: "q10a3",
              image: "https://i.ibb.co/480RTk3/maths-quest10-ans3.png",
              isCorrect: true,
            },
            {
              answerId: "q10a4",
              image: "https://i.ibb.co/W2PZ18C/maths-quest10-ans4.png",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 11
          index: "11",
          questionId: 11,
          image: "https://i.ibb.co/0tXBS4G/maths-quest11.png",
          text: "What is the relationship between lines A and B in terms of their gradient?",
          answers: [
            //Answers for Question 11
            {
              answerId: "q11a1",
              text: "Their gradients are equal.",
              isCorrect: false,
            },
            {
              answerId: "q11a2",
              text: "The product of their gradients is −1.",
              isCorrect: false,
            },
            {
              answerId: "q11a3",
              text: "The product of their gradients is 1.",
              isCorrect: true,
            },
            {
              answerId: "q10a4",
              text: "The sum of their gradients is 0.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 12
          index: "12",
          questionId: 12,
          text: "Which one of the following statements is true, if two straight lines are perpendicular?",
          answers: [
            //Answers for Question 12
            {
              answerId: "q12a1",
              text: "The gradients are equal.",
              isCorrect: false,
            },
            {
              answerId: "q12a2",
              text: "The product of the gradients is 1.",
              isCorrect: false,
            },
            {
              answerId: "q12a3",
              text: "The sum of the gradients is 0.",
              isCorrect: true,
            },
            {
              answerId: "q12a4",
              text: "The product of the gradients is −1.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 13
          index: "13",
          questionId: 13,
          text: "Which one of the following statements is true, if two straight lines are perpendicular?",
          image: "https://i.ibb.co/MM75GN1/maths-quest13.png",
          answers: [
            //Answers for Question 13
            {
              answerId: "q13a1",
              text: "-3/5",
              isCorrect: false,
            },
            {
              answerId: "q13a2",
              text: "-6/5",
              isCorrect: false,
            },
            {
              answerId: "q13a3",
              text: "-0/1",
              isCorrect: true,
            },
            {
              answerId: "q13a4",
              text: "-8/3",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 14
          index: "14",
          questionId: 14,
          heading: "2𝑦 − 3𝑥 = 4",
          text: "Which statement best describes the given equation?",
          answers: [
            //Answers for Question 14
            {
              answerId: "q14a1",
              text: "Positive gradient and positive 𝑦-intercept.",
              isCorrect: false,
            },
            {
              answerId: "q14a2",
              text: "Positive gradient and negative 𝑦-intercept.",
              isCorrect: false,
            },
            {
              answerId: "q14a3",
              text: "Negative gradient and positive 𝑦-intercept.",
              isCorrect: true,
            },
            {
              answerId: "q14a4",
              text: "Negative gradient and negative 𝑦-intercept.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 15
          index: "15",
          questionId: 15,
          heading: "2𝑦 − 3𝑥 = 4",
          text: "Which statement best describes the given equation?",
          answers: [
            //Answers for Question 15
            {
              answerId: "q15a1",
              text: "Positive gradient and positive 𝑦-intercept.",
              isCorrect: false,
            },
            {
              answerId: "q15a2",
              text: "Positive gradient and negative 𝑦-intercept.",
              isCorrect: false,
            },
            {
              answerId: "q15a3",
              text: "Negative gradient and positive 𝑦-intercept.",
              isCorrect: true,
            },
            {
              answerId: "q15a4",
              text: "Negative gradient and negative 𝑦-intercept.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 16
          index: "16",
          questionId: 16,
          heading: null,
          text: "What are the coordinates of Zʹ, the image of Z(−3 ; 3) if reflected in the X-axis?",
          answers: [
            //Answers for Question 16
            {
              answerId: "q16a1",
              text: "(−3 ; −3)",
              isCorrect: false,
            },
            {
              answerId: "q16a2",
              text: "(3 ; −3)",
              isCorrect: false,
            },
            {
              answerId: "q16a3",
              text: "(−3 ; 3)",
              isCorrect: true,
            },
            {
              answerId: "q16a4",
              text: "(3 ; 3)",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 17
          index: "17",
          questionId: 17,
          heading: "P(−2 ; −3) maps onto Pʹ(−2 ; 3).",
          text: "What type of transformation is indicated above?",
          answers: [
            //Answers for Question 17
            {
              answerId: "q17a1",
              text: "Reflection in the X-axis.",
              isCorrect: false,
            },
            {
              answerId: "q17a2",
              text: "Reflection in the Y-axis.",
              isCorrect: false,
            },
            {
              answerId: "q17a3",
              text: "Translation to the right.",
              isCorrect: true,
            },
            {
              answerId: "q17a4",
              text: "Translation downwards.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 18
          index: "18",
          questionId: 18,
          heading: "M(𝑥; 𝑦) is mapped onto Mʹ(−3 ; 5).",
          text: "What are the coordinates of M if M is reflected in the X-axis?",
          answers: [
            //Answers for Question 18
            {
              answerId: "q18a1",
              text: "(−3 ; 5)",
              isCorrect: false,
            },
            {
              answerId: "q18a2",
              text: "(3 ; 5)",
              isCorrect: false,
            },
            {
              answerId: "q18a3",
              text: "(−3 ; −5)",
              isCorrect: true,
            },
            {
              answerId: "q18a4",
              text: "(3 ; − 5)",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 19
          index: "19",
          questionId: 19,
          heading:
            "D(−2 ; 3) maps onto Dʹ(−2 ; −3), the reflection in the X-axis",
          text: "Which rule represents the above mentioned mapping?",
          answers: [
            //Answers for Question 19
            {
              answerId: "q19a1",
              text: "(𝑥 ; 𝑦) → (−𝑥 ; 𝑦)",
              isCorrect: false,
            },
            {
              answerId: "q19a2",
              text: "(𝑥 ; 𝑦) → (-𝑥 ; − 𝑦)",
              isCorrect: false,
            },
            {
              answerId: "q19a3",
              text: "(𝑥 ; 𝑦) → (𝑥 ; − 𝑦)",
              isCorrect: true,
            },
            {
              answerId: "q19a4",
              text: "(𝑥 ; 𝑦) → (𝑥 ; 𝑦)",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 20
          index: "20",
          questionId: 20,
          image: "https://i.ibb.co/z2PqBpr/maths-quest20.png",
          heading: null,
          text: "Which figure represents the reflection in the X-axis?",
          answers: [
            //Answers for Question 20
            {
              answerId: "q20a1",
              text: "Fig 1",
              isCorrect: false,
            },
            {
              answerId: "q20a2",
              text: "Fig 2",
              isCorrect: false,
            },
            {
              answerId: "q20a3",
              text: "Fig 3",
              isCorrect: true,
            },
            {
              answerId: "q20a4",
              text: "Fig 4",
              isCorrect: false,
            },
          ],
        },
      ],
    },
    {
      testId: "EnglishGrade9",
      title: "English Grade 9 (2021)",
      duration: "90 min",
      instructions: [
        "Read all the instructions and questions carefully.",
        "Choose the letter of the correct answer.",
        "Answer all questions.",
        "The duration of this test is 90 minutes.",
      ],
      description: "National Assessment, Read the Instruction Carefull",
      questions: [
        {
          //Question 1
          //Question 1.1
          index: "1.1",
          questionId: "1.1",
          questionHeading: "Question 1: Newspaper article",
          image: "https://i.ibb.co/hXMD33m/Eng-sect1-quest1.png",
          text: "Where did Siya Kolisi watch the 2007 rugby world cup final?",
          answers: [
            //Answers for Question 1.1
            {
              text: "At a tavern",
              isCorrect: true,
            },
            {
              text: "At home",
              isCorrect: false,
            },
            {
              text: "At the neighbour’s",
              isCorrect: false,
            },
            {
              text: "At a friend’s home",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.2
          index: "1.2",
          questionId: "1.2",
          image: null,
          text: "What is the purpose of this text?",
          answers: [
            //Answers for Question 1.2
            {
              answerId: "q2a1",
              text: "to encourage young kids to have fun",
              isCorrect: false,
            },
            {
              answerId: "q2a2",
              text: "to encourage young kids to be tough",
              isCorrect: true,
            },
            {
              answerId: "q2a3",
              text: "to encourage young kids to play rugby",
              isCorrect: false,
            },
            {
              answerId: "q2a4",
              text: "to encourage young kids to follow their dreams",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.3
          index: "1.3",
          questionId: "1.3",
          image: null,
          text: "Who is Siya Kolisi’s friend? (paragraph 5)",
          answers: [
            //Answers for Question 1.3
            {
              answerId: "q3a1",
              text: "Stormers",
              isCorrect: false,
            },
            {
              answerId: "q3a2",
              text: "African Bombers",
              isCorrect: false,
            },
            {
              answerId: "q3a3",
              text: "Nicholas Holton",
              isCorrect: true,
            },
            {
              answerId: "q3a4",
              text: "Allister Coetzee",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.4
          index: "1.4",
          questionId: "1.4",
          image: null,
          text: "Which word best suits the meaning of ‘guiding’ in paragraph 1?",
          answers: [
            //Answers for Question 1.4
            {
              answerId: "q4a1",
              text: "winning",
              isCorrect: false,
            },
            {
              answerId: "q4a2",
              text: "leading",
              isCorrect: true,
            },
            {
              answerId: "q4a3",
              text: "losing",
              isCorrect: false,
            },
            {
              answerId: "q4a4",
              text: "drawing",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.5
          index: "1.5",
          questionId: "1.5",
          image: null,
          text: "Who would enjoy reading this article?",
          answers: [
            //Answers for Question 1.5
            {
              text: "people who like rugby",
              isCorrect: false,
            },
            {
              text: "people from Zwide",
              isCorrect: false,
            },
            {
              text: "all South Africans",
              isCorrect: true,
            },
            {
              text: "people from the townships",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.6
          index: "1.6",
          questionId: "1.6",
          image: null,
          text: "What did Siya Kolisi experience at the age of ten? (paragraph 3)",
          answers: [
            //Answers for Question 1.6
            {
              text: "His grandmother died in his arms.",
              isCorrect: true,
            },
            {
              text: "His grandfather died in his arms.",
              isCorrect: false,
            },
            {
              text: "His mother died in his arms.",
              isCorrect: false,
            },
            {
              text: "His father died in his arms.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.7
          index: "1.7",
          questionId: "1.7",
          image: null,
          text: "Why was Siya’s favourite toy a brick?",
          answers: [
            //Answers for Question 1.7
            {
              text: "He had plenty of toys.",
              isCorrect: false,
            },
            {
              text: "He had no other toys.",
              isCorrect: true,
            },
            {
              text: "There were plenty of bricks.",
              isCorrect: false,
            },
            {
              text: "The brick was heavy.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.8
          index: "1.8",
          questionId: "1.8",
          image: null,
          text: "Why was Siya Kolisi offered a scholarship at Grey Junior school? (paragraph 4)",
          answers: [
            //Answers for Question 1.8
            {
              text: "He was tough.",
              isCorrect: false,
            },
            {
              text: "He was smart.",
              isCorrect: false,
            },
            {
              text: "He was intelligent.",
              isCorrect: false,
            },
            {
              text: "His talent was spotted.",
              isCorrect: true,
            },
          ],
        },
        {
          //Question 1.9
          index: "1.9",
          questionId: "1.9",
          image: null,
          heading: "“township to test star”",
          text: "Which figure of speech has been used in the above phrase?",
          answers: [
            //Answers for Question 1.9
            {
              text: "alliteration",
              isCorrect: true,
            },
            {
              text: "onomatopoeia",
              isCorrect: false,
            },
            {
              text: "simile",
              isCorrect: false,
            },
            {
              text: "metaphors",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.10
          index: "1.10",
          questionId: "1.10",
          image: null,
          heading: null,
          text: "What was Siya’s international breakthrough? (paragraph 6)",
          answers: [
            //Answers for Question 1.10
            {
              text: "He joined the African Bombers.",
              isCorrect: false,
            },
            {
              text: "He played against the Stormers.",
              isCorrect: false,
            },
            {
              text: "He played against Scotland.",
              isCorrect: true,
            },
            {
              text: "He joined the Springboks.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.11
          index: "1.11",
          questionId: "1.11",
          image: null,
          heading: "“progressed through the rugby ranks” (paragraph 6)",
          text: "What can you conclude from the phrase?",
          answers: [
            //Answers for Question 1.11
            {
              text: "moved through rugby divisions",
              isCorrect: true,
            },
            {
              text: "moved to lower rugby divisions",
              isCorrect: false,
            },
            {
              text: "moved to same rugby divisions",
              isCorrect: false,
            },
            {
              text: "moved to other rugby divisions",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.12
          index: "1.12",
          questionId: "1.12",
          image: null,
          heading: null,
          text: "Which of these sentences is a fact?",
          answers: [
            //Answers for Question 1.12
            {
              text: "Siya played in the first World Cup Final in 2007.",
              isCorrect: false,
            },
            {
              text: "Siya was the Springboks’ coach in 2007.",
              isCorrect: false,
            },
            {
              text: "Siya was named captain of the Springboks in 2017.",
              isCorrect: false,
            },
            {
              text: "Siya was named vice-captain of the Springboks in 2017.",
              isCorrect: true,
            },
          ],
        },
        {
          //Question 1.13
          index: "1.13",
          questionId: "1.13",
          image: null,
          heading: null,
          text: "How does Siya set his goals against his difficult upbringing (Paragraph 6)?",
          answers: [
            //Answers for Question 1.13
            {
              text: "He aims to be the better player in the world.",
              isCorrect: false,
            },
            {
              text: "He aims to be the worst player in the world.",
              isCorrect: false,
            },
            {
              text: "He aims to be the best player in the world.",
              isCorrect: true,
            },
            {
              text: "He aims to be the best performer in the world.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.14
          index: "1.14",
          questionId: "1.14",
          image: null,
          heading: null,
          text: "What is the meaning of the phrase ‘hang in there’ in paragraph 3?",
          answers: [
            //Answers for Question 1.14
            {
              text: "not to give up",
              isCorrect: true,
            },
            {
              text: "not to panic",
              isCorrect: false,
            },
            {
              text: "went to join friends",
              isCorrect: false,
            },
            {
              text: "went to smoke",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.15
          index: "1.15",
          questionId: "1.15",
          image: null,
          heading: null,
          text: "Which of the phrases is an example of manipulative language used in paragraph 7?",
          answers: [
            //Answers for Question 1.15
            {
              text: "‘not about the pay cheque’",
              isCorrect: true,
            },
            {
              text: "“love doing what I do”",
              isCorrect: false,
            },
            {
              text: "“inspire as many people”",
              isCorrect: false,
            },
            {
              text: "“likes giving back”",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.16
          index: "1.16",
          questionId: "1.16",
          image: null,
          heading: null,
          text: "What did Siya contribute to his township team? (paragraph 7)",
          answers: [
            //Answers for Question 1.15
            {
              text: "organised a new changing room",
              isCorrect: true,
            },
            {
              text: "organised a pay cheque",
              isCorrect: false,
            },
            {
              answerId: "q5a3",
              text: "used rugby as a platform",
              isCorrect: false,
            },
            {
              answerId: "q5a4",
              text: "used background as a platform",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.17
          index: "1.17",
          questionId: "1.17",
          image: null,
          heading: null,
          text: "What is the use of the hyphen in the word ‘vice – captain’?",
          answers: [
            //Answers for Question 1.15
            {
              answerId: "q6a1",
              text: "to split a compound word",
              isCorrect: false,
            },
            {
              answerId: "q5a2",
              text: "to divide a compound word",
              isCorrect: false,
            },
            {
              answerId: "q5a3",
              text: "to separate a compound word",
              isCorrect: false,
            },
            {
              answerId: "q5a4",
              text: "to create a compound word",
              isCorrect: true,
            },
          ],
        },
        {
          //Question 1.18
          index: "1.18",
          questionId: "1.18",
          image: null,
          heading: null,
          text: "Why does Siya appeal for the care of young people? (Paragraph 8)",
          answers: [
            //Answers for Question 1.18
            {
              text: "He does not want children to wander like him.",
              isCorrect: false,
            },
            {
              text: "He does not want children to suffer like him.",
              isCorrect: true,
            },
            {
              text: "He does not want children to get lost.",
              isCorrect: false,
            },
            {
              text: "He does not like children to have role models.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.19
          index: "1.19",
          questionId: "1.19",
          image: null,
          heading: null,
          text: "What is the author’s attitude towards Siya Kolisi? (paragraph 8)",
          answers: [
            //Answers for Question 1.19
            {
              text: "The author portrays Siya Kolisi as a humble person.",
              isCorrect: true,
            },
            {
              text: "The author portrays Siya Kolisi as a spiritual person.",
              isCorrect: false,
            },
            {
              answerId: "q5a3",
              text: "The author portrays Siya Kolisi as an arrogant person.",
              isCorrect: false,
            },
            {
              answerId: "q5a4",
              text: "The author portrays Siya Kolisi as a selfish person.s",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 1.20
          index: "1.20",
          questionId: "1.20",
          image: null,
          heading: null,
          text: "How did you feel when reading this text?",
          answers: [
            //Answers for Question 1.20
            {
              text: "excited",
              isCorrect: false,
            },
            {
              text: "motivated",
              isCorrect: true,
            },
            {
              text: "impatient",
              isCorrect: false,
            },
            {
              text: "bored",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2.1
          index: "2.1",
          questionId: "2.1",
          image: "https://i.ibb.co/hVSMs1C/eng-quest2.png",
          heading: "Question 2: Visual Literacy: Advertisement",
          text: "What is the name of the company that placed this advertisement?",
          answers: [
            //Answers for Question 1.20
            {
              answerId: "q2.1a1",
              text: "What is the name of the company that placed this advertisement?",
              isCorrect: false,
            },
            {
              answerId: "q5a2",
              text: "MyGig 20",
              isCorrect: true,
            },
            {
              answerId: "q5a3",
              text: "More data",
              isCorrect: false,
            },
            {
              answerId: "q5a4",
              text: "More surfing",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2.2
          index: "2.2",
          questionId: "2.2",
          image: null,
          heading: null,
          text: "Which product is being advertised?",
          answers: [
            //Answers for Question 1.20
            {
              answerId: "q2.1a1",
              text: "GB for R499",
              isCorrect: false,
            },
            {
              answerId: "q5a2",
              text: "20GB of data",
              isCorrect: true,
            },
            {
              answerId: "q5a3",
              text: "GB of data",
              isCorrect: false,
            },
            {
              answerId: "q5a4",
              text: "data for R3121",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2.3
          index: "2.3",
          questionId: "2.3",
          image: null,
          heading: null,
          text: "What is the effect of the punctuation in the word ‘Mofaya Summer!’?",
          answers: [
            //Answers for Question 1.20
            {
              answerId: "q2.1a1",
              text: "to express the availability of data and airtime",
              isCorrect: false,
            },
            {
              answerId: "q5a2",
              text: "to express pleasure in the availability of data",
              isCorrect: true,
            },
            {
              answerId: "q5a3",
              text: "to express pleasure of data connection",
              isCorrect: false,
            },
            {
              answerId: "q5a4",
              text: "to express pleasure in the availability of fire",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2.4
          index: "2.4",
          questionId: "2.4",
          image: null,
          heading: null,
          text: "What is the effect of “R499’ being written in bold?",
          answers: [
            //Answers for Question 1.20
            {
              text: "to attract the attention of surfers",
              isCorrect: false,
            },
            {
              text: "to attract the attention of the sellers",
              isCorrect: true,
            },
            {
              text: "to attract the attention of the buyers",
              isCorrect: false,
            },
            {
              text: "to attract the attention of the companies",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2.5
          index: "2.5",
          questionId: "2.5",
          image: null,
          heading: null,
          text: "Who is likely to buy this product?",
          answers: [
            //Answers for Question 1.20
            {
              text: "The people who like to save money.",
              isCorrect: false,
            },
            {
              text: "The people who like calling.",
              isCorrect: true,
            },
            {
              text: "The people who like summer.",
              isCorrect: false,
            },
            {
              text: "The people who use the Internet.",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2.6
          index: "2.6",
          questionId: "2.6",
          image: null,
          heading: null,
          text: "What is the slogan of the advertised product?",
          answers: [
            //Answers for Question 1.20
            {
              answerId: "q2.6a1",
              text: "More data",
              isCorrect: false,
            },
            {
              answerId: "q2.6a2",
              text: "Power to you",
              isCorrect: true,
            },
            {
              answerId: "q2.6a3",
              text: "More surfing",
              isCorrect: false,
            },
            {
              answerId: "q2.6a3",
              text: "Mofaya Summer",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2.7
          index: "2.7",
          questionId: "2.7",
          image: null,
          heading: null,
          text: "What is the caption of this advertisement?",
          answers: [
            //Answers for Question 1.20
            {
              answerId: "q2.7a1",
              text: "More data",
              isCorrect: false,
            },
            {
              answerId: "q2.7a2",
              text: "More surfing",
              isCorrect: true,
            },
            {
              answerId: "q2.7a3",
              text: "Normal price",
              isCorrect: false,
            },
            {
              answerId: "q2.7a4",
              text: "Mofaya Summer",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2.8
          index: "2.8",
          questionId: "2.8",
          image: null,
          heading: null,
          text: "Which of the following indicates manipulative language?",
          answers: [
            //Answers for Question 1.20
            {
              answerId: "q2.8a1",
              text: "Now only R499",
              isCorrect: false,
            },
            {
              answerId: "q2.8a2",
              text: "Use of twitter",
              isCorrect: true,
            },
            {
              answerId: "q2.8a3",
              text: "Use of facebook",
              isCorrect: false,
            },
            {
              answerId: "q2.8a4",
              text: "Power to you",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2.9
          index: "2.9",
          questionId: "2.9",
          image: null,
          heading: null,
          text: "How will your device access the data?",
          answers: [
            //Answers for Question 1.20
            {
              answerId: "q2.9a1",
              text: "use twitter",
              isCorrect: false,
            },
            {
              answerId: "q2.9a2",
              text: "use a modem",
              isCorrect: true,
            },
            {
              text: "Use of facebook",
              isCorrect: false,
            },
            {
              answerId: "q2.9a3",
              text: "use You Tube",
              isCorrect: false,
            },
          ],
        },
        {
          //Question 2.10
          index: "2.10",
          questionId: "2.10",
          image: null,
          heading: null,
          text: "How do you know that the product is ‘hot’ and selling?",
          answers: [
            //Answers for Question 2.10
            {
              answerId: "q2.10a1",
              text: "it is on sale",
              isCorrect: false,
            },
            {
              answerId: "q2.10a2",
              text: "it is on prepaid",
              isCorrect: true,
            },
            {
              answerId: "q2.10a3",
              text: "it is in flames",
              isCorrect: false,
            },
            {
              answerId: "q2.10a4",
              text: "it is on promotion",
              isCorrect: false,
            },
          ],
        },
      ],
    },
  ];
  return (
    <CourseContext.Provider value={{ arrTest }}>
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
