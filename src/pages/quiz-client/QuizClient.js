import { useEffect } from "react";

const QuizClient = (props) => {
  useEffect(() => {
    console.log(props.match.params.id)
  },[]);
  return(
    <div>
      <h1>Quiz Name</h1>
      <div>
        <h3>Quiz Question</h3>
        <div>
          <p>Alternatives:</p>
          <ul>
            <li><span>Alternative 1</span> <input type="radio" name="alternative" id="" /></li>
            <li><span>Alternative 2</span> <input type="radio" name="alternative" id="" /></li>
            <li><span>Alternative 3</span> <input type="radio" name="alternative" id="" /></li>
          </ul>
          <div>
            <button>Previous Question</button>
            <button>Next Question</button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default QuizClient;