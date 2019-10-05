import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        id: 1,
        question: 'Какого цвета светофор?',
        rightAnswerId: 4,
        answers: [
          {text: 'Зелёный', id: 1},
          {text: 'Красный', id: 2},
          {text: 'Жёлтый', id: 3},
          {text: 'Чёрный', id: 4},
        ]
      },
      {
        id: 2,
        question: 'Как тебя Зовут?',
        rightAnswerId: 4,
        answers: [
          {text: 'Человек', id: 1},
          {text: 'Животное', id: 2},
          {text: 'Организм', id: 3},
          {text: 'Сущность', id: 4},
        ]
      }
    ],
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === `success`) {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      this.setState({
        answerState: {
          [answerId]: 'success',
          results,
        }
      })
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState ({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      console.log('hi')
      results[question.id] = 'error';
      this.setState({
        answerState: {
          [answerId]: 'error',
          results,
        }
      })
    }

  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    })
  }

  render() {
    return (
    <div className = {classes.Quiz}>
      <div className = {classes.QuizWrapper}>
        <h1>Отвечай!</h1>
        {
          this.state.isFinished ?
          <FinishedQuiz
            onRetry = {this.retryHandler}
            results = {this.state.results}
            quiz = {this.state.quiz}
          /> :
          <ActiveQuiz
            onAnswerClick = {this.onAnswerClickHandler}
            answers = {this.state.quiz[this.state.activeQuestion].answers}
            question = {this.state.quiz[this.state.activeQuestion].question}
            quizLength = {this.state.quiz.length}
            answerNumber = {this.state.activeQuestion + 1}
            state = {this.state.answerState}
        />
        }
      </div>
    </div>
    )
  }
}

export default Quiz;
