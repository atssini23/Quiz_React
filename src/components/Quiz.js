import React from "react";
import { QuizData } from "./QuizData.js";

class Quiz extends React.Component {
  state = {
    userAnser: null,
    currentQuestion: 0,
    option: []
  };

  loadQuiz = () => {
    //console.log(quizData[0].question)
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

  render() {
    const { questions, options } = this.state;
    return (
      <div className="App">
        {questions}
        {options}
      </div>
    );
  }
}

export default Quiz;
