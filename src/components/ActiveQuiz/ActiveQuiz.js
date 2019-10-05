import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswerList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
  <div className = {classes.ActiveQuiz}>
    <p className = {classes.Question}>
      <span>
        <strong>
        {props.answerNumber}.&nbsp;
        </strong>
        {props.question}
      </span>
      <small>{props.answerNumber} из {props.quizLength}</small>
    </p>
    <AnswerList
      answers = {props.answers}
      onAnswerClick = {props.onAnswerClick}
      state = {props.state}
    />
  </div>
)

export default ActiveQuiz
