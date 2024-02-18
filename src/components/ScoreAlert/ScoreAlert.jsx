import React, {useContext} from 'react';
import {AnswersContext} from '../../context/AnswersContext.jsx';
import Box from '@mui/material/Box';

const ScoreAlert = ({score}) => {
  const {amountOfRightAnswers, totalQuestions, hasSubmitted} = useContext(AnswersContext);

  if (!hasSubmitted) {
    return null;
  }

  return (
    <Box>
      <h1>You scored {amountOfRightAnswers} out of {totalQuestions}</h1>
    </Box>
  );
};

export default ScoreAlert;
