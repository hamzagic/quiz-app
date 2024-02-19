import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addQuizName, currentQuestionNumber } from "../../../store/reducers/createQuizReducer";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./CreateQuiz.module.scss";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import API from "../../../routes/api";
import { apiConstants } from "../../../constants/constants";
import Validator from "../../../utils/validator";
import Question from "../../../components/question/Question";
import { FaAngleLeft } from "react-icons/fa";

const CreateQuiz = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [nameError, setNameError] = useState("");
  const [showQuestions, setShowQuestions] = useState(false);
  const dispatch = useDispatch();
  const quizName = useSelector(state => state.createQuiz.quizName);
  const currentQuestion = useSelector(state => state.createQuiz.currentQuestionText);
  const currentChoices = useSelector(state => state.createQuiz.choices);
  const currentCorrectChoice = useSelector(state => state.createQuiz.correctChoiceIndex);

  const quizObject = {
    quizName: '',
    quizImage: '',
    questions: [],
  }

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
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "no-drop",
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

  const handleCreateClick = async () => {
    if (hasErrors) return;
    setErrorMsg("");
    const formData = new FormData();
    formData.append("name", name);
    await API.post(apiConstants.quiz_post, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        setMessage("Quiz created successfully!");
        clearFields();
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg("Could Not Create Quiz");
      });
  };

  const handleCancelClick = () => {
    setShowQuestions(false);
    history.push("/quiz");
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
    setStartDate("");
    setEndDate("");
    setName("");
  };

  const handleNextClick = (data) => {
    // check if quiz name is valid
    // check if image has been added
    // open question component
    dispatch(addQuizName(name));
    dispatch(currentQuestionNumber(1));
    setShowQuestions(true);
    quizObject.quizName = name;
    localStorage.setItem('quiz', JSON.stringify(quizObject));
  };

  const handleNextQuestion = () => {
    console.log('quiz name', quizName);
    console.log('question', currentQuestion);
    console.log('choices', currentChoices);
    console.log('correct', currentCorrectChoice);
    // save current question/choices data
    // 
    // reset component to display the next question form
  }

  const handlePreviousQuestion = () => {

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
                value={name}
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
              <Button title="Finish Quiz" styles={finishStyles} />
            </div>
          </>
        )}
      </div>
      <Sidebar />
    </div>
  );
};

export default CreateQuiz;
