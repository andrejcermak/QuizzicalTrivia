export default function QuizQuestion(props){
    function style(answer, correctAnswer){
        if (props.submitted){
            if (answer.clicked){
                return answer.text === correctAnswer ? "single-answer correct-answer" : "single-answer wrong-answer"
            }
            return answer.text === correctAnswer ? "single-answer correct-answer" : "single-answer"
        }
        return answer.clicked ? "single-answer clicked-answer" : "single-answer" 
        
    }
    const answers = props.answers.map(answer => 
        <p onClick={() => props.handleClick(props.id, answer.id)} className={style(answer, props.correctAnswer)}>
            {answer.text}
        </p>
    )
    console.log("render")
    return (<>
        <p className="question">{props.question}</p>
        <div className="answers">{answers}</div>
        </>
        
    )
}