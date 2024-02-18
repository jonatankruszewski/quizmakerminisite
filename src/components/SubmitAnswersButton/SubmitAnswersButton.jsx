import React, {useContext} from 'react';
import {AnswersContext} from '../../context/AnswersContext.jsx';
import {Button} from '@mui/material';
import Box from '@mui/material/Box';

const SubmitAnswersButton = () => {
  const {hasAnsweredAll, hasSubmitted, setHasSubmitted} = useContext(AnswersContext);

  const handleClick = () => {
    setHasSubmitted(true);
  };

  if (!hasAnsweredAll) {
    return null;
  }

  if (hasSubmitted) {
    return null;
  }

  return (
    <Box display='flex' alignItems='center' justifyContent='center' marginTop={2}>
      <Button
        onClick={handleClick}
        disabled={hasSubmitted}
        variant={'contained'}
        size='large'
        color={'primary'}
      >
        Submit Answers
      </Button>
    </Box>
  );
};

export default SubmitAnswersButton;
