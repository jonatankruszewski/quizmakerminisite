import {useEffect} from "react";
import useNamedState from "./hooks/useNamedState.jsx";
import useFetch from "./hooks/useFetch.jsx";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import _ from "lodash";
import {difficulties} from "./constants/Difficulties.js";
import LinearProgress from '@mui/material/LinearProgress';

const App = () => {
  const {isLoading, data, error} = useFetch('https://opentdb.com/api_category.php');
  const [categoryId, setCategoryId] = useNamedState("", 'category');
  const [difficulty, setDifficulty] = useNamedState("", 'difficulty');

  const handleCategory = (event) => {
    setCategoryId(event.target.value);
  };

  const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  useEffect(() => {
    if (!data) return;
    setCategoryId(_.get(data, ['trivia_categories', 0, 'id']));
    setDifficulty(difficulties[0].id)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  const categories = _.get(data, 'trivia_categories', []);

  return <>
    <Typography variant="h4" gutterBottom>
      Quiz Maker
    </Typography>
    {error &&
      <Typography variant="paragraph">
        Oops an error happened. Please try reloading.
      </Typography>
    }
    {isLoading ? <LinearProgress/> :
      <Box sx={{flexGrow: 1, display: "flex", padding: "20px"}}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="category-select-id">Category</InputLabel>
              {data && <Select
                labelId="category-select-id"
                id="categorySelect"
                value={categoryId}
                label="Category"
                onChange={handleCategory}
              >
                {
                  _.map(
                    categories,
                    (item, idx) => <MenuItem key={`${idx}`} value={item.id}>{item.name}</MenuItem>
                  )
                }
              </Select>}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="difficulty-label-id">Difficulty</InputLabel>
              <Select
                labelId="difficulty-label-id"
                id="difficultySelect"
                value={difficulty}
                label="Difficulty"
                onChange={handleDifficulty}
              >
                {
                  _.map(
                    difficulties,
                    difficulty => <MenuItem key={difficulty.id} value={difficulty.id}>{difficulty.name}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button disabled={!data} variant="outlined" id='createBtn'>
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
    }
  </>
}

export default App
