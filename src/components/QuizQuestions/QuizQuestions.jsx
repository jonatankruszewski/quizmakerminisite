import React, {useContext} from 'react';
import {QuestionsContext} from '../../context/QuestionsContext.jsx';
import QuestionComponent from '../QuestionComponent/QuestionComponent.jsx';
import _ from 'lodash';
import {Alert, CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';

const QuizQuestions = ({buttonRef}) => {
  const {questions, isLoading, error, questionsMap} = useContext(QuestionsContext);

  if (isLoading) {
    return (
      <Box display='flex' alignItems='center' justifyContent='center'>
        <CircularProgress/>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display='flex' alignItems='center' justifyContent='center' flex={1} marginTop={2}>
        <Alert severity='error' sx={{width: '100%'}}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (_.isEmpty(questions)) {
    return null;
  }

  return (
    <>
      {_.map(questionsMap, ({question, incorrect_answers, correct_answer, id}) => {
        const randomizedOptions = _.shuffle([...incorrect_answers, correct_answer]);
        return (
          <QuestionComponent
            question={question}
            options={randomizedOptions}
            id={id}
            key={id}
            buttonRef={buttonRef}
          />
        );
      })}
    </>
  );
};

export default QuizQuestions;
