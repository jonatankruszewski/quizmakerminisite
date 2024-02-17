import React from "react";
import useNamedState from "./hooks/useNamedState.jsx";
import useFetch from "./hooks/useFetch.jsx";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import styles from "./App.module.scss";

function App() {
  const [count, setCount] = useNamedState(0, 'count');
  const {isLoading, data, error} = useFetch('https://opentdb.com/api_category.php');
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event);
  };


  return (
    <div className={styles.root}>
      <h1>logo</h1>
      <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

export default App
