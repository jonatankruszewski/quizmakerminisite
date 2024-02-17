import React, {useContext} from 'react';
import {AnswersContext} from '../../context/AnswersContext.jsx';
import {Button} from '@mui/material';

const SubmitAnswersButton = () => {
  const {hasAnsweredAll, answersMap } = useContext(AnswersContext);

  if (!hasAnsweredAll) {
    return null;
  }

  return (
    <Button type="submit">Submit Answers</Button>
  );
};

export default SubmitAnswersButton;
