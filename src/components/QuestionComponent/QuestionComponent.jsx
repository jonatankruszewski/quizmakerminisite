import React, {useContext, useEffect} from 'react';
import _ from 'lodash';
import he from 'he';
import {ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {QuestionsContext} from '../../context/QuestionsContext.jsx';

const QuestionComponent = ({question, options, id, buttonRef}) => {
  const {questionsMap, hasSubmitted, hasAnsweredAll, updateSelectedAnswer} = useContext(QuestionsContext);

  useEffect(() => {

    if (hasAnsweredAll && buttonRef?.current) {
      buttonRef.current.scrollIntoView({behavior: 'smooth'});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnsweredAll]);

  const getButtonColor = option => {
    if (!hasSubmitted) {
      return 'primary';
    }

    const isCorrect = _.get(questionsMap, [id, 'correct_answer']) === option;
    if (isCorrect) {
      return 'success';
    }

    return 'error';
  };

  const handleClick = event => {
    if (hasSubmitted) {
      return;
    }
    updateSelectedAnswer(id, event.target.value);
  };

  return (
    <Box marginTop={2}>
      <Typography variant='h6' paragraph >{he.decode(question)}</Typography>
      <Grid container spacing={2} marginBottom={5}>
        {_.map(options, option => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={option}>
            <ToggleButtonGroup fullWidth size='large'>
              <ToggleButton
                value={option}
                onClick={handleClick}
                selected={option === _.get(questionsMap, [id, 'selectedAnswer'], false)}
                color={getButtonColor(option)}
                size="large"
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

export default QuestionComponent;
