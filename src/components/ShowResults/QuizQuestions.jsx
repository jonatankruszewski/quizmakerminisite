import React, {useContext, useState} from 'react';
import {QuestionsContext} from '../../context/QuestionsContext.jsx';
import _ from 'lodash';
import he from 'he';
import {Alert, CircularProgress, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {v4 as uuid} from 'uuid';
import {AnswersContext} from '../../context/AnswersContext.jsx';

const QuestionComponent = ({question, options, id}) => {
  const [selected, setSelected] = useState(null);
  const {answersMap, setAnswersMap, hasSubmitted} = useContext(AnswersContext);
  const getButtonColor = option => {
    if (!hasSubmitted) {
      return 'primary';
    }

    const isCorrect = _.get(answersMap, [id, 'isCorrect']);

    if (isCorrect) {
      return 'success';
    }

    return 'error';
  };

  const handleClick = event => {
    if (hasSubmitted) {
      return;
    }
    setSelected(event.target.value);
    setAnswersMap({...answersMap, [id]: {selectedValue: event.target.value}});
  };

  return (
    <Box marginTop={5}>
      <Typography variant='h6' paragraph>{he.decode(question)}</Typography>
      <Grid container spacing={2}>
        {_.map(options, (option, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={uuid()}>
            <ToggleButtonGroup fullWidth size='large'>
              <ToggleButton
                value={option}
                onClick={handleClick}
                selected={option === selected}
                color={getButtonColor(option)}
                size="medium"
                disabled={hasSubmitted}
              >
                {he.decode(option)}
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const QuizQuestions = () => {
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
          />
        );
      })}
    </>
  );
};

export default QuizQuestions;
