import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import API from '../../routes/api';
import Button from "../../components/button/Button";
import { addCurrentQuestion, storeLoadedQuiz } from "../../store/reducers/quizClientReducer";
import Input from "../../components/input/Input";
import Validator from "../../utils/validator";
import styles from './QuizClient.module.scss';

const QuizClient = (props) => {
  const id = props.match.params.id || '';
  const [quiz, setQuiz] = useState({});
  const [questionQty, setQuestionQty] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [differences, setDifferences] = useState({});
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [checkError, setCheckError] = useState('');
  const [isFinishedQuiz, setIsFinishedQuiz] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const loadedQuiz = useSelector(state => state.quizClient.loadedQuiz);
  const dispatch = useDispatch();
  const [invalidQuiz, setInvalidQuiz] = useState(false);
  const [score, setScore] = useState('');
 
  useEffect(() => {
    API.get('client/'+id)
    .then(res => {
      if(!res.data.data) {
        setInvalidQuiz(true);
        return;
      }
      setQuiz(res.data.data);
      setQuestionQty(res.data.data.questions.length);
      dispatch(storeLoadedQuiz(res.data.data));
      dispatch(addCurrentQuestion(1));
    })
    .catch(err => {
      setInvalidQuiz(true);
      console.log(err)
    });
  },[id, currentQuestion, dispatch, isFinishedQuiz, differences, answer]);

  const handlePreviousQuestion = () => {
    if (currentQuestion >= 1) {
      setCurrentQuestion(currentQuestion - 1);
      dispatch(addCurrentQuestion(currentQuestion - 1));
    }
  }

  const handleNextQuestion = () => {
    console.log(answer);
    if(!answer) {
      setCheckError('You need to choose an alternative');
      return;
    }
    if (currentQuestion + 1 <= questionQty) {
      setCurrentQuestion(currentQuestion + 1);
      dispatch(addCurrentQuestion(currentQuestion + 1));
      setCheckError('');
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
      (isInvalidEmail === false || isInvalidEmail === undefined) &&
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
        console.log('res', res);
        if (res.data.message) {
          setMessage(res.data.message);
          setDifferences(res.data.result.answerData);
          setScore(res.data.result.score);
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
    } else {
      console.log('some error ocurred');
    }

  }

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
    const updatedAnswer = [...answers, parseInt(e.target.value)];
    setAnswers(updatedAnswer);
  }

  const getCorrectAnswer = (index, i) => differences.filter(diff => 
    diff.questionIndex === index && diff.correct === i).length > 0;
  
  const getIncorrectAnswer = (index, i) => differences.filter(diff => 
    diff.questionIndex === index && diff.answered === i).length > 0;

  const btnStyle = {
    backgroundColor: '#6622CC',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }

  const btnDisabled = {
    cursor: 'not-allowed',
    backgroundColor: '#ddd',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
  }

  const inputStyle = {
    padding: '5px',
    width: '100%',
    borderWidth: '1px',
    borderRadius: '6px'
  }

 

  return(
    <div className={styles.container}>
      {invalidQuiz && 
        <div className={styles.invalidQuiz}>
          <h1>This quiz does not exist!</h1>
          <p>Please check the provided link again.</p>
        </div>
      }

      {!invalidQuiz && 
        <>
        <h1>{quiz.quizName}</h1>
      {!isFinishedQuiz && 
        <div className={styles.questionsContainer}>
        <p className={styles.questionTitle}><span className={styles.questionNumber}>{ currentQuestion + 1 }</span> - { loadedQuiz.questions?.[currentQuestion]?.questionText ?? ''}</p>
        { loadedQuiz.questions?.[currentQuestion]?.answers?.map((ans, index) => 
              <ul key={index}>
                <li><input type="radio" name={`alternative-${currentQuestion}`} onChange={handleAnswer} value={index} /><span className={styles.answerText}>{ans}</span></li>
              </ul>
        )}
        <div className={styles.buttonsContainer}>
          <Button title="Previous Question" styles={currentQuestion === 0 ? btnDisabled : btnStyle} click={handlePreviousQuestion} disabled={currentQuestion < 1} />
          <Button title={currentQuestion + 1 === questionQty ? "Finish Quiz" : "Next Question"} styles={btnStyle} click={handleNextQuestion} />
        </div> 
        {checkError && <p>{checkError}</p>}
      </div>
      }
      {isFinishedQuiz && !isSubmitted && 
            <div className={styles.submitContainer}>
              <div className={styles.inputContainer}>
                <p className={styles.questionTitle}>Enter your name:</p>
                <Input type="text" placeholder="Your name" styles={inputStyle} onChange={handleName} value={name} />
                {nameError && <p>{nameError}</p>}
              </div>
              <div className={styles.inputContainer}>
                <p className={styles.questionTitle}>Enter your email address(optional):</p>
                <Input type="email" placeholder="Email" styles={inputStyle} onChange={handleEmail} value={email} />
                {emailError && <p>{emailError}</p>}
              </div>
              <Button title="Submit Quiz" styles={btnStyle} click={handleSubmit} />
              {message && <p>{message}</p>}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          }
          {
            isSubmitted && 
            <div className={styles.resultsContainer}>
              <h2>Thank you for answering this quiz!</h2>
              {/* Create a component for results */}
              <h3>Your Results</h3>
              <p className={styles.score}>Your score: {score}</p>
              <div className={styles.questionsResultContainer}>
                {quiz.questions.map((question, index) =>
                  <div key={index} className={styles.answerContainer}>
                    <h3>{question.questionText}</h3>
                    {question.answers.map((answer, i) => 
                      <div key={i}>
                        <p className={getCorrectAnswer(index, i) ? styles.correctAnswer : getIncorrectAnswer(index, i) ? styles.incorrectAnswer : ''}>{answer}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          }
        </>
      }
    </div>
  );
}

export default QuizClient;