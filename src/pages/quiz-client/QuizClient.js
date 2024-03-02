import { useEffect, useState } from "react";
import API from '../../routes/api';

const QuizClient = (props) => {
  const id = props.match.params.id || '';
  const [quiz, setQuiz] = useState({});
 
  useEffect(() => {
    API.get('client/'+id)
    .then(res => {
      console.log(res);
      setQuiz(res.data.data);
    })
    .catch(err => console.log(err));
  },[id]);
  return(
    <div>
      <h1>{quiz.quizName}</h1>
      <div>
        {quiz.questions && quiz.questions.map((question, i) => 
          <div key={i}>
          <h3>{question.questionText}</h3>
            <p>Alternatives:</p>
              {question.answers.map((answer, index) => 
              <ul key={index}>
                <li><input type="radio" name={`alternative-${i}`} /><span>{answer}</span></li>
              </ul>
              )}
          </div>
        )}
        <div>
          <button>Previous Question</button>
          <button>Next Question</button>
        </div>
      </div>
    </div>
  );
}

export default QuizClient;