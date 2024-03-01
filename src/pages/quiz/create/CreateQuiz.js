import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { 
  addQuizName, 
  currentQuestionNumber, 
  addQuestion, 
  resetQuestionComponent,
  addQuestionText, 
  addNumberOfChoices, 
  addChoices, 
  setCorrectChoiceIndex,
  resetQuiz,
  updateQuestion
} from "../../../store/reducers/createQuizReducer";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./CreateQuiz.module.scss";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import API from "../../../routes/api";
import { apiConstants } from "../../../constants/constants";
import Validator from "../../../utils/validator";
import Question from "../../../components/question/Question";
import { FaAngleLeft } from "react-icons/fa";
import { isEdit } from "../../../store/reducers/quizDetailReducer";

const CreateQuiz = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [nameError, setNameError] = useState("");
  const [showQuestions, setShowQuestions] = useState(false);
  const dispatch = useDispatch();
  const quizName = useSelector(state => state.createQuiz.quizName);
  const currentQNumber = useSelector(state => state.createQuiz.currentQuestionNumber);
  const currentQuestionText = useSelector(state => state.createQuiz.currentQuestionText);
  const currentChoices = useSelector(state => state.createQuiz.choices);
  const currentCorrectChoice = useSelector(state => state.createQuiz.correctAnswerIndex);
  const numberOfChoices = useSelector(state => state.createQuiz.numberOfChoices);
  const quizQuestions = useSelector(state => state.createQuiz.questions);
  const isEditQuiz = useSelector(state => state.quizDetails.isEdit);

  useEffect(() => {
    if(quizName) setName(quizName);
   
  },[dispatch, numberOfChoices, quizName, currentChoices]);

  const history = useHistory();

  const btnCreateStyle = {
    border: "none",
    background: "#6622CC",
    color: "#fff",
    padding: "4px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "120px",
    maxWidth: "100%",
  };

  const btnCancelStyle = {
    border: "none",
    background: "none",
    color: "#000",
    paddingRight: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const btnDisabled = {
    border: "none",
    background: "#ccc",
    color: "#fff",
    padding: "4px",
    borderRadius: "5px",
    cursor: "no-drop",
    width: "120px",
    maxWidth: "100%",
  };

  const nextStyles = {
    background: "#6622CC",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    padding: "4px 12px",
    cursor: "pointer",
  };

  const finishStyles = {
    background: "#3f51b5",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    padding: "4px 12px",
    cursor: "pointer",
  };

  const handleFinishQuiz = async () => {
    console.log('submit');
    if (hasErrors) return;
    setErrorMsg("");
    setMessage("");
    const numberOfQuestions = quizQuestions.length;
    const questions = [];
    quizQuestions.forEach(q => {
      const question = {
        correctAnswerIndex: q.correctAnswerIndex,
        order: q.order,
        questionImage: q.questionImage,
        questionText: q.questionText,
        answers: q.answers
      }
      questions.push(question);
    });
    const data = {
      "name": quizName,
      "creator": "65ca1469366f6775cc068903",
      "totalQuestions": numberOfQuestions,
      "questions": questions
    }
    await API.post(apiConstants.quiz_post, data, {
    })
      .then((res) => {
        if (res.data.errors) {
          setErrorMsg("Error: " + res.data.errors[0].msg);
          return;
        } else if(res.data.error) {
          setErrorMsg("Error: " + res.data.error);
        }
         else {
          setMessage("Quiz created successfully!");
          dispatch(resetQuiz());
          clearFields();
          setShowQuestions(false);
          dispatch(isEdit(false));
        }
      })
      .catch((err) => {
        setErrorMsg("Could Not Create Quiz: " + err.message);
      });
  };

  const handleCancelClick = () => {
    setShowQuestions(false);
    dispatch(resetQuiz());
    dispatch(isEdit(false));
    history.push('/quiz');
  };

  const handleName = (e) => {
    setName(e.target.value);
    validateField(name, 6, setNameError);
  };

  const validateField = (value, min, fn) => {
    fn("");
    const validator = new Validator();
    const minLength = validator.minLength(value, min);
    if (minLength) fn(minLength);
  };

  const clearFields = () => {
    setName("");
  };

  const handleNextClick = (data) => {
    // check if quiz name is valid
    validateField(name, 6, setNameError);
    if (!name) return;
    // check if image has been added
    // open question component
    dispatch(addQuizName(name));
    dispatch(currentQuestionNumber(currentQNumber ? parseInt(currentQNumber) + 1 : 1));
    setShowQuestions(true);
  };

  const handleNextQuestion = () => {
    // if (quizQuestions && quizQuestions.length > currentQNumber) {
      if (currentQNumber < quizQuestions.length) {
      quizQuestions.filter(question => {
        if (question.order === currentQNumber + 1) {
          dispatch(currentQuestionNumber(currentQNumber + 1));
          dispatch(addQuestionText(question.questionText));
          dispatch(addChoices(question.answers));
          dispatch(setCorrectChoiceIndex(question.correctAnswerIndex));
          
          if (isEditQuiz) {
            const updatedQuestion = {
              order: currentQNumber,
              questionText: currentQuestionText,
              numberOfChoices: currentChoices.length,
              answers: currentChoices,
              correctAnswerIndex: currentCorrectChoice,
              questionImage: ''
            }
            dispatch(updateQuestion(updatedQuestion));
          }
        }
        return question.order === currentQNumber + 1;
      });
    } else {
      const currentQuestion = {
        order: currentQNumber,
        questionText: currentQuestionText,
        numberOfChoices: currentChoices.length,
        answers: currentChoices,
        correctAnswerIndex: currentCorrectChoice,
        questionImage: ''
      }
      console.log('object', currentQuestion);
      if (currentQNumber && currentQuestionText && currentChoices.length > 0) {
        const questionExists = quizQuestions.some(el => el.order === currentQNumber);
        if (!questionExists) saveQuestionToStore(currentQuestion);
      } else {
        console.log('could not save question');
      }
      dispatch(currentQuestionNumber(currentQNumber + 1));
      dispatch(resetQuestionComponent(true));
      resetQuestionFields();
    } 
  }

  const saveQuestionToStore = (currentQuestion) => {
    dispatch(addQuestion(currentQuestion));
  }

  const handlePreviousQuestion = () => {
    if (currentQNumber - 1 <= 0) return;
    dispatch(currentQuestionNumber(currentQNumber - 1));    
    const previousQuestion = quizQuestions.filter(question => 
      question && question.order === currentQNumber - 1);
    
    dispatch(addQuestionText(previousQuestion && previousQuestion[0].questionText));
    dispatch(addChoices(previousQuestion && previousQuestion[0].answers));
    dispatch(addNumberOfChoices(previousQuestion && previousQuestion[0].answers.numberOfChoices));
  }

  const resetQuestionFields = () => {
    dispatch(addQuestionText(''));
    // dispatch(addNumberOfChoices(0));
    dispatch(addChoices([]));
  }

  const errorFields = nameError;

  const hasErrors = errorFields ? true : false;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.backContainer} onClick={handleCancelClick}>
            <FaAngleLeft />
            <Button
              title="Back"
              styles={btnCancelStyle}
              click={handleCancelClick}
            />
          </div>
          <h1>Create a New Quiz</h1>
        </div>
        <div className={styles.card}>
          <div className={styles.message}>{message}</div>
          <div className={styles.errorMessage}>{errorMsg}</div>
          <div className={styles.inputGrid}>
            <div className={styles.titles}>
              <div>Quiz Name: </div>
              <div></div>
              <div>Image (optional): </div>
            </div>
            <div className={styles.descriptions}>
              <Input
                placeholder="Name"
                value={name.length > 0 ? name : quizName}
                onChange={handleName}
                onBlur={() => validateField(name, 6, setNameError)}
              />
              <div className={styles.errorMessage}>{nameError}</div>
              <Input placeholder="Name" type="file" />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button
              title="Next"
              styles={hasErrors ? btnDisabled : btnCreateStyle}
              click={handleNextClick}
              disabled={hasErrors}
            />
          </div>
        </div>
        {showQuestions && (
          <>
            <Question />
            <div className={styles.buttonsContainer}>
              <Button title="Previous Question" styles={nextStyles} click={handlePreviousQuestion} />
              <Button title="Next Question" styles={nextStyles} click={handleNextQuestion} />
              <Button title="Finish Quiz" styles={finishStyles} click={handleFinishQuiz} />
            </div>
          </>
        )}
      </div>
      <Sidebar />
    </div>
  );
};

export default CreateQuiz;
