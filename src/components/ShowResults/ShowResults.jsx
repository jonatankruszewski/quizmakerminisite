import React, {useContext, useState} from 'react';
import {QuestionsContext} from '../../context/QuestionsContext.jsx';
import _ from 'lodash';
import he from 'he';
import {Alert, CircularProgress, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {v4 as uuid} from 'uuid';
import {AnswersContext} from '../../context/AnswersContext.jsx';

const Buttons = ({options, handleClick, selected}) => {

  return _.map(options, (option, index) => (
    <Grid item xs={12} sm={6} md={3} lg={3} key={uuid()}>
      <ToggleButton
        value={option}
        onClick={handleClick}
        selected={option === selected}
        color='primary'
        size="medium"
      >
        {he.decode(option)}
      </ToggleButton>
    </Grid>
  ));
};

const QuestionComponent = ({question, options, id}) => {
  const [selected, setSelected] = useState(null);
  const {answersMap, setAnswersMap} = useContext(AnswersContext);

  const handleClick = event => {
    setSelected(event.target.value);
    setAnswersMap({...answersMap, [id]: event.target.value});
  };

  return (
    <Box marginTop={5}>
      <Typography variant='h6' paragraph>{he.decode(question)}</Typography>
      <Box padding={1}>
        <ToggleButtonGroup fullWidth size='large'>
          <Grid container spacing={1}>
            <Buttons handleClick={handleClick} selected={selected} options={options}/>
          </Grid>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

const useQuiz = questionsMap => {

};
const ShowResults = () => {
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

export default ShowResults;
