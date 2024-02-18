import React, {useContext} from 'react';
import {AnswersContext} from '../../context/AnswersContext.jsx';
import {Button} from '@mui/material';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';

// eslint-disable-next-line react/display-name
const SubmitAnswersButton = React.forwardRef((props, ref) => {
  const {hasAnsweredAll, hasSubmitted, setHasSubmitted} = useContext(AnswersContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setHasSubmitted(true);
    navigate('/quizmakerminisite/results');
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
        ref={ref}
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
});

export default SubmitAnswersButton;
