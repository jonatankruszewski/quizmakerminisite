import React, {useContext, useState} from 'react';
import _ from 'lodash';
import he from 'he';
import {ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
          <Grid item xs={12} sm={6} md={3} lg={3} key={option}>
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

export default QuestionComponent;
