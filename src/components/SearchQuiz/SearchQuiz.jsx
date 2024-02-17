import React, {useContext} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import {Button, Typography} from '@mui/material';
import _ from 'lodash';
import {difficulties} from '../../constants/Difficulties.js';
import LinearProgress from '@mui/material/LinearProgress';
import useSearchQuiz from './useSearchQuiz.jsx';
import {QuestionsContext} from '../../context/QuestionsContext.jsx';

const SearchQuizzes = () => {
  const {
    isLoading,
    handleCategory,
    handleDifficulty,
    onSubmit,
    error,
    categories,
    categoryId,
    difficulty,
  } = useSearchQuiz();
  const {isLoading: isFetching} = useContext(QuestionsContext);

  if (isLoading) {
    return <LinearProgress/>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="category-select-id">Category</InputLabel>
          <Select
            labelId="category-select-id"
            id="categorySelect"
            value={categoryId}
            label="Category"
            name='category'
            disabled={isFetching}
            onChange={handleCategory}
          >
            {
              _.map(
                categories,
                (item, idx) => <MenuItem key={`${idx}`} value={item.id}>{item.name}</MenuItem>,
              )
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="difficulty-label-id">Difficulty</InputLabel>
          <Select
            labelId="difficulty-label-id"
            id="difficultySelect"
            value={difficulty}
            label="Difficulty"
            name='difficulty'
            disabled={isFetching}
            onChange={handleDifficulty}
          >
            {
              _.map(
                difficulties,
                difficulty => <MenuItem key={difficulty.id} value={difficulty.value}>{difficulty.name}</MenuItem>,
              )
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          disabled={isFetching}
          variant="outlined" id='createBtn'
          onClick={onSubmit}
        >
          Create
        </Button>
        {error && (
          <Typography paragraph variant='h6'>
            Oops an error happened. Please try reloading.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchQuizzes;
