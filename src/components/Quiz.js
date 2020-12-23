import React from "react";
import { QuizData } from "./QuizData.js";

class Quiz extends React.Component {
  state = {
    userAnser: null,
    currentQuestion: 0,
    options: [],
    quizEnd: false,
    score: 0,
    disabled: true
  };

  loadQuiz = () => {
    //console.log(QuizData[0].question)
    const { currentQuestion } = this.state;
    this.setState(() => {
      return {
        questions: QuizData[currentQuestion].question,
        options: QuizData[currentQuestion].options,
        answer: QuizData[currentQuestion].answer
      };
    });
  };
  componentDidMount() {
    this.loadQuiz();
  }

  nextQuestionHandler = () => {
    const { userAnswer, answer, score } = this.state;
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);
    //increment the score if answer is correct
    if (userAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }
  };
  //updates the component
  componentDidUpdate(prevProps, prevState) {
    const { currentQuestion } = this.state;
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: QuizData[currentQuestion].question,
          options: QuizData[currentQuestion].options,
          answer: QuizData[currentQuestion].answer
        };
      });
    }
  }
  //check answer
  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false
    });
  };
  finishHandler = () => {
    const { userAnswer, answer, score } = this.state;

    if (this.state.currentQuestion === QuizData.length - 1) {
      this.setState({
        quizEnd: true
      });
      if (userAnswer === answer) {
        this.setState({
          score: score + 1
        });
        console.log("Current score:", this.state.score);
      }
    }
  };

  render() {
    const {
      questions,
      options,
      currentQuestion,
      userAnswer,
      quizEnd
    } = this.state;
    if (quizEnd) {
      return (
        <div>
          <h2>Your final score is {this.state.score} out of 4</h2>
          <p>The correct answer's are: </p>
          <ul>
            {QuizData.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.answer}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="App">
        <h3>{questions}</h3>
        <span>{` Question ${currentQuestion + 1} out of ${
          QuizData.length
        }`}</span>
        {options.map((option) => (
          <p
            key={option.id}
            className={`ui floating message options
          ${userAnswer === option ? "selected" : null}
          `}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}
        {currentQuestion < QuizData.length - 1 && (
          <button
            className="ui button black"
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next
          </button>
        )}
        {currentQuestion === QuizData.length - 1 && (
          <button className="ui button black" onClick={this.finishHandler}>
            Finish
          </button>
        )}
      </div>
    );
  }
}

export default Quiz;
