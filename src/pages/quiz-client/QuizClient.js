import { useEffect } from "react";
import API from '../../routes/api';

const QuizClient = (props) => {
  const id = props.match.params.id || '';
  API.get('client/'+id)
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err));
  useEffect(() => {
    
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