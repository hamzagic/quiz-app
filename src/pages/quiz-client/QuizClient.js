import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import API from '../../routes/api';
import Button from "../../components/button/Button";
import { addCurrentQuestion, storeLoadedQuiz } from "../../store/reducers/quizClientReducer";
import Input from "../../components/input/Input";
import Validator from "../../utils/validator";

const QuizClient = (props) => {
  const id = props.match.params.id || '';
  const [quiz, setQuiz] = useState({});
  const [questionQty, setQuestionQty] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [checkError, setCheckError] = useState('');
  const [isFinishedQuiz, setIsFinishedQuiz] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    if (currentQuestion >= 1) {
      setCurrentQuestion(currentQuestion - 1);
      dispatch(addCurrentQuestion(currentQuestion - 1));
    }
  }

  const handleNextQuestion = () => {
    if(!answer) {
      setCheckError('You need to choose an alternative');
      return;
    }
    if (currentQuestion + 1 <= questionQty) {
      setCurrentQuestion(currentQuestion + 1);
      dispatch(addCurrentQuestion(currentQuestion + 1));
      setCheckError('');
      setAnswer('');
    }

    if (currentQuestion + 1 === questionQty) {
      setIsFinishedQuiz(true);
      setCheckError('');
      setAnswer('');
    }
  }

  const validateFields = () => {
    let errors = true;
    const validator = new Validator();
    const isInvalidEmail = email.length > 0 && validator.email(email);
    const isInvalidName = validator.required(name);

    if (isInvalidEmail) {
      setEmailError(isInvalidEmail);
    } else {
      setEmailError("");
    }

    if (isInvalidName) {
      setNameError(isInvalidName);
    } else {
      setNameError("");
    }

    if (
      isInvalidEmail === undefined &&
      isInvalidName === undefined
    ) {
      errors = false;
    } else {
      errors = true;
    }

    return errors;
  };

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = () => {
    setMessage('');
    setErrorMessage('');
    const data = {
      name,
      email,
      answers,
      quizToken: id
    }; 
    const hasErrors = validateFields();
    if(!hasErrors) {
      API.post('quiz/attempt', data)
      .then(res => {
        if (res.data.message) {
          setMessage(res.data.message);
          setAnswers([]);
          setName('');
          setEmail('');
          setAnswer('');
          setIsSubmitted(true);
        } else if (res.data.error) {
          setErrorMessage(res.data.error);
        }
      })
      .catch(err => {
        setErrorMessage(err);
      });
    }

  }

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
    const updatedAnswer = [...answers, e.target.value];
    setAnswers(updatedAnswer);
  }

  return(
    <div>
      <h1>{quiz.quizName}</h1>
      {!isFinishedQuiz && 
        <div>
        <p>{ currentQuestion + 1 } - { loadedQuiz.questions?.[currentQuestion]?.questionText ?? ''}</p>
        { loadedQuiz.questions?.[currentQuestion]?.answers?.map((answer, index) => 
              <ul key={index}>
                <li><input type="radio" name={`alternative-${currentQuestion}`} onChange={handleAnswer} value={index} /><span>{answer}</span></li>
              </ul>
        )}
        <div>
          <Button title="Previous Question" click={handlePreviousQuestion} />
          <Button title={currentQuestion + 1 === questionQty ? "Finish Quiz" : "Next Question"} click={handleNextQuestion} />
        </div> 
        {checkError && <p>{checkError}</p>}
      </div>
      }
      {isFinishedQuiz && !isSubmitted && 
            <div>
              <div>
                <p>Please enter your name:</p>
                <Input type="text" placeholder="Your name" onChange={handleName} value={name} />
                {nameError && <p>{nameError}</p>}
              </div>
              <div>
                <p>Please enter your email address(optional):</p>
                <Input type="email" placeholder="Email" onChange={handleEmail} value={email} />
                {emailError && <p>{emailError}</p>}
              </div>
              <Button title="Submit Quiz" click={handleSubmit} />
              {message && <p>{message}</p>}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          }
          {
            isSubmitted && 
            <div>
              <h2>Thank you for answering this quiz!</h2>
              <p>Display results</p>
              <p>Todo: More text and links for the product</p>
            </div>
          }
    </div>
  );
}

export default QuizClient;