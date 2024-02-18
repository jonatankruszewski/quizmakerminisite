import React, {useContext} from 'react';
import {Alert, Button, Grid} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {QuestionsContext} from '../../context/QuestionsContext.jsx';

const ScoreAlert = () => {
  const {
    amountOfRightAnswers, totalQuestions, hasSubmitted, setHasSubmitted, setQuery, setTriggerId,
  } = useContext(QuestionsContext);
  const navigate = useNavigate();

  const getColor = () => {
    if (amountOfRightAnswers <= 1) {
      return 'error';
    }

    if (amountOfRightAnswers <= 3) {
      return 'warning';
    }

    return 'success';
  };

  if (!hasSubmitted) {
    return null;
  }

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} md={12}>
        <Alert
          severity={getColor()}
          width='100%'
        >
          You scored {amountOfRightAnswers} out of {totalQuestions}
        </Alert>
      </Grid>
      <Grid container item xs={12} alignItems='center' justifyContent='center' sm={12} md={4} lg={3} xl={2}>
        <Button
          fullWidth
          align='center'
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
