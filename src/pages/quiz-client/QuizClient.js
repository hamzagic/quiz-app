import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import API from '../../routes/api';
import Button from "../../components/button/Button";
import { addCurrentQuestion, storeLoadedQuiz } from "../../store/reducers/quizClientReducer";
import Input from "../../components/input/Input";

const QuizClient = (props) => {
  const id = props.match.params.id || '';
  const [quiz, setQuiz] = useState({});
  const [questionQty, setQuestionQty] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isFinishedQuiz, setIsFinishedQuiz] = useState(false);
  const loadedQuiz = useSelector(state => state.quizClient.loadedQuiz);
  const dispatch = useDispatch();
 
  useEffect(() => {
    API.get('client/'+id)
    .then(res => {
      setQuiz(res.data.data);
      setQuestionQty(res.data.data.questions.length);
      dispatch(storeLoadedQuiz(res.data.data));
      // setCurrentQuestion(1);
      dispatch(addCurrentQuestion(1));
    })
    .catch(err => console.log(err));
  },[id, currentQuestion, dispatch, isFinishedQuiz]);

  const handlePreviousQuestion = () => {
    if (currentQuestion >= 0) {
      setCurrentQuestion(currentQuestion - 1);
      dispatch(addCurrentQuestion(currentQuestion - 1));
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion + 1 <= questionQty) {
      setCurrentQuestion(currentQuestion + 1);
      dispatch(addCurrentQuestion(currentQuestion + 1));
    }

    if (currentQuestion + 1 === questionQty) {
      setIsFinishedQuiz(true);
    }
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = () => {
    console.log(answers);
  }

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
    const updatedAnswer = [...answers, e.target.value];
    setAnswers(updatedAnswer);
  }

  return(
    <div>
      <h1>{quiz.quizName}</h1>
      <div>
        <p>{ currentQuestion + 1 } - { loadedQuiz.questions?.[currentQuestion]?.questionText ?? 'Default Here'}</p>
        { loadedQuiz.questions?.[currentQuestion]?.answers?.map((answer, index) => 
              <ul key={index}>
                <li><input type="radio" name={`alternative-${currentQuestion}`} onChange={handleAnswer} value={index} /><span>{answer}</span></li>
              </ul>
        )}
        <div>
          <Button title="Previous Question" click={handlePreviousQuestion} />
          <Button title={currentQuestion + 1 === questionQty ? "Finish Quiz" : "Next Question"} click={handleNextQuestion} />
        </div>
          {isFinishedQuiz && 
            <div>
              <div>
                <p>Please enter your name:</p>
                <Input type="text" placeholder="Your name" onChange={handleName} value={name} />
              </div>
              <div>
                <p>Please enter your email address(optional):</p>
                <Input type="email" placeholder="Email" onChange={handleEmail} value={email} />
              </div>
              <Button title="Submit Quiz" click={handleSubmit} />
            </div>
          }
      </div>
    </div>
  );
}

export default QuizClient;