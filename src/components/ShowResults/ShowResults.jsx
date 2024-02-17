import React, {useContext} from 'react';
import {QuestionsContext} from '../../context/QuestionsContext.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import _ from 'lodash';

const ShowResults = () => {
  const {questions, isLoading, error} = useContext(QuestionsContext);

  if (isLoading) {
    return <CircularProgress/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (_.isEmpty(questions)) {
    return null;
  }


  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          <p>{question.correct_answer}</p>
        </div>
      ))}
    </div>
  );

};

export default ShowResults;
