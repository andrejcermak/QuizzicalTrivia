import { useEffect, useState } from "react"
import QuizQuestion from "./QuizQuestion"
import {nanoid} from "nanoid"
import { Outlet, Link, redirect, useFetcher } from "react-router-dom";
import React from 'react';


export default function Quizz() {
    const [questions, setQuestions] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [gameCount, setGameCount] = useState(0)
    useEffect(() => {
        
        fetch("https://opentdb.com/api.php?amount=5")
        .then(response => response.json())
        .then(data => {
            setQuestions(data.results.map(r => {
                console.log(data)
                return {
                    "answers": r.incorrect_answers.concat(r.correct_answer).map(answer => { return {'text': answer, 'clicked': false, 'id': nanoid()}}),
                    "question": r.question,
                    "correctAnswer": r.correct_answer,
                    "answerSet" : false,
                    "id": nanoid()
                }}))
                setSubmitted(false)
         })
        
    }, [gameCount])

    function chooseAnswer(questionId, answerId){
        console.log(questionId)
        setQuestions(oldQuestions => oldQuestions.map(question => {
            return question.id === questionId ? {...question, answers: question.answers.map(answer => {
                return answer.id === answerId ? {...answer, 'clicked': question.answerSet ? false : true  } : answer})}
             : question
        }).map(question => { return {...question, answerSet: question.answers.filter(answer => answer.clicked).length > 0}}))
        
    }
    function getResult(){
        console.log( questions.filter(question => {console.log(question.correctAnswer, question.answers.filter(answer => answer.clicked)[0])}))
        return questions.filter(question => question.correctAnswer === question.answers.filter(answer => answer.clicked)[0]?.text).length
    }
    const questionComponents = questions.map(q => 
        <QuizQuestion 
            key={q.id}
            id={q.id}
            question={q.question} 
            answers={q.answers}
            submitted={submitted}
            correctAnswer={q.correctAnswer}
            handleClick={chooseAnswer}
        />)
    return (
        <div className="quiz-container">
            {questionComponents}
            {!submitted && <p className='button' onClick={() => {
                setSubmitted(true)
                }}> Submit </p>}
            {submitted && 
                <div className="after-submit-control">
                <div className="result"> You scored {getResult()}/5 correct answers</div>
                <div className='button submit-control' onClick={() => setGameCount(oldGameCount => oldGameCount + 1)} to={`/quiz`}>
                    Play again
                </div>
                </div>}
        </div>
        
    )
}