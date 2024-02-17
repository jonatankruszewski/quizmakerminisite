import {useEffect} from "react";
import useNamedState from "./useNamedState.jsx";
import axios from "axios";

const useFetch = (url, axiosOptions = {}) => {
  const [isLoading, setIsLoading] = useNamedState(false, 'isLoading');
  const [data, setData] = useNamedState(null, 'data');
  const [error, setError] = useNamedState(null, 'error');

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    let isMounted = true;

    axios.get(url, {signal, timeout: 5000, ...axiosOptions})
      .then(res => {
        if (!isMounted) {
          return
        }
        setData(res.data);
        setIsLoading(true);
      })
      .catch(err => {
        if (!isMounted) {
          return
        }
        setError(err?.message || 'Error fetching data');
      })
      .finally(() => {
        setIsLoading(false);
      })

    return () => {
      abortController.abort();
      isMounted = false;
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setData, setError, setIsLoading])

  return {data, isLoading, error}
}

export default useFetch;
