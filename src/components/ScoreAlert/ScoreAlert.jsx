import React, {useContext} from 'react';
import {AnswersContext} from '../../context/AnswersContext.jsx';
import {Button, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {QuestionsContext} from '../../context/QuestionsContext.jsx';

const ScoreAlert = ({score}) => {
  const {amountOfRightAnswers, totalQuestions, hasSubmitted, setHasSubmitted} = useContext(AnswersContext);
  const {setQuery, setTriggerId } = useContext(QuestionsContext);
  const navigate = useNavigate();

  const getColor = () => {
    if (amountOfRightAnswers <= 1) {
      return 'red';
    }

    if (amountOfRightAnswers <= 3) {
      return 'yellow';
    }

    return 'green';
  };

  if (!hasSubmitted) {
    return null;
  }

  return (
    <Grid container marginTop={2}>
      <Grid item xs={12}>
        <Typography
          paragraph
          variant='h6'
          sx={{backgroundColor: getColor(), border: '1px solid black', padding: '12px', borderRadius: '4px'}}
        >
          You scored {amountOfRightAnswers} out of {totalQuestions}
        </Typography>
      </Grid>
      <Grid item xs={12} alignItems='center'>
        <Button
          onClick={() => {
            setHasSubmitted(false);
            setTriggerId('');
            setQuery('');
            navigate('/quizmakerminisite/');
          }}
          variant={'contained'}
          size='large'
          color={'primary'}>
          Create New Quiz
        </Button>
      </Grid>
    </Grid>
  );
};

export default ScoreAlert;
