import React, {useContext, useEffect, useState} from 'react';
import _ from 'lodash';
import he from 'he';
import {ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {AnswersContext} from '../../context/AnswersContext.jsx';

const QuestionComponent = ({question, options, id, buttonRef}) => {
  const [selected, setSelected] = useState(null);
  const {answersMap, setAnswersMap, hasSubmitted, hasAnsweredAll} = useContext(AnswersContext);

  useEffect(() => {

    if (hasAnsweredAll && buttonRef?.current) {
      buttonRef.current.scrollIntoView({behavior: 'smooth'});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnsweredAll]);

  console.log('buttonRef', buttonRef);
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
    <Box marginTop={2}>
      <Typography variant='h6' paragraph >{he.decode(question)}</Typography>
      <Grid container spacing={2} marginBottom={5}>
        {_.map(options, (option, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={option}>
            <ToggleButtonGroup fullWidth size='large'>
              <ToggleButton
                value={option}
                onClick={handleClick}
                selected={option === selected}
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
