import { useState } from "react";
import "./App.css";
import quizData from "./data";
import me1 from "./assets/me1.jpg";
import pixelHeart from "./assets/pixelHeart.png";
import goodJob from "./assets/goodJob.png";
import brawlKiss from "./assets/brawlKiss.jpg";
import goofyEmoji from "./assets/goofyEmoji.png";
import iceCream from "./assets/iceCream.png";
import yipee from "./assets/yipee.png";
import fatCat from "./assets/fatCat.png";
import catDrinking from "./assets/catDrinking.png";
import catMusic from "./assets/catMusic.png";
import btsFlag from "./assets/btsFlag.png";
import catBirthday from "./assets/catBirthday.png";
import catLove from "./assets/catLove.png";
function App() {
  const [currentQuestion, setQuestion] = useState(0);
  const [resultOn, resultFlip] = useState(false);
  const [selectedAnswer, setAnswer] = useState(null);
  const [progress, setProgress] = useState(0);
  const[intro, setIntro] = useState(true)
  const[scorePage, setScorePage] = useState(false)

  const[score, increaseScore] = useState(0)

  const images = {"goodJob":goodJob,
  "brawlKiss": brawlKiss,
  "goofyEmoji": goofyEmoji,
  "iceCream":iceCream,
  "pixelHeart":pixelHeart,
  "yipee":yipee,
  "fatCat":fatCat,
  "catDrinking":catDrinking,
  "catMusic":catMusic,
  "btsFlag":btsFlag,
  "catBirthday":catBirthday,
  "catLove":catLove
  }

  const nextQuestion = () => {
    setQuestion(currentQuestion + 1);
    resultFlip(false);
    setProgress(progress + 100 / 6);
  };
  const handleResult = ()=>{
    setScorePage(true)
  }
  const handleClick = (answer) => {
    setAnswer(answer);
    resultFlip(true);
    if (currentQuestion<=6){
      if (answer === quizData[currentQuestion].correctAnswer) {
        increaseScore(score+1);
      } else {
        console.log("incorrect");
      }
    }else if(currentQuestion>6){
      setQuestion(currentQuestion+1);
    }

  };
  const scoreMessage = () => {
    if (score > 4 && score < 7) {
      return "GREAT JOB!!";
    } else if (score >= 0 && score <= 4) {
      return "Not Bad!";
    } else if (score === 7) {
      return "PERFECT SCORE?? AMAZING JOB!!";
    }
  };
  return (
    <div className={`root ${currentQuestion === quizData.length-1 ? "redBackground" : ""}`}>
      {intro &&      <div className = "questionSection">
          <p className = "introTitle">How well do you know your boyfriend?</p>
          <div className="introPictures">
          <img className="pixelHeart"src={pixelHeart} alt="" />
          <img className="me1" src= {me1} alt="" />
          <img className = "pixelHeart"src={pixelHeart} alt="" />
          </div>

          <button className = "startButton" onClick={()=>{setIntro(false)}}>Start</button>
      </div>
      }

      {intro===false &&       <div className="questionSection">

        {currentQuestion<=6&&        <div className="questionNumber">
          Question number {currentQuestion + 1}/7
        </div>}




        <div className="question">{quizData[currentQuestion].question!="Results Page"?quizData[currentQuestion].question:`Your got ${score}/7 Correct!`}
        {quizData[currentQuestion].question==="Results Page"&&<div
        className="scoreMessage"
        >{scoreMessage()}</div>}

        </div>
        {quizData[currentQuestion].src in images && <img className="goodJob" src={images[quizData[currentQuestion].src]} alt="" />}
        <div className="answersSection">
          {quizData[currentQuestion].answers.map((answer) => (
            <button
              key={answer}
              className={`answerButtons
          ${
            resultOn && answer === quizData[currentQuestion].correctAnswer
              ? "correct"
              : ""
          }
          ${
            resultOn &&
            answer === selectedAnswer &&
            selectedAnswer != quizData[currentQuestion].correctAnswer
              ? "incorrect"
              : ""
          }
          `}
              onClick={() => handleClick(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
        {currentQuestion < quizData.length - 2 && resultOn &&currentQuestion<6 ? (
  <button className="nextButton" onClick={nextQuestion}>
        Next Question
      </button>
    ) : currentQuestion === 6 &&resultOn? (
      <button onClick = {()=>{setQuestion(currentQuestion+1)}} className="nextButton" >
        Show Results
      </button>
    ) : null}
{currentQuestion<=6 &&
        <div className="progressContainer">
          
          <div
            className="progressBar"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>}
      
      </div>
          
}

    </div>
  );

}

export default App;
