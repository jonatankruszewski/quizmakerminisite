
import './App.css'
import useNamedState from "./hooks/useNamedState.jsx";
import useFetch from "./hooks/useFetch.jsx";

function App() {
  const [count, setCount] = useNamedState(0, 'count');
  const {isLoading, data, error} = useFetch('https://opentdb.com/api_category.php');


  return (
    <>
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
      </FormControl>    </>)
}

export default App
